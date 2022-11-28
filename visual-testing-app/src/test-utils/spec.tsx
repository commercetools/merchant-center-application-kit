import { Children, isValidElement, ReactElement, ReactNode } from 'react';
import styled from '@emotion/styled';
import { customProperties } from '@commercetools-uikit/design-system';

const getContainerHeight = (size: SpecProps['size']) => {
  switch (size) {
    case 'l':
      return 550;
    case 'xl':
      return 750;
    default:
      return 400;
  }
};

const SpecContainer = styled.div<Pick<SpecProps, 'size'>>`
  display: flex;
  flex-direction: column;

  /*
    We don't want a change in a component's height resulting in diffs of the
    remaining states below it, so we establish a min-height for each spec to
    prevent that.
  */
  min-height: ${(props) => `${getContainerHeight(props.size)}px`};
`;

const Label = styled.div`
  font-family: ${customProperties.fontFamilyDefault};
  font-weight: bold;
  box-sizing: border-box;
  background-color: #774caf;
  padding: 5px;
  color: ${customProperties.colorSurface};
  font-size: ${customProperties.fontSizeDefault};
`;

const PropList = styled.div`
  background-color: #894ac3;
  padding: 5px;
  box-sizing: border-box;
  font-size: 8pt;
  font-family: monospace;
  color: ${customProperties.colorSurface};
`;

const PropLabel = styled.span`
  font-weight: bold;
  padding: 0 ${customProperties.spacingXs};
  min-width: 140px;
  display: inline-block;
  box-sizing: border-box;
`;

const PropValue = styled.span`
  padding: 0 ${customProperties.spacingXs};
  box-sizing: border-box;
`;

const Box = styled.div<Pick<SpecProps, 'tone' | 'contentAlignment'>>`
  background-color: ${(props) => {
    switch (props.tone) {
      case 'secondary':
        return '#eee';
      case 'inverted':
        return '#111';
      default:
        return '#fff';
    }
  }};
  ${(props) =>
    props.contentAlignment === 'center'
      ? `
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      `
      : ``}
`;

type PillProps = {
  label: string;
  value: ReactNode;
};

const Pill = (props: PillProps) => {
  const value = (() => {
    if (isValidElement(props.value)) return 'React Element';
    if (
      Array.isArray(props.value) &&
      props.value.every((element) => isValidElement(element))
    )
      return '[React Element]';
    try {
      return JSON.stringify(props.value);
    } catch (e) {
      return '-';
    }
  })();
  return (
    <div>
      <PropLabel>{props.label}</PropLabel>
      <PropValue>{value}</PropValue>
    </div>
  );
};
Pill.displayName = 'Pill';

type PropsLoggerProps = {
  children: ReactElement;
};

const PropsLogger = (props: PropsLoggerProps) => {
  const node = Children.only(props.children);
  const propEntries = Object.entries<ReactNode>(node.props);
  return (
    <PropList>
      {propEntries
        .filter(([, value]) => typeof value !== 'function')
        .map(([key, value]) => (
          <Pill key={key} label={key} value={value} />
        ))}
    </PropList>
  );
};
PropsLogger.displayName = 'PropsLogger';

type SpecProps = {
  label: string;
  size: 'm' | 'l' | 'xl' | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 'scale';
  contentAlignment: 'default' | 'center';
  children: ReactElement;
  tone: 'normal' | 'secondary' | 'inverted';
  omitPropsList: boolean;
};
const defaultProps: Pick<
  SpecProps,
  'omitPropsList' | 'size' | 'contentAlignment' | 'tone'
> = {
  omitPropsList: false,
  size: 'm',
  contentAlignment: 'default',
  tone: 'normal',
};

const Spec = (props: SpecProps) => (
  <SpecContainer size={props.size}>
    <Label>{props.label}</Label>
    {!props.omitPropsList && <PropsLogger>{props.children}</PropsLogger>}
    <Box tone={props.tone} contentAlignment={props.contentAlignment}>
      {props.children}
    </Box>
  </SpecContainer>
);
Spec.displayName = 'Spec';
Spec.defaultProps = defaultProps;

export default Spec;
