import * as PropTypes from 'prop-types';

// https://dev.to/busypeoples/notes-on-typescript-inferring-react-proptypes-1g88
export type InferPropTypes<
  PropTypes,
  DefaultProps = {},
  Props = PropTypes.InferProps<PropTypes>
> = {
  [Key in keyof Props]: Key extends keyof DefaultProps
    ? Props[Key] | DefaultProps[Key]
    : Props[Key];
};
