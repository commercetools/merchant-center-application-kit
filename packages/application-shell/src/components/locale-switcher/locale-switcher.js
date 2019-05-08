import PropTypes from 'prop-types';
import React from 'react';
import { SelectInput, WorldIcon } from '@commercetools-frontend/ui-kit';
import styles from './locale-switcher.mod.css';

const SingleValue = props => (
  <div className={styles.singleValueContainer}>
    <WorldIcon size="big" />
    <span className={styles.label}>{props.children}</span>
    <span className={styles['language-counter']}>{props.localeCount}</span>
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
      <div className={styles.container} data-track-component="LocaleSwitch">
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
