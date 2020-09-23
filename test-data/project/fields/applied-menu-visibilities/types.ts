export type TMenuVisibilities = { [key: string]: boolean };

export type TAppliedMenuVisibilitiesGraphql = {
  __typename: 'AppliedMenuVisibilities';
  name: string;
  value: boolean;
}[];
