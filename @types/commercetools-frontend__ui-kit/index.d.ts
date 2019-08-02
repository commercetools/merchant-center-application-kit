declare module '@commercetools-frontend/ui-kit' {
  type CustomProperties = { [key: string]: string };

  export const customProperties: CustomProperties;

  export const CloseBoldIcon: React.ElementType;
  export const ErrorIcon: React.ElementType;
  export const WarningIcon: React.ElementType;
  export const InfoIcon: React.ElementType;
  export const CheckBoldIcon: React.ElementType;
  export const IconButton: React.ElementType;
  export const Spacings: {
    Inline: React.ElementType;
    Stack: React.ElementType;
  };
}
