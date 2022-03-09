import type { ReactNode } from 'react';

export type TTabListProps = {
  /**
   * Any React node passed to TabHeader.
   */
  children: ReactNode;
  /**
   * Sets `aria-orientation` attribute. Defaults to `horizontal`
   */
  orientation?: 'horizontal' | 'vertical';
};

export const TabList = (props: TTabListProps) => {
  return (
    <div role="tablist" aria-orientation={props.orientation}>
      {props.children}
    </div>
  );
};

TabList.displayName = 'TabList';

const defaultProps: Pick<TTabListProps, 'orientation'> = {
  orientation: 'horizontal',
};
TabList.defaultProps = defaultProps;

export default TabList;
