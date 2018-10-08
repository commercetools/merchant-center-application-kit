import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import { WorldIcon } from '@commercetools-frontend/ui-kit';
import styles from './locale-switcher.mod.css';

export default class LocaleSwitcher extends React.PureComponent {
  static displayName = 'LocaleSwitcher';

  static propTypes = {
    projectDataLocale: PropTypes.string.isRequired,
    setProjectDataLocale: PropTypes.func.isRequired,
    availableLocales: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  handleSelection = ({ key: language }) => {
    this.props.setProjectDataLocale(language);
  };

  renderLabel = () => (
    <span>
      <div className={styles.icon}>
        <WorldIcon size="big" />
      </div>
      <span className={styles.label}>{`${this.props.projectDataLocale}`}</span>
      <span className={styles['language-counter']}>
        {this.props.availableLocales.length}
      </span>
    </span>
  );

  render() {
    return (
      <div className={styles.container} data-track-component="LocaleSwitch">
        <Select
          valueRenderer={this.renderLabel}
          labelKey="name"
          valueKey="key"
          className={styles['react-select-container']}
          value={this.props.projectDataLocale}
          name="locale-switcher"
          onChange={this.handleSelection}
          autoBlur={true}
          options={this.props.availableLocales.map(locale => ({
            name: locale,
            key: locale,
          }))}
          clearable={false}
          backspaceRemoves={false}
          searchable={false}
        />
      </div>
    );
  }
}
