import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import { WorldIcon } from '@commercetools-local/ui-kit/icons';
import styles from './locale-switcher.mod.css';

export default class LocaleSwitcher extends React.PureComponent {
  static displayName = 'LocaleSwitcher';

  static propTypes = {
    projectDataLocale: PropTypes.string.isRequired,
    setProjectDataLocale: PropTypes.func.isRequired,
    languages: PropTypes.array.isRequired,
  };

  handleSelection = ({ key: language }) => {
    this.props.setProjectDataLocale(language);
  };

  renderLabel = () => (
    <span>
      <div className={styles.icon}>
        <WorldIcon />
      </div>
      <span className={styles.label}>{`${this.props.projectDataLocale}`}</span>
      <span className={styles['language-counter']}>
        {this.props.languages.length}
      </span>
    </span>
  );

  render() {
    if (this.props.languages.length <= 1) return null;

    return (
      <div className={styles.container} data-track-component="LocaleSwitch">
        <Select
          {...{
            valueRenderer: this.renderLabel,
            labelKey: 'name',
            valueKey: 'key',
            className: styles['react-select-container'],
            value: this.props.projectDataLocale,
            name: 'locale-switcher',
            onChange: this.handleSelection,
            autoBlur: true,
            options: this.props.languages.map(lang => ({
              name: lang,
              key: lang,
            })),
            clearable: false,
            backspaceRemoves: false,
            searchable: false,
          }}
        />
      </div>
    );
  }
}
