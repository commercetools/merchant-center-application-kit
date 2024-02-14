import {
  KeyboardEventHandler,
  ChangeEventHandler,
  KeyboardEvent,
  MouseEventHandler,
  MouseEvent,
  useReducer,
  useRef,
  useCallback,
} from 'react';
import { css, keyframes, ClassNames } from '@emotion/react';
import Fuse from 'fuse.js';
import last from 'lodash/last';
import { FormattedMessage, useIntl } from 'react-intl';
import { designTokens } from '@commercetools-uikit/design-system';
import { SearchIcon } from '@commercetools-uikit/icons';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import ButlerCommand from '../butler-command';
import ButlerContainer from '../butler-container';
import messages from '../messages';
import type {
  Command,
  SearchText,
  SelectedResult,
  Stack,
  HistoryEntry,
} from '../types';

const isSelectAllCombo = (event: KeyboardEvent<HTMLInputElement>) =>
  event.key === 'a' &&
  event.metaKey &&
  !event.ctrlKey &&
  !event.altKey &&
  !event.shiftKey;

const isCloseCombo = (event: KeyboardEvent<HTMLInputElement>) =>
  event.key === 'Escape' &&
  !event.metaKey &&
  !event.ctrlKey &&
  !event.altKey &&
  !event.shiftKey;

const getPlatform = () => {
  if (navigator.appVersion.includes('Win')) return 'windows';
  if (navigator.appVersion.includes('Mac')) return 'macos';
  if (navigator.appVersion.includes('X11')) return 'unix';
  if (navigator.appVersion.includes('Linux')) return 'linux';

  return null;
};

const hasNewWindowModifier = (
  event: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>
) => {
  const platform = getPlatform();
  switch (platform) {
    case 'macos':
      return event.metaKey;
    default:
      return event.ctrlKey;
  }
};

const shakeAnimation = keyframes`
  from,
  to {
    transform: translate3d(0, 0, 0);
  }

  14%,
  42%,
  70% {
    transform: translate3d(-3px, 0, 0);
  }

  28%,
  56%,
  84% {
    transform: translate3d(3px, 0, 0);
  }
`;

type State = {
  hasNetworkError: boolean;
  isLoading: boolean;
  searchText: SearchText;
  selectedResult: SelectedResult;
  // Used for UX when browsing through history
  enableHistory: boolean;
  results: Command[];
  stack: Stack[];
};
type Action =
  | { type: 'networkError'; payload: boolean }
  | { type: 'loading'; payload: boolean }
  | { type: 'selectedResult'; payload: number }
  | { type: 'incrementSelectedResult' }
  | { type: 'decrementSelectedResult' }
  | {
      type: 'pickCommandFromHistory';
      payload: { searchText: SearchText; results: Command[] };
    }
  | { type: 'setNextCommands'; payload: { results: Command[] } }
  | {
      type: 'setPrevCommands';
      payload: { searchText: SearchText; results: Command[] };
    }
  | { type: 'searchText'; payload: string }
  | { type: 'setSearchTextResults'; payload: Command[] }
  | { type: 'resetSearchText' }
  | { type: 'resetResultsWhenClosing' }
  | { type: 'reset' };
const initialState = {
  hasNetworkError: false,
  isLoading: false,
  searchText: '',
  selectedResult: -1,
  // Used for UX when browsing through history
  enableHistory: true,
  results: [],
  stack: [],
};
const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'networkError':
      return { ...state, hasNetworkError: action.payload };
    case 'loading':
      return { ...state, isLoading: action.payload };
    case 'selectedResult':
      return { ...state, selectedResult: action.payload };
    case 'incrementSelectedResult':
      return {
        ...state,
        selectedResult:
          state.selectedResult === state.results.length - 1
            ? 0
            : state.selectedResult + 1,
        enableHistory: false,
      };
    case 'decrementSelectedResult':
      return {
        ...state,
        selectedResult:
          state.selectedResult < 1
            ? state.results.length - 1
            : state.selectedResult - 1,
        enableHistory: false,
      };
    case 'pickCommandFromHistory':
      return {
        ...state,
        selectedResult: 0,
        searchText: action.payload.searchText,
        results: action.payload.results,
        stack: [],
        // The history does not get changed here, it will be changed along
        // with the regular flow.
      };
    case 'setNextCommands':
      return {
        ...state,
        stack: [
          ...state.stack,
          {
            searchText: state.searchText,
            results: state.results,
            selectedResult: state.selectedResult,
          },
        ],
        selectedResult: 0,
        enableHistory: false,
        results: action.payload.results,
      };
    case 'setPrevCommands':
      return {
        ...state,
        searchText: action.payload.searchText,
        results: action.payload.results,
        selectedResult: 0,
        enableHistory: false,
        // omit last item
        stack: state.stack.slice(0, -1),
      };
    case 'searchText':
      return {
        ...state,
        searchText: action.payload,
        // clear network error when search text is cleared, so that users
        // are tempted to retry
        hasNetworkError: action.payload.length > 0 && state.hasNetworkError,
      };
    case 'setSearchTextResults':
      return {
        ...state,
        results: action.payload,
        selectedResult: action.payload.length > 0 ? 0 : -1,
        enableHistory: true,
        stack: [],
      };
    case 'resetSearchText':
      return { ...state, searchText: '', results: [], selectedResult: -1 };
    case 'resetResultsWhenClosing':
      return { ...state, selectedResult: -1, enableHistory: true };
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

type Props = {
  historyEntries: HistoryEntry[];
  onHistoryEntriesChange: (historyEntries: HistoryEntry[]) => void;
  search: (searchText: SearchText) => Promise<Command[]>;
  getNextCommands: (command: Command) => Promise<Command[]>;
  executeCommand: (command: Command, meta: { openInNewTab: boolean }) => void;
  onClose: () => void;
  classNameShakeAnimation: string;
};
const Butler = (props: Props) => {
  const intl = useIntl();
  const [state, dispatch] = useReducer<
    (prevState: State, action: Action) => State
  >(reducer, initialState);

  const shouldSelectFieldText = useRef(false);
  const isNewWindowCombo = useRef(false);
  const skipNextSelection = useRef(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const setHasNetworkError = useCallback(() => {
    dispatch({ type: 'networkError', payload: true });
  }, []);
  const unsetHasNetworkError = useCallback(() => {
    dispatch({ type: 'networkError', payload: false });
  }, []);
  const setIsLoading = useCallback(() => {
    dispatch({ type: 'loading', payload: true });
  }, []);
  const unsetIsLoading = useCallback(() => {
    dispatch({ type: 'loading', payload: false });
  }, []);

  // Destructure functions from props to reference them in the hook dependency list
  const {
    search: searchFromParent,
    onClose: onCloseFromParent,
    executeCommand: executeCommandFromParent,
    onHistoryEntriesChange: onHistoryEntriesChangeFromParent,
    getNextCommands: getNextCommandsFromParent,
  } = props;

  const shake = useCallback(() => {
    if (searchContainerRef.current) {
      searchContainerRef.current.classList.remove(
        props.classNameShakeAnimation
      );
      // -> triggering reflow
      // eslint-disable-next-line no-void
      void searchContainerRef.current.offsetWidth;
      searchContainerRef.current.classList.add(props.classNameShakeAnimation);
    }
  }, [props.classNameShakeAnimation]);

  const execute = useCallback(
    (command, meta) => {
      // Only main entries get added to history, so when a subcommand is executed,
      // we add the main command of it to the history (the top-level command).
      //
      // The key to identify history entries by is always the searchText
      // There will never be two history entries with the same searchText
      const entry =
        state.stack.length === 0
          ? // The stack is empty, so we are executing a top-level command
            { searchText: state.searchText, results: state.results }
          : // We are executing a subcommand, so we get the top-level command for it,
            // which is at the bottom of the stack.
            {
              searchText: state.stack[0].searchText,
              results: state.stack[0].results,
            };

      // Add the entry to the history, while excluding any earlier history entry
      // with the same search text. This effectively "moves" that entry to the
      // top of the history (with the most recent results), or appends a new entry
      // when it didn't exist before.
      onHistoryEntriesChangeFromParent([
        ...props.historyEntries.filter(
          (command) => command.searchText !== entry.searchText
        ),
        entry,
      ]);

      dispatch({ type: 'resetSearchText' });

      onCloseFromParent();

      executeCommandFromParent(command, meta);
    },
    [
      executeCommandFromParent,
      onCloseFromParent,
      onHistoryEntriesChangeFromParent,
      props.historyEntries,
      state.results,
      state.searchText,
      state.stack,
    ]
  );
  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event) => {
      // Preventing cursor jumps can only happen in onKeyDown, but not in onKeyUp
      event.persist();

      // We want to know when the user presses cmd+enter (cmd being a meta key).
      // We are only told about this in keyDown, but not in keyUp, so we need
      // to handle it here
      if (event.key === 'Enter' && hasNewWindowModifier(event)) {
        isNewWindowCombo.current = true;
        return;
      }

      // Avoid selecting the whole page when user selectes everything with
      // a keyboard shortcut. There is probably a better way to do this though.
      // This prevents the whole page from being selected in case the user
      // 1) opens the search box
      // 2) types into it
      // 3) selects all text using cmd+a
      // 4) closes the search box with esc
      // Without this handling, the whole page would now be selected
      if (isSelectAllCombo(event)) {
        // This stops the browser from selecting anything
        event.preventDefault();
        if (searchInputRef.current) {
          // This selects the text in the search input
          searchInputRef.current.setSelectionRange(0, state.searchText.length);
        }
        return;
      }

      // avoid interfering with other key combinations using modifier keys
      if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey)
        return;
      if (isCloseCombo(event)) return;

      // skip next mouseEnter to avoid setting selectedResult when cursor just
      // happens to be where the results will pop up
      skipNextSelection.current = true;

      if (event.key === 'ArrowDown') {
        // prevent cursor from jumping to end of text input
        event.preventDefault();
        dispatch({ type: 'incrementSelectedResult' });
        return;
      }
      if (event.key === 'ArrowUp') {
        // browse through history
        if (
          state.searchText.length === 0 ||
          (state.selectedResult < 1 && state.enableHistory)
        ) {
          shouldSelectFieldText.current = true;
          const selectedIndex =
            state.searchText.length === 0
              ? // When going back the first step
                -1
              : // When going back more than one step
                props.historyEntries.findIndex(
                  (command) => command.searchText === state.searchText
                );
          // Pick the previous command from the history
          const prevCommand =
            selectedIndex === -1
              ? // previous command on top of the history when going back on
                // first step
                last(props.historyEntries)
              : // previous command is deeper down
                // When the history does not exist (negative index), then
                // this implicitly returns undefined
                props.historyEntries[selectedIndex - 1];
          // Skip when no previous entry exists in the history
          if (!prevCommand) return;
          dispatch({
            type: 'pickCommandFromHistory',
            payload: {
              searchText: prevCommand.searchText,
              results: prevCommand.results,
            },
          });
          return;
        }
        // prevent cursor from jumping to beginning of text input
        event.preventDefault();
        dispatch({ type: 'decrementSelectedResult' });
        return;
      }
      if (state.selectedResult > -1) {
        if (event.key === 'ArrowRight') {
          const command = state.results[state.selectedResult];
          const searchText = state.searchText;
          const isCursorAtEnd =
            searchInputRef.current &&
            state.searchText.length === searchInputRef.current.selectionStart;

          const isEverythingSelected =
            searchInputRef.current &&
            searchInputRef.current.selectionStart === 0 &&
            state.searchText.length === searchInputRef.current.selectionEnd;

          // only allow diving in when cursor is at end of input or when
          // the complete text is selected (when browsing through history)
          if (!isCursorAtEnd && !isEverythingSelected) return;

          unsetHasNetworkError();

          // NOTE: since we need to fetch the "next command", which is an async operation,
          // we use a IIFE to process that and eventually update the state.
          (async () => {
            if (command) {
              const nextCommands = await getNextCommandsFromParent(command);
              // avoid moving cursor when there are sub-options
              if (nextCommands.length > 0) {
                // Ensure the search text has not changed while we were loading
                // the next results, otherwise we'd interrupt the user.
                // Throw away the results in case the search text has changed.
                if (state.searchText === searchText) {
                  dispatch({
                    type: 'setNextCommands',
                    payload: { results: nextCommands },
                  });
                }
                return;
              }
            }
            shake();
          })();
          return;
        }
        if (event.key === 'ArrowLeft') {
          // go left in stack
          const prevCommand = last(state.stack);

          // do nothing when we can't go left anymore
          if (!prevCommand) return;

          // prevent cursor from jumping a char to the left in text input
          event.preventDefault();

          dispatch({
            type: 'setPrevCommands',
            payload: {
              searchText: prevCommand.searchText,
              results: prevCommand.results,
            },
          });
          return;
        }
      }
    },
    [
      getNextCommandsFromParent,
      props.historyEntries,
      shake,
      state,
      unsetHasNetworkError,
    ]
  );
  const handleKeyUp = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event) => {
      // setting the selection can only happen in onKeyUp
      if (shouldSelectFieldText.current) {
        const input = event.target as HTMLInputElement;
        input.focus();
        input.select();
        shouldSelectFieldText.current = false;
      }

      if (event.key !== 'Enter' && !isNewWindowCombo.current) return true;

      // User just triggered the search
      if (state.selectedResult === -1) return true;

      // User had something selected and wants to go there
      execute(state.results[state.selectedResult], {
        openInNewTab: isNewWindowCombo.current,
      });

      isNewWindowCombo.current = false;
      return true;
    },
    [execute, state.results, state.selectedResult]
  );
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const searchText = event.target.value;
      if (searchText.trim().length === 0) {
        dispatch({ type: 'reset' });
        return;
      }

      dispatch({ type: 'searchText', payload: searchText });

      // A search via network is only triggered when there
      // are more than three characters. So no false loading
      // indication is given.
      if (searchText.trim().length > 3) {
        setIsLoading();
      }

      searchFromParent(searchText).then(
        (asyncResults: Command[]) => {
          unsetHasNetworkError();
          unsetIsLoading();

          const fuse = new Fuse(asyncResults, {
            keys: [
              { name: 'text', weight: 0.6 },
              { name: 'keywords', weight: 0.4 },
            ],
            minMatchCharLength: 2,
            includeScore: true,
          });

          const searchResults = fuse
            .search(searchText)
            // Filter out results with a matching score over 0.75
            .filter((result) => (result.score ? result.score < 0.75 : false))
            // Keep a maximal of 9 results
            .slice(0, 9);

          dispatch({
            type: 'setSearchTextResults',
            payload: searchResults.map((result) => result.item),
          });
        },
        (error: Error) => {
          // eslint-disable-next-line no-console
          if (process.env.NODE_ENV !== 'production') console.error(error);
          unsetIsLoading();
          setHasNetworkError();
        }
      );
    },
    [
      searchFromParent,
      setHasNetworkError,
      setIsLoading,
      unsetHasNetworkError,
      unsetIsLoading,
    ]
  );
  const handleContainerClick = useCallback(() => {
    dispatch({ type: 'resetResultsWhenClosing' });
    onCloseFromParent();
  }, [onCloseFromParent]);

  const createCommandMouseEnterHandler = useCallback<
    (index: number) => MouseEventHandler<HTMLDivElement>
  >(
    (index) => () => {
      // In case the cursor happened to be in a location where a
      // result would appear, it would trigger onMouseEnter and the
      // result would be selected immediately. This is not something
      // a user would expect, hence we prevent it from happening.
      // The user has to move the cursor to an option explicitly for
      // it to become active. However, the user can always click and
      // that action will be triggered.
      if (skipNextSelection.current) {
        skipNextSelection.current = false;
        return;
      }

      // sets the selected result, mainly for the hover effect
      dispatch({ type: 'selectedResult', payload: index });
    },
    []
  );
  const createCommandClickHandler = useCallback<
    (command: Command) => MouseEventHandler<HTMLDivElement>
  >(
    (command) => (event) => {
      execute(command, {
        openInNewTab: hasNewWindowModifier(event),
      });
    },
    [execute]
  );

  return (
    <ButlerContainer
      onClick={handleContainerClick}
      data-testid="quick-access"
      tabIndex={-1}
    >
      <div
        ref={searchContainerRef}
        css={css`
          background-color: ${designTokens.colorSurface};
          border: 0;
          border-radius: ${designTokens.borderRadius4};
          min-height: 40px;

          /* one more than app-bar (20000) and one more than the overlay (20001) */
          z-index: 20002;
          width: 400px;
          margin: 40px auto;
          overflow: hidden;
          -webkit-box-shadow: 0 10px 30px -8px rgba(0, 0, 0, 0.75);
          -moz-box-shadow: 0 10px 30px -8px rgba(0, 0, 0, 0.75);
          box-shadow: 0 10px 30px -8px rgba(0, 0, 0, 0.75);
          padding-bottom: ${state.hasNetworkError
            ? '0'
            : designTokens.spacingS};
        `}
        onClick={(event) => {
          // Avoid closing when the searchContainer itself is clicked
          // If we don't do this, then the overlay will close when e.g.
          // the search input is clicked.
          event.stopPropagation();
          event.preventDefault();
        }}
      >
        <div
          css={css`
            display: flex;
          `}
        >
          <label
            htmlFor="quick-access-search-input"
            css={css`
              align-self: center;
              padding-left: ${designTokens.spacingM};
              margin-top: ${designTokens.spacingS};
            `}
          >
            <SearchIcon color="neutral60" />
          </label>
          <input
            id="quick-access-search-input"
            ref={searchInputRef}
            placeholder={intl.formatMessage(messages.inputPlacehoder)}
            type="text"
            css={css`
              width: 100%;
              border: 0;
              outline: 0;
              font-size: 22px;
              font-weight: 300;
              padding: ${designTokens.spacingM} ${designTokens.spacingM}
                ${designTokens.spacingS} ${designTokens.spacingS};
              &::placeholder {
                color: ${designTokens.colorNeutral60};
              }
            `}
            value={state.searchText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            autoFocus={true}
            autoComplete="off"
            data-testid="quick-access-search-input"
          />
          {state.isLoading && (
            <div
              css={css`
                align-self: center;
                margin-top: ${designTokens.spacingS};
                margin-right: ${designTokens.spacingS};
              `}
            >
              <LoadingSpinner />
            </div>
          )}
        </div>
        {(() => {
          if (state.hasNetworkError)
            return (
              <div
                css={css`
                  overflow: hidden;
                  white-space: nowrap;
                  cursor: default;
                  background: ${designTokens.colorError};
                  text-align: center;
                  text-transform: uppercase;
                  color: ${designTokens.colorSurface};
                  font-size: ${designTokens.fontSize20};
                  padding: ${designTokens.spacingXs};
                `}
              >
                <FormattedMessage {...messages.offline} />
              </div>
            );

          if (state.results.length === 0 && state.searchText.trim().length > 0)
            return (
              <div
                css={css`
                  overflow: hidden;
                  white-space: nowrap;
                  cursor: default;
                  background: ${designTokens.colorNeutral};
                  color: ${designTokens.colorSolid};
                  text-align: center;
                  text-transform: uppercase;
                  font-size: ${designTokens.fontSize20};
                  padding: ${designTokens.spacingXs};
                `}
              >
                <FormattedMessage {...messages.noResults} />
              </div>
            );

          return state.results.map((command, index) => (
            <ButlerCommand
              key={command.id}
              command={command}
              isSelected={state.selectedResult === index}
              onMouseEnter={createCommandMouseEnterHandler(index)}
              onClick={createCommandClickHandler(command)}
            />
          ));
        })()}
      </div>
    </ButlerContainer>
  );
};
Butler.displayName = 'Butler';

const ButlerWithAnimation = (props: Omit<Props, 'classNameShakeAnimation'>) => (
  <ClassNames>
    {({ css }) => (
      <Butler
        {...props}
        classNameShakeAnimation={css`
          animation-duration: 0.45s;
          animation-fill-mode: both;
          animation-name: ${shakeAnimation};
        `}
      />
    )}
  </ClassNames>
);

export default ButlerWithAnimation;
