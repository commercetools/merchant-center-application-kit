declare module '@commercetools-frontend/ui-kit' {
  import * as React from 'react';
  import { MessageDescriptor } from 'react-intl';

  export const version: string;

  // Design tokens - customProperties
  export {
    default as customProperties,
  } from '@commercetools-frontend/ui-kit/materials/custom-properties';

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
    defaultProps: Pick<
      SecondaryButtonProps,
      'type' | 'theme' | 'isToggleButton'
    >;
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
    defaultProps: Pick<
      SecondaryIconButtonProps,
      'color' | 'type' | 'isDisabled'
    >;
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
  export type IconProps = {
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
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const AngleLeftIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const AngleRightIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const AngleThinLeftIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const AngleThinRightIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const AngleUpIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ArrowDownIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ArrowLeftIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ArrowLongDownIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ArrowRightIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ArrowTriangleDownIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ArrowTriangleUpIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ArrowUpIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ArrowsIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const BackIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const BidirectionalArrowIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const BinFilledIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const BinLinearIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const BoxIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const BrainIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const CalendarIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const CameraIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const CaretDownIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const CaretUpIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const CartIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ChainBrokenIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ChainIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const CheckActiveIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const CheckBoldIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const CheckInactiveIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const CheckThinIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const CircleIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ClipboardIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ClockIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const CloseBoldIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const CloseIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const CodeViewIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const CoinsIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ColumnsIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ConnectedSquareIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ConnectedTriangleIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const CopyIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const CubeIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const CubesIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const DotIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const DownloadIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const DragDropIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const DragIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const EditIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ErrorIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ExpandIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ExportIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ExternalLinkIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const EyeCrossedIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const EyeIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const FilterIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const FlagFilledIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const FlagLinearIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const FlameIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const FractionDigitsIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const GearIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const GraduationCapIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const GraphIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const GridIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const HeartIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ImportIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const InfoIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const InformationIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ListIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const LogoutIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const MailIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const MinimizeIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const NestedViewIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const PageGearIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const PagesIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const PaperBillInvertedIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const PaperclipIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const PinFilledIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const PinGearIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const PinLinearIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const PluginIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const PlusBoldIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const PlusThinIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const RefreshIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const RestoreIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const RevertIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ReviewIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const RocketIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ScreenGearIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const ScreenUserIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const SearchIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const SortingIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const SpeechBubbleIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const SpeedometerIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const SplitIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const StackIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const StarIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const SubdirectoryArrowIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const SupportIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const SwitcherIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const TableIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const TagMultiIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const TagStackedIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const TagIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const TerminalIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const TreeStructureIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const TruckIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const UserFilledIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const UserLinearIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const VerifiedIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const WarningIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
  export const WorldIcon: {
    (props: IconProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<IconProps, 'size'>;
  };
}

// TODO: remove once this is available in uikit
declare module '@commercetools-frontend/ui-kit/materials/custom-properties' {
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
  const customProperties: CustomProperties;
  export default customProperties;
}
