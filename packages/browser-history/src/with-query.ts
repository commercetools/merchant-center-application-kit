import type {
  History,
  Listener,
  Location,
  Action,
  Blocker,
  State,
  Update,
  To,
  PartialPath,
} from 'history';

export interface EnhancedLocation<Q extends {}, S extends State = State>
  extends Location<S> {
  query: Partial<Q>;
}

export interface EnhancedUpdate<Q extends {}, S extends State = State>
  extends Update<S> {
  action: Action;
  location: EnhancedLocation<Q, S>;
}

export interface EnhancedListener<Q extends {}, S extends State = State>
  extends Listener<S> {
  (update: EnhancedUpdate<Q, S>): void;
}

export interface EnhancedTransition<Q extends {}, S extends State = State>
  extends EnhancedUpdate<Q, S> {
  retry(): void;
}

export interface EnhancedBlocker<Q extends {}, S extends State = State>
  extends Blocker<S> {
  (tx: EnhancedTransition<Q, S>): void;
}

export interface EnhancedHistory<Q extends {}, S extends State = State>
  extends History<S> {
  readonly action: Action;
  readonly location: EnhancedLocation<Q, S>;
  createHref(to: To): string;
  push(to: To, state?: S): void;
  replace(to: To, state?: S): void;
  go(delta: number): void;
  back(): void;
  forward(): void;
  listen(listener: EnhancedListener<Q, S>): () => void;
  block(blocker: EnhancedBlocker<Q, S>): () => void;
}

export interface QueryTransformer<Q extends {}> {
  parse(str: string): Q;
  stringify(obj: Partial<Q>): string;
}

function withQuery<Q extends {}, S extends State = State>({
  parse,
  stringify,
}: QueryTransformer<Q>) {
  return function createEnhancedHistory(
    history: History<S>
  ): EnhancedHistory<Q, S> {
    /**
     * Enhance the original `location` with the `query` object.
     */
    const enhanceLocation = (
      location: Location<S>
    ): EnhancedLocation<Q, S> => ({
      ...location,
      query: parse(location.search),
    });

    /**
     * Serialize the `query` object to a `search` string.
     */
    const serializePath = (
      partialPath: PartialPath,
      enhancedLocation: EnhancedLocation<Q, S>
    ): PartialPath => ({
      ...partialPath,
      search:
        enhancedLocation.query && typeof enhancedLocation.query === 'object'
          ? stringify(enhancedLocation.query)
          : location.search,
    });

    /**
     * The enhanced `history` object.
     */
    const enhancedHistory: EnhancedHistory<Q, S> = {
      ...history,

      location: enhanceLocation(history.location),

      push(to: To, state?: S) {
        if (typeof to === 'object') {
          history.push(serializePath(to, enhanceLocation(history.location)));
        } else {
          history.push(to, state);
        }
      },

      replace(to: To, state?: S) {
        if (typeof to === 'object') {
          history.replace(serializePath(to, enhanceLocation(history.location)));
        } else {
          history.replace(to, state);
        }
      },

      block(blocker: EnhancedBlocker<Q, S>) {
        return history.block(({ action, location, retry }) => {
          blocker({ action, location: enhanceLocation(location), retry });
        });
      },

      listen(listener: EnhancedListener<Q, S>) {
        return history.listen(({ action, location }) => {
          listener({ action, location: enhanceLocation(location) });
        });
      },

      createHref(to: To) {
        if (typeof to === 'object') {
          return history.createHref(
            serializePath(to, enhanceLocation(history.location))
          );
        }
        return history.createHref(to);
      },
    };

    Object.defineProperties(enhancedHistory, {
      /**
       * The enhanced `location` object.
       */
      location: {
        get() {
          return enhanceLocation(history.location);
        },
      },
    });

    return enhancedHistory;
  };
}

export default withQuery;
