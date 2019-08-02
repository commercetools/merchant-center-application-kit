// Type definitions for UI-Kit >= 10
// Project: https://uikit.commercetools.com/
// Definitions by: Nicola Molinari <https://github.com/emmenko>
// TypeScript Version: 3.1

export type MessageDescriptor = {
  id: string;
  description?: string;
  defaultMessage: string;
};

export const version: string;

// Design tokens - customProperties
type CustomProperties = {
  colorPrimary: '#00b39e';
  colorPrimary25: 'hsl(172.9608938547486, 100%, 25%)';
  colorPrimary40: 'hsl(172.9608938547486, 100%, 40%)';
  colorPrimary85: 'hsl(172.9608938547486, 100%, 85%)';
  colorPrimary95: 'hsl(172.9608938547486, 100%, 95%)';
  colorAccent: '#213c45';
  colorAccent30: 'hsl(195, 35.2941176471%, 30%)';
  colorAccent40: 'hsl(195, 35.2941176471%, 40%)';
  colorAccent95: 'hsl(195, 35.2941176471%, 95%)';
  colorAccent98: 'hsl(195, 35.2941176471%, 98%)';
  colorNeutral: '#ccc';
  colorNeutral60: 'hsl(0, 0%, 60%)';
  colorNeutral90: 'hsl(0, 0%, 90%)';
  colorNeutral95: 'hsl(0, 0%, 95%)';
  colorInfo: '#078cdf';
  colorInfo85: 'hsl(203.05555555555554, 93.9130434783%, 85%)';
  colorInfo95: 'hsl(203.05555555555554, 93.9130434783%, 95%)';
  colorWarning: '#f16d0e';
  colorWarning95: 'hsl(25.110132158590307, 89.0196078431%, 95%)';
  colorError: '#e60050';
  colorError95: 'hsl(339.1304347826087, 100%, 95%)';
  colorSolid: '#1a1a1a';
  colorSurface: '#fff';
  borderRadius1: '1px';
  borderRadius2: '2px';
  borderRadius4: '4px';
  borderRadius6: '6px';
  borderRadius20: '20px';
  fontFamilyBody: "'Open Sans', sans-serif";
  fontSizeM: '1rem';
  shadow1: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)';
  shadow2: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)';
  shadow3: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)';
  shadow4: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)';
  shadow5: '0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22)';
  shadow6: '0 -1px 2px 0 rgba(0, 0, 0, 0.2)';
  shadow7: '0 -1px 1.5px 0 rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.24)';
  shadow8: '0 1px 9.5px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.24)';
  shadow9: 'inset 0 -1px 3px 0 rgba(0, 0, 0, 0.1), inset 0 1px 1.5px 0 rgba(0, 0, 0, 0.2), inset 0 1px 1.5px 0 rgba(0, 0, 0, 0.25)';
  shadow10: '0 0 0 1px rgba(224, 230, 237, 0.5)';
  shadow11: '0 1px 0.5px rgba(0, 0, 0, 0.24), 0 -1px 0.75px rgba(0, 0, 0, 0.12)';
  shadow12: '0 0 1px rgba(0, 0, 0, 0.25)';
  shadow13: '0 0 1px rgba(0, 0, 0, 0.25)';
  shadow14: '0 0 0.5px rgba(0, 0, 0, 0.1)';
  shadow15: '0 2px 2px rgba(0, 0, 0, 0.24), 0 1px 4.75px rgba(0, 0, 0, 0.12)';
  shadow16: '0.5px 1.5px 4px 1px rgba(0, 0, 0, 0.25), -0.5px -0.5px 4px 1px rgba(0, 0, 0, 0.25)';
  constraintScale: '100%';
  constraintXs: '50px';
  constraintS: '132px';
  constraintM: '355px';
  constraintL: '496px';
  constraintXl: '768px';
  spacingXs: '4px';
  spacingS: '8px';
  spacingM: '16px';
  spacingL: '24px';
  spacingXl: '32px';
  transitionLinear80Ms: '80ms linear';
  transitionEaseinout150Ms: '150ms ease-in-out';
  transitionStandard: '200ms ease';
  breakPointMobile: '768px';
  breakPointDesktop: '1024px';
  breakPointBiggerdesktop: '1280px';
  breakPointGiantdesktop: '1680px';
  breakPointJumbodesktop: '1920px';
  backgroundColorForInput: '#fff';
  backgroundColorForInputWhenSelected: 'hsl(195, 35.2941176471%, 95%)';
  backgroundColorForInputWhenDisabled: 'hsl(195, 35.2941176471%, 98%)';
  backgroundColorForInputWhenHovered: 'hsl(0, 0%, 90%)';
  backgroundColorForTag: 'hsl(0, 0%, 95%)';
  backgroundColorForTagWarning: 'hsl(25.110132158590307, 89.0196078431%, 95%)';
  borderColorForInput: 'hsl(0, 0%, 60%)';
  borderColorForInputWhenFocused: '#00b39e';
  borderColorForInputWhenDisabled: '#ccc';
  borderColorForInputWhenReadonly: '#ccc';
  borderColorForInputWhenError: '#e60050';
  borderColorForInputWhenWarning: '#f16d0e';
  borderColorForTag: 'hsl(0, 0%, 60%)';
  borderColorForTagWarning: '#f16d0e';
  borderColorForTagWhenFocused: '#00b39e';
  borderRadiusForInput: '6px';
  borderRadiusForTag: '2px';
  fontColorForInput: '#1a1a1a';
  fontColorForInputWhenDisabled: 'hsl(0, 0%, 60%)';
  fontColorForInputWhenError: '#e60050';
  fontColorForInputWhenReadonly: 'hsl(0, 0%, 60%)';
  fontColorForInputWhenWarning: '#f16d0e';
  fontColorForTag: '#1a1a1a';
  fontColorForTagWhenDisabled: 'hsl(0, 0%, 60%)';
  fontFamily: "'Open Sans', sans-serif";
  placeholderFontColorForInput: 'hsl(0, 0%, 60%)';
  fontSizeForInput: '1rem';
  shadowBoxTagWhenHovered: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)';
  bigButtonHeight: '32px';
  smallButtonHeight: '24px';
  sizeHeightInput: '32px';
  fontFamilyDefault: "'Open Sans', sans-serif";
  fontSizeDefault: '1rem';
  fontSizeSmall: '0.9231rem';
  shadowBoxTagHover: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)';
  sizeHeightTag: '26px';
  standardInputHeight: '32px';
};
export const customProperties: CustomProperties;

// <ContentNotification>
export type ContentNotificationProps = {
  type: 'error' | 'info' | 'warning' | 'success';
  children: React.ReactNode;
};
export const ContentNotification: {
  (props: ContentNotificationProps): JSX.Element;
  displayName: string;
};

// <Avatar>
export type AvatarProps = {
  firstName: string;
  lastName: string;
  gravatarHash: string;
  isHighlighted: boolean;
  size: 's' | 'm' | 'l';
  children?: never;
};
export const Avatar: {
  (props: AvatarProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<
    AvatarProps,
    'firstName' | 'lastName' | 'isHighlighted' | 'size'
  >;
};

// <Spacings.Stack>
export type SpacingsStackProps = {
  scale: 'xs' | 's' | 'm' | 'l' | 'xl';
  alignItems:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'flexStart'
    | 'flexEnd';
  children: React.ReactNode;
};
export const SpacingsStack: {
  (props: SpacingsStackProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<SpacingsStackProps, 'scale' | 'alignItems'>;
};

// <Spacings.Inline>
export type SpacingsInlineProps = {
  scale: 'xs' | 's' | 'm' | 'l' | 'xl';
  alignItems:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'flexStart'
    | 'flexEnd';
  justifyContent:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  children: React.ReactNode;
};
export const SpacingsInline: {
  (props: SpacingsInlineProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<
    SpacingsInlineProps,
    'scale' | 'alignItems' | 'justifyContent'
  >;
};

// <Spacings.Inset>
export type SpacingsInsetProps = {
  scale: 'xs' | 's' | 'm' | 'l' | 'xl';
  children: React.ReactNode;
};
export const SpacingsInset: {
  (props: SpacingsInsetProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<SpacingsInsetProps, 'scale'>;
};

// <Spacings.InsetSquish>
export type SpacingsInsetSquishProps = {
  scale: 's' | 'm' | 'l';
  children: React.ReactNode;
};
export const SpacingsInsetSquish: {
  (props: SpacingsInsetSquishProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<SpacingsInsetSquishProps, 'scale'>;
};

export const Spacings: {
  Stack: typeof SpacingsStack;
  Inline: typeof SpacingsInline;
  Inset: typeof SpacingsInset;
  InsetSquish: typeof SpacingsInsetSquish;
};

// <Text.Headline>
export type TextHeadlineProps = {
  as: 'h1' | 'h2' | 'h3';
  title?: string;
  truncate?: boolean;
  children?: React.ReactNode;
  intlMessage?: MessageDescriptor;
};
export const TextHeadline: {
  (props: TextHeadlineProps): JSX.Element;
  displayName: string;
};

// <Text.Subeadline>
export type TextSubeadlineProps = {
  as: 'h4' | 'h5';
  title?: string;
  truncate?: boolean;
  isBold?: boolean;
  tone?: 'primary' | 'secondary' | 'information' | 'positive' | 'negative';
  children?: React.ReactNode;
  intlMessage?: MessageDescriptor;
};
export const TextSubheadline: {
  (props: TextSubeadlineProps): JSX.Element;
  displayName: string;
};

// <Text.Wrap>
export type TextWrapProps = {
  title?: string;
  children?: React.ReactNode;
  intlMessage?: MessageDescriptor;
};
export const TextWrap: {
  (props: TextWrapProps): JSX.Element;
  displayName: string;
};

// <Text.Body>
export type TextBodyProps = {
  as: 'span' | 'p';
  title?: string;
  truncate?: boolean;
  isBold?: boolean;
  isItalic?: boolean;
  tone?:
    | 'primary'
    | 'secondary'
    | 'information'
    | 'positive'
    | 'negative'
    | 'inverted';
  children?: React.ReactNode;
  intlMessage?: MessageDescriptor;
};
export const TextBody: {
  (props: TextBodyProps): JSX.Element;
  displayName: string;
};

// <Text.Detail>
export type TextDetailProps = {
  title?: string;
  truncate?: boolean;
  isBold?: boolean;
  isItalic?: boolean;
  isInline?: boolean;
  tone?:
    | 'primary'
    | 'secondary'
    | 'information'
    | 'positive'
    | 'negative'
    | 'warning'
    | 'inverted';
  children?: React.ReactNode;
  intlMessage?: MessageDescriptor;
};
export const TextDetail: {
  (props: TextDetailProps): JSX.Element;
  displayName: string;
};

export const Text: {
  Headline: typeof TextHeadline;
  Subheadline: typeof TextSubheadline;
  Wrap: typeof TextWrap;
  Body: typeof TextBody;
  Detail: typeof TextDetail;
};

// <FlatButton>
export type FlatButtonProps = {
  tone: 'primary' | 'secondary';
  type: 'submit' | 'reset' | 'button';
  label: string;
  onClick: (event: React.SyntheticEvent) => void;
  icon?: React.ReactNode;
  iconPosition: 'left' | 'right';
  isDisabled: boolean;
  children?: never;
};
export const FlatButton: {
  (props: FlatButtonProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<
    FlatButtonProps,
    'tone' | 'type' | 'iconPosition' | 'isDisabled'
  >;
};

// <IconButton>
export type IconButtonProps = {
  type: 'submit' | 'reset' | 'button';
  label: string;
  icon?: React.ReactNode;
  isDisabled?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  shape: 'round' | 'square';
  size: 'small' | 'medium' | 'big';
  isToggleButton: boolean;
  // NOTE: only required if `isToggleButton` is defined
  isToggled?: boolean;
  // NOTE: only valid if `isToggleButton` is defined
  theme: 'default' | 'primary' | 'info';
  children?: never;
};
export const IconButton: {
  (props: IconButtonProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<
    IconButtonProps,
    'type' | 'theme' | 'size' | 'shape' | 'isToggleButton'
  >;
};

// <LinkButton>
export type LinkButtonProps = {
  label: string;
  to:
    | string
    | { pathname: string; search?: string; query?: Record<string, string> };
  iconLeft?: React.ReactNode;
  isDisabled: boolean;
  isExternal: boolean;
  children?: never;
};
export const LinkButton: {
  (props: LinkButtonProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<LinkButtonProps, 'isDisabled' | 'isExternal'>;
};

// <PrimaryButton>
export type PrimaryButtonProps = {
  type: 'submit' | 'reset' | 'button';
  label: string;
  // Any valid HTML attributes to be passed to the button element
  buttonAttributes?: { [key: string]: string };
  iconLeft?: React.ReactNode;
  isToggleButton: boolean;
  // NOTE: only required if `isToggleButton` is defined
  isToggled?: boolean;
  isDisabled?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  size: 'big' | 'small';
  tone: 'urgent' | 'primary';
  children?: never;
};
export const PrimaryButton: {
  (props: PrimaryButtonProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<
    PrimaryButtonProps,
    'type' | 'size' | 'isToggleButton' | 'tone'
  >;
};

// <SecondaryButton>
export type SecondaryButtonProps = {
  // NOTE: only used when `linkTo` is not defined
  type: 'submit' | 'reset' | 'button';
  label: string;
  // Any valid HTML attributes to be passed to the button element
  buttonAttributes?: { [key: string]: string };
  iconLeft?: React.ReactNode;
  isToggleButton: boolean;
  // NOTE: only required if `isToggleButton` is defined
  isToggled?: boolean;
  // NOTE: only valid if `isToggleButton` is defined
  theme: 'default' | 'info';
  isDisabled?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  linkTo?:
    | string
    | { pathname: string; search?: string; query?: Record<string, string> };
  children?: never;
};
export const SecondaryButton: {
  (props: SecondaryButtonProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<SecondaryButtonProps, 'type' | 'theme' | 'isToggleButton'>;
};

// <SecondaryIconButton>
export type SecondaryIconButtonProps = {
  // NOTE: only used when `linkTo` is not defined
  type: 'submit' | 'reset' | 'button';
  icon: React.ReactNode;
  color: 'solid' | 'primary';
  label: string;
  onClick: (event: React.SyntheticEvent) => void;
  isDisabled: boolean;
  children?: never;
};
export const SecondaryIconButton: {
  (props: SecondaryIconButtonProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<SecondaryIconButtonProps, 'color' | 'type' | 'isDisabled'>;
};

// <Card>
export type CardProps = {
  className?: string;
  type: 'raised' | 'flat';
  theme: 'light' | 'dark';
  children: React.ReactNode;
};
export const Card: {
  (props: CardProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CardProps, 'type' | 'theme'>;
};

// <Collapsible>
export type CollapsibleRenderProps = {
  isOpen: boolean;
  toggle: () => void;
};
export type CollapsibleProps = {
  isDefaultClosed: boolean;
  isClosed?: boolean;
  // NOTE: required when `isClosed` is defined
  onToggle?: () => void;
  children: (renderProps: CollapsibleRenderProps) => React.ReactNode;
};
export const Collapsible: {
  (props: CollapsibleProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CollapsibleProps, 'isDefaultClosed'>;
};

// <CollapsibleMotion>
export type CollapsibleMotionRenderProps = {
  isOpen: boolean;
  containerStyles: React.CSSProperties;
  toggle: () => void;
  registerContentNode: React.RefObject<HTMLElement>;
};
export type CollapsibleMotionProps = {
  isDefaultClosed: boolean;
  isOpen: boolean;
  onToggle: () => void;
  children: (renderProps: CollapsibleMotionRenderProps) => React.ReactNode;
};
export const CollapsibleMotion: {
  (props: CollapsibleMotionProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CollapsibleMotionProps, 'isDefaultClosed'>;
};

// <ConstraintsHorizontal>
export type ConstraintsHorizontalProps = {
  constraint: 'xs' | 's' | 'm' | 'l' | 'xl' | 'scale';
  children: React.ReactNode;
};
export const ConstraintsHorizontal: {
  (props: ConstraintsHorizontalProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ConstraintsHorizontalProps, 'constraint'>;
};

export const Constraints: {
  Horizontal: typeof ConstraintsHorizontal;
};

// <PrimaryActionDropdown>
export type PrimaryActionDropdownProps = {
  children: React.ReactNode;
};
export const PrimaryActionDropdown: {
  (props: PrimaryActionDropdownProps): JSX.Element;
  displayName: string;
};

// <PrimaryActionDropdownOption>
export type PrimaryActionDropdownOptionProps = {
  onClick: (event: React.SyntheticEvent) => void;
  isDisabled: boolean;
  iconLeft: React.ReactNode;
  children: string;
};
export const PrimaryActionDropdownOption: {
  (props: PrimaryActionDropdownOptionProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<PrimaryActionDropdownOptionProps, 'isDisabled'>;
};

// Icons
export type AngleDownIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const AngleDownIcon: {
  (props: AngleDownIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<AngleDownIconProps, 'size'>;
};
export type AngleLeftIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const AngleLeftIcon: {
  (props: AngleLeftIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<AngleLeftIconProps, 'size'>;
};
export type AngleRightIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const AngleRightIcon: {
  (props: AngleRightIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<AngleRightIconProps, 'size'>;
};
export type AngleThinLeftIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const AngleThinLeftIcon: {
  (props: AngleThinLeftIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<AngleThinLeftIconProps, 'size'>;
};
export type AngleThinRightIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const AngleThinRightIcon: {
  (props: AngleThinRightIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<AngleThinRightIconProps, 'size'>;
};
export type AngleUpIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const AngleUpIcon: {
  (props: AngleUpIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<AngleUpIconProps, 'size'>;
};
export type ArrowDownIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ArrowDownIcon: {
  (props: ArrowDownIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ArrowDownIconProps, 'size'>;
};
export type ArrowLeftIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ArrowLeftIcon: {
  (props: ArrowLeftIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ArrowLeftIconProps, 'size'>;
};
export type ArrowLongDownIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ArrowLongDownIcon: {
  (props: ArrowLongDownIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ArrowLongDownIconProps, 'size'>;
};
export type ArrowRightIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ArrowRightIcon: {
  (props: ArrowRightIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ArrowRightIconProps, 'size'>;
};
export type ArrowTriangleDownIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ArrowTriangleDownIcon: {
  (props: ArrowTriangleDownIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ArrowTriangleDownIconProps, 'size'>;
};
export type ArrowTriangleUpIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ArrowTriangleUpIcon: {
  (props: ArrowTriangleUpIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ArrowTriangleUpIconProps, 'size'>;
};
export type ArrowUpIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ArrowUpIcon: {
  (props: ArrowUpIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ArrowUpIconProps, 'size'>;
};
export type ArrowsIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ArrowsIcon: {
  (props: ArrowsIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ArrowsIconProps, 'size'>;
};
export type BackIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const BackIcon: {
  (props: BackIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<BackIconProps, 'size'>;
};
export type BidirectionalArrowIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const BidirectionalArrowIcon: {
  (props: BidirectionalArrowIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<BidirectionalArrowIconProps, 'size'>;
};
export type BinFilledIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const BinFilledIcon: {
  (props: BinFilledIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<BinFilledIconProps, 'size'>;
};
export type BinLinearIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const BinLinearIcon: {
  (props: BinLinearIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<BinLinearIconProps, 'size'>;
};
export type BoxIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const BoxIcon: {
  (props: BoxIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<BoxIconProps, 'size'>;
};
export type BrainIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const BrainIcon: {
  (props: BrainIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<BrainIconProps, 'size'>;
};
export type CalendarIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const CalendarIcon: {
  (props: CalendarIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CalendarIconProps, 'size'>;
};
export type CameraIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const CameraIcon: {
  (props: CameraIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CameraIconProps, 'size'>;
};
export type CaretDownIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const CaretDownIcon: {
  (props: CaretDownIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CaretDownIconProps, 'size'>;
};
export type CaretUpIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const CaretUpIcon: {
  (props: CaretUpIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CaretUpIconProps, 'size'>;
};
export type CartIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const CartIcon: {
  (props: CartIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CartIconProps, 'size'>;
};
export type ChainBrokenIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ChainBrokenIcon: {
  (props: ChainBrokenIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ChainBrokenIconProps, 'size'>;
};
export type ChainIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ChainIcon: {
  (props: ChainIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ChainIconProps, 'size'>;
};
export type CheckActiveIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const CheckActiveIcon: {
  (props: CheckActiveIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CheckActiveIconProps, 'size'>;
};
export type CheckBoldIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const CheckBoldIcon: {
  (props: CheckBoldIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CheckBoldIconProps, 'size'>;
};
export type CheckInactiveIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const CheckInactiveIcon: {
  (props: CheckInactiveIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CheckInactiveIconProps, 'size'>;
};
export type CheckThinIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const CheckThinIcon: {
  (props: CheckThinIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CheckThinIconProps, 'size'>;
};
export type CircleIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const CircleIcon: {
  (props: CircleIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CircleIconProps, 'size'>;
};
export type ClipboardIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ClipboardIcon: {
  (props: ClipboardIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ClipboardIconProps, 'size'>;
};
export type ClockIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ClockIcon: {
  (props: ClockIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ClockIconProps, 'size'>;
};
export type CloseBoldIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const CloseBoldIcon: {
  (props: CloseBoldIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CloseBoldIconProps, 'size'>;
};
export type CloseIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const CloseIcon: {
  (props: CloseIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CloseIconProps, 'size'>;
};
export type CodeViewIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const CodeViewIcon: {
  (props: CodeViewIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CodeViewIconProps, 'size'>;
};
export type CoinsIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const CoinsIcon: {
  (props: CoinsIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CoinsIconProps, 'size'>;
};
export type ColumnsIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ColumnsIcon: {
  (props: ColumnsIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ColumnsIconProps, 'size'>;
};
export type ConnectedSquareIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ConnectedSquareIcon: {
  (props: ConnectedSquareIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ConnectedSquareIconProps, 'size'>;
};
export type ConnectedTriangleIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ConnectedTriangleIcon: {
  (props: ConnectedTriangleIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ConnectedTriangleIconProps, 'size'>;
};
export type CopyIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const CopyIcon: {
  (props: CopyIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CopyIconProps, 'size'>;
};
export type CubeIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const CubeIcon: {
  (props: CubeIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CubeIconProps, 'size'>;
};
export type CubesIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const CubesIcon: {
  (props: CubesIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CubesIconProps, 'size'>;
};
export type DotIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const DotIcon: {
  (props: DotIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<DotIconProps, 'size'>;
};
export type DownloadIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const DownloadIcon: {
  (props: DownloadIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<DownloadIconProps, 'size'>;
};
export type DragDropIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const DragDropIcon: {
  (props: DragDropIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<DragDropIconProps, 'size'>;
};
export type DragIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const DragIcon: {
  (props: DragIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<DragIconProps, 'size'>;
};
export type EditIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const EditIcon: {
  (props: EditIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<EditIconProps, 'size'>;
};
export type ErrorIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ErrorIcon: {
  (props: ErrorIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ErrorIconProps, 'size'>;
};
export type ExpandIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ExpandIcon: {
  (props: ExpandIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ExpandIconProps, 'size'>;
};
export type ExportIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ExportIcon: {
  (props: ExportIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ExportIconProps, 'size'>;
};
export type ExternalLinkIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ExternalLinkIcon: {
  (props: ExternalLinkIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ExternalLinkIconProps, 'size'>;
};
export type EyeCrossedIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const EyeCrossedIcon: {
  (props: EyeCrossedIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<EyeCrossedIconProps, 'size'>;
};
export type EyeIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const EyeIcon: {
  (props: EyeIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<EyeIconProps, 'size'>;
};
export type FilterIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const FilterIcon: {
  (props: FilterIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<FilterIconProps, 'size'>;
};
export type FlagFilledIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const FlagFilledIcon: {
  (props: FlagFilledIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<FlagFilledIconProps, 'size'>;
};
export type FlagLinearIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const FlagLinearIcon: {
  (props: FlagLinearIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<FlagLinearIconProps, 'size'>;
};
export type FlameIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const FlameIcon: {
  (props: FlameIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<FlameIconProps, 'size'>;
};
export type FractionDigitsIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const FractionDigitsIcon: {
  (props: FractionDigitsIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<FractionDigitsIconProps, 'size'>;
};
export type GearIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const GearIcon: {
  (props: GearIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<GearIconProps, 'size'>;
};
export type GraduationCapIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const GraduationCapIcon: {
  (props: GraduationCapIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<GraduationCapIconProps, 'size'>;
};
export type GraphIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const GraphIcon: {
  (props: GraphIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<GraphIconProps, 'size'>;
};
export type GridIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const GridIcon: {
  (props: GridIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<GridIconProps, 'size'>;
};
export type HeartIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const HeartIcon: {
  (props: HeartIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<HeartIconProps, 'size'>;
};
export type ImportIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ImportIcon: {
  (props: ImportIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ImportIconProps, 'size'>;
};
export type InfoIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const InfoIcon: {
  (props: InfoIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<InfoIconProps, 'size'>;
};
export type InformationIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const InformationIcon: {
  (props: InformationIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<InformationIconProps, 'size'>;
};
export type ListIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ListIcon: {
  (props: ListIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ListIconProps, 'size'>;
};
export type LogoutIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const LogoutIcon: {
  (props: LogoutIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<LogoutIconProps, 'size'>;
};
export type MailIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const MailIcon: {
  (props: MailIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<MailIconProps, 'size'>;
};
export type MinimizeIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const MinimizeIcon: {
  (props: MinimizeIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<MinimizeIconProps, 'size'>;
};
export type NestedViewIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const NestedViewIcon: {
  (props: NestedViewIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<NestedViewIconProps, 'size'>;
};
export type PageGearIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const PageGearIcon: {
  (props: PageGearIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<PageGearIconProps, 'size'>;
};
export type PagesIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const PagesIcon: {
  (props: PagesIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<PagesIconProps, 'size'>;
};
export type PaperBillInvertedIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const PaperBillInvertedIcon: {
  (props: PaperBillInvertedIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<PaperBillInvertedIconProps, 'size'>;
};
export type PaperclipIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const PaperclipIcon: {
  (props: PaperclipIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<PaperclipIconProps, 'size'>;
};
export type PinFilledIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const PinFilledIcon: {
  (props: PinFilledIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<PinFilledIconProps, 'size'>;
};
export type PinGearIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const PinGearIcon: {
  (props: PinGearIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<PinGearIconProps, 'size'>;
};
export type PinLinearIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const PinLinearIcon: {
  (props: PinLinearIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<PinLinearIconProps, 'size'>;
};
export type PluginIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const PluginIcon: {
  (props: PluginIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<PluginIconProps, 'size'>;
};
export type PlusBoldIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const PlusBoldIcon: {
  (props: PlusBoldIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<PlusBoldIconProps, 'size'>;
};
export type PlusThinIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const PlusThinIcon: {
  (props: PlusThinIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<PlusThinIconProps, 'size'>;
};
export type RefreshIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const RefreshIcon: {
  (props: RefreshIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<RefreshIconProps, 'size'>;
};
export type RestoreIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const RestoreIcon: {
  (props: RestoreIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<RestoreIconProps, 'size'>;
};
export type RevertIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const RevertIcon: {
  (props: RevertIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<RevertIconProps, 'size'>;
};
export type ReviewIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ReviewIcon: {
  (props: ReviewIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ReviewIconProps, 'size'>;
};
export type RocketIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const RocketIcon: {
  (props: RocketIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<RocketIconProps, 'size'>;
};
export type ScreenGearIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ScreenGearIcon: {
  (props: ScreenGearIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ScreenGearIconProps, 'size'>;
};
export type ScreenUserIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const ScreenUserIcon: {
  (props: ScreenUserIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ScreenUserIconProps, 'size'>;
};
export type SearchIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const SearchIcon: {
  (props: SearchIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<SearchIconProps, 'size'>;
};
export type SortingIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const SortingIcon: {
  (props: SortingIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<SortingIconProps, 'size'>;
};
export type SpeechBubbleIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const SpeechBubbleIcon: {
  (props: SpeechBubbleIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<SpeechBubbleIconProps, 'size'>;
};
export type SpeedometerIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const SpeedometerIcon: {
  (props: SpeedometerIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<SpeedometerIconProps, 'size'>;
};
export type SplitIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const SplitIcon: {
  (props: SplitIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<SplitIconProps, 'size'>;
};
export type StackIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const StackIcon: {
  (props: StackIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<StackIconProps, 'size'>;
};
export type StarIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const StarIcon: {
  (props: StarIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<StarIconProps, 'size'>;
};
export type SubdirectoryArrowIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const SubdirectoryArrowIcon: {
  (props: SubdirectoryArrowIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<SubdirectoryArrowIconProps, 'size'>;
};
export type SupportIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const SupportIcon: {
  (props: SupportIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<SupportIconProps, 'size'>;
};
export type SwitcherIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const SwitcherIcon: {
  (props: SwitcherIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<SwitcherIconProps, 'size'>;
};
export type TableIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const TableIcon: {
  (props: TableIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<TableIconProps, 'size'>;
};
export type TagMultiIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const TagMultiIcon: {
  (props: TagMultiIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<TagMultiIconProps, 'size'>;
};
export type TagStackedIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const TagStackedIcon: {
  (props: TagStackedIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<TagStackedIconProps, 'size'>;
};
export type TagIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const TagIcon: {
  (props: TagIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<TagIconProps, 'size'>;
};
export type TerminalIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const TerminalIcon: {
  (props: TerminalIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<TerminalIconProps, 'size'>;
};
export type TreeStructureIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const TreeStructureIcon: {
  (props: TreeStructureIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<TreeStructureIconProps, 'size'>;
};
export type TruckIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const TruckIcon: {
  (props: TruckIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<TruckIconProps, 'size'>;
};
export type UserFilledIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const UserFilledIcon: {
  (props: UserFilledIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<UserFilledIconProps, 'size'>;
};
export type UserLinearIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const UserLinearIcon: {
  (props: UserLinearIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<UserLinearIconProps, 'size'>;
};
export type VerifiedIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const VerifiedIcon: {
  (props: VerifiedIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<VerifiedIconProps, 'size'>;
};
export type WarningIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const WarningIcon: {
  (props: WarningIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<WarningIconProps, 'size'>;
};
export type WorldIconProps = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
  children?: never;
};
export const WorldIcon: {
  (props: WorldIconProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<WorldIconProps, 'size'>;
};
