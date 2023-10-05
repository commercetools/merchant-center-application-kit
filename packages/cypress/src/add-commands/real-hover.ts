/**
 * NOTE: the `realHover` command is originally being implemented in `cypress-real-events` package.
 * https://github.com/dmtrKovalenko/cypress-real-events/blob/develop/src/commands/realHover.ts
 *
 * However, due to known issues with conflicting types between Cypress and Jest, importing the `cypress-real-events`
 * package here will cause such issues with TypeScript as our `@commercetools-frontend/cypress` package
 * is checked and built together with all other packages and not in isolation.
 * See https://docs.cypress.io/guides/tooling/typescript-support#Clashing-types-with-Jest.
 *
 * Therefore, we are porting here the implementation of `realHover` to avoid importing it from the
 * original package `cypress-real-events`.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Cypress: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const cy: any;

export interface RealHoverOptions {
  /**
   * If set to `pen`, simulates touch based hover (via long press)
   */
  pointer?: 'mouse' | 'pen';
  /**
   * Position relative to the element where to hover the element.
   * @example cy.realHover({ position: "topLeft" })
   */
  position?: Position;
  /**
   * Controls how the page is scrolled to bring the subject into view, if needed.
   * @example cy.realHover({ scrollBehavior: "top" });
   */
  scrollBehavior?: ScrollBehaviorOptions;
  /**
   * Indicates whether the shift key was pressed or not when an event occurred
   * @example cy.realHover({ shiftKey: true });
   */
  shiftKey?: boolean;
}

async function fireCdpCommand(
  command: string,
  params: Record<string, unknown>
): Promise<void> {
  return Cypress.automation('remote:debugger:protocol', {
    command,
    params,
  }).catch((error: Error) => {
    throw new Error(
      `Failed request to chrome devtools protocol. This can happen if cypress lost connection to the browser or the command itself is not valid. Original cypress error: ${error}`
    );
  });
}

type Position =
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'left'
  | 'center'
  | 'right'
  | 'bottomLeft'
  | 'bottom'
  | 'bottomRight'
  | { x: number; y: number };

type ScrollBehaviorPosition = 'center' | 'top' | 'bottom' | 'nearest';
type ScrollBehaviorOptions = ScrollBehaviorPosition | false;

function getPositionedCoordinates(
  x0: number,
  y0: number,
  width: number,
  height: number,
  position: Position,
  frameScale: number
) {
  if (typeof position === 'object' && position !== null) {
    const { x, y } = position;
    // scale the position coordinates according to the viewport scale
    return [x0 + x * frameScale, y0 + y * frameScale];
  }

  switch (position) {
    case 'topLeft':
      return [x0, y0];
    case 'top':
      return [x0 + width / 2, y0];
    case 'topRight':
      return [x0 + width - 1, y0];
    case 'left':
      return [x0, y0 + height / 2];
    case 'right':
      return [x0 + width - 1, y0 + height / 2];
    case 'bottomLeft':
      return [x0, y0 + height - 1];
    case 'bottom':
      return [x0 + width / 2, y0 + height - 1];
    case 'bottomRight':
      return [x0 + width - 1, y0 + height - 1];
    // center by default
    default:
      return [x0 + width / 2, y0 + height / 2];
  }
}
/**
 * Scrolls the given htmlElement into view on the page.
 * The position the element is scrolled to can be customized with scrollBehavior.
 */
function scrollIntoView(
  htmlElement: HTMLElement,
  scrollBehavior: ScrollBehaviorPosition = 'center'
) {
  let block: ScrollLogicalPosition;

  if (scrollBehavior === 'top') {
    block = 'start';
  } else if (scrollBehavior === 'bottom') {
    block = 'end';
  } else {
    block = scrollBehavior;
  }

  htmlElement.scrollIntoView({ block });
}

// for cross origin domains .frameElement returns null so query using parentWindow
// but when running using --disable-web-security it will return the frame element
function getFrameElement(currentWindow: Window): HTMLElement {
  if (currentWindow.frameElement) {
    // accessible for same-origin iframes
    // or when running with --disable-web-security
    return currentWindow.frameElement as HTMLElement;
  }

  // fallback to querying using the parent window, mainly to grab the AUT iframe
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return [...currentWindow.parent.document.querySelectorAll('iframe')].find(
    (iframe) => iframe.contentWindow === currentWindow
  )!;
}

function getIframesPositionShift(element: HTMLElement) {
  let currentWindow: Window | null = element.ownerDocument.defaultView;
  const noPositionShift = {
    frameScale: 1,
    frameX: 0,
    frameY: 0,
  };

  if (!currentWindow) {
    return noPositionShift;
  }

  // eslint-disable-next-line prefer-const
  const iframes = [];

  while (currentWindow !== window.top) {
    iframes.push(getFrameElement(currentWindow));
    currentWindow = currentWindow.parent;
  }

  return iframes.reduceRight(({ frameX, frameY, frameScale }, frame) => {
    const { x, y, width } = frame.getBoundingClientRect();

    return {
      frameX: frameX + x * frameScale,
      frameY: frameY + y * frameScale,
      frameScale: frameScale * (width / frame.offsetWidth),
    };
  }, noPositionShift);
}

/**
 * Returns the coordinates and size of a given Element, relative to the Cypress app <iframe>.
 * Accounts for any scaling on the iframes.
 */
function getElementPositionXY(htmlElement: HTMLElement) {
  const {
    x: elementX,
    y: elementY,
    width,
    height,
  } = htmlElement.getBoundingClientRect();

  const { frameScale, frameX, frameY } = getIframesPositionShift(htmlElement);

  return {
    x: frameX + elementX * frameScale,
    y: frameY + elementY * frameScale,
    width: width * frameScale,
    height: height * frameScale,
    frameScale: frameScale,
  };
}

function getCypressElementCoordinates(
  // @ts-ignore
  jqueryEl: JQuery,
  position: Position | undefined,
  scrollBehavior?: ScrollBehaviorOptions
) {
  const htmlElement = jqueryEl.get(0);
  const cypressAppFrame = window.parent.document.querySelector('iframe');

  if (!cypressAppFrame) {
    throw new Error(
      'Can not find cypress application iframe, it looks like critical issue. Please rise an issue on GitHub.'
    );
  }

  const effectiveScrollBehavior = (scrollBehavior ??
    Cypress.config('scrollBehavior') ??
    'center') as ScrollBehaviorOptions;
  if (effectiveScrollBehavior && typeof effectiveScrollBehavior !== 'object') {
    scrollIntoView(htmlElement, effectiveScrollBehavior);
  }

  const { x, y, width, height, frameScale } = getElementPositionXY(htmlElement);
  const [posX, posY] = getPositionedCoordinates(
    x,
    y,
    width,
    height,
    position ?? 'center',
    frameScale
  );

  return {
    x: posX,
    y: posY,
    frameScale: frameScale,
  };
}

const keyToModifierBitMap: Record<string, number> = {
  Alt: 1,
  Control: 2,
  Meta: 4,
  Shift: 8,
};

export async function realHover(
  // @ts-ignore
  subject: JQuery,
  options: RealHoverOptions = {}
) {
  const { x, y } = getCypressElementCoordinates(
    subject,
    options.position,
    options.scrollBehavior
  );

  const log = Cypress.log({
    $el: subject,
    name: 'realHover',
    consoleProps: () => ({
      'Applied To': subject.get(0),
      'Absolute Coordinates': { x, y },
    }),
  });

  await fireCdpCommand('Input.dispatchMouseEvent', {
    x,
    y,
    type: 'mouseMoved',
    button: 'none',
    pointerType: options.pointer ?? 'mouse',
    modifiers: options.shiftKey ? keyToModifierBitMap.Shift : 0,
  });

  log.snapshot().end();

  return subject;
}
