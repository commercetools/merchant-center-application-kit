import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { customProperties } from '@commercetools-frontend/ui-kit';

const getContainerHeight = size => {
  console.log('size', size);
  switch (size) {
    case 'l':
      return 550;
    case 'xl':
      return 750;
    default:
      return 400;
  }
};

const SpecContainer = styled.div`
  display: flex;
  flex-direction: column;
  /*
    We don't want a change in a component's height resulting in diffs of the
    remaining states below it, so we establish a min-height for each spec to
    prevent that.
  */
  min-height: ${props => `${getContainerHeight(props.size)}px`};
`;

const Label = styled.div`
  font-family: ${customProperties.fontFamilyDefault};
  font-weight: bold;
  box-sizing: border-box;
  background-color: #774caf;
  padding: 5px;
  color: ${customProperties.colorWhite};
  font-size: ${customProperties.fontSizeDefault};
`;

const PropList = styled.div`
  font-family: ${customProperties.fontFamilyDefault};
  background-color: #894ac3;
  padding: 5px;
  box-sizing: border-box;
  font-size: 8pt;
  font-family: monospace;
  color: ${customProperties.colorWhite};
`;

const PropLabel = styled.span`
  font-weight: bold;
  padding: 0 ${customProperties.spacing4};
  min-width: 140px;
  display: inline-block;
  box-sizing: border-box;
`;

const PropValue = styled.span`
  padding: 0 ${customProperties.spacing4};
  box-sizing: border-box;
`;

const Box = styled.div`
  background-color: ${props => {
    switch (props.tone) {
      case 'secondary':
        return '#eee';
      case 'inverted':
        return '#111';
      default:
        return '#fff';
    }
  }};
  ${props =>
    props.alignment === 'center'
      ? `
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      `
      : ``}
`;

const Pill = props => {
  const value = (() => {
    if (React.isValidElement(props.value)) return 'React Element';
    if (
      Array.isArray(props.value) &&
      props.value.every(element => React.isValidElement(element))
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
Pill.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

const Props = props => {
  const node = React.Children.only(props.children);
  const propEntries = Object.entries(node.props);
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

Props.displayName = 'Props';
Props.propTypes = {
  children: PropTypes.node.isRequired,
};

const Spec = props => (
  <SpecContainer size={props.size}>
    <Label>{props.label}</Label>
    {!props.omitPropsList && <Props>{props.children}</Props>}
    <Box tone={props.tone} alignment={props.contentAlignment}>
      {props.children}
    </Box>
  </SpecContainer>
);

Spec.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['m', 'l', 'xl']),
  contentAlignment: PropTypes.oneOf(['default', 'center']),
  children: PropTypes.node,
  tone: PropTypes.oneOf(['normal', 'secondary', 'inverted']),
  omitPropsList: PropTypes.bool,
};

Spec.defaultProps = {
  omitPropsList: false,
  size: 'm',
  contentAlignment: 'default',
  tone: 'normal',
};

Spec.displayName = 'Spec';

export default Spec;
