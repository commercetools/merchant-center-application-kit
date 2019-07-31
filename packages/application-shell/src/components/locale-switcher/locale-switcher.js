import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import {
  SelectInput,
  WorldIcon,
  customProperties,
} from '@commercetools-frontend/ui-kit';

export const SingleValue = props => (
  <div
    css={css`
      flex: 1;
      align-items: center;
      display: flex;
    `}
  >
    <WorldIcon size="big" />
    <span
      css={css`
        margin-left: 2px;
        flex: 1;
        color: ${customProperties.colorAccent};
      `}
    >
      {props.children}
    </span>
    <span
      css={css`
        width: 22px;
        height: 22px;
        border-radius: 100%;
        background: ${customProperties.colorAccent40};
        color: ${customProperties.colorSurface};
        font-size: 0.9rem;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      {props.localeCount}
    </span>
  </div>
);

SingleValue.propTypes = {
  children: PropTypes.node.isRequired,
  localeCount: PropTypes.number.isRequired,
};

SingleValue.displayName = 'SingleValue';

export default class LocaleSwitcher extends React.PureComponent {
  static displayName = 'LocaleSwitcher';

  static propTypes = {
    projectDataLocale: PropTypes.string.isRequired,
    setProjectDataLocale: PropTypes.func.isRequired,
    availableLocales: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  handleSelection = event =>
    this.props.setProjectDataLocale(event.target.value);

  render() {
    return (
      <div
        css={css`
          position: relative;
          width: ${customProperties.constraintS};
        `}
        data-track-component="LocaleSwitch"
      >
        <SelectInput
          value={this.props.projectDataLocale}
          name="locale-switcher"
          onChange={this.handleSelection}
          options={this.props.availableLocales.map(locale => ({
            label: locale,
            value: locale,
          }))}
          components={{
            SingleValue: props => (
              <SingleValue
                {...props}
                localeCount={this.props.availableLocales.length}
              />
            ),
          }}
          isClearable={false}
          backspaceRemovesValue={false}
          isSearchable={false}
        />
      </div>
    );
  }
}
