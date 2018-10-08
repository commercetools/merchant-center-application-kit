import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import ModalContainer from '../modal-container';
import ButtonClose from '../button-close';
import styles from './info-dialog.mod.css';

class InfoDialog extends React.PureComponent {
  static displayName = 'InfoDialog';

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
    overlayClassName: PropTypes.string,
  };

  render() {
    return (
      <ModalContainer
        isOpen={this.props.isOpen}
        closeTimeoutMS={150}
        onRequestClose={this.props.onClose}
        overlayClassName={classnames(
          styles.overlay,
          this.props.overlayClassName
        )}
        className={styles.content}
        contentLabel="info-dialog"
      >
        <div className={styles['close-button']}>
          <ButtonClose onClick={this.props.onClose} />
        </div>
        {this.props.children}
      </ModalContainer>
    );
  }
}

class InfoDialogTitle extends React.PureComponent {
  static displayName = 'InfoDialog.Title';
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  render() {
    return (
      <h1 className={styles['info-dialog-title']}>{this.props.children}</h1>
    );
  }
}

InfoDialog.Title = InfoDialogTitle;

class InfoDialogBody extends React.PureComponent {
  static displayName = 'InfoDialog.Body';
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  render() {
    return (
      <div className={styles['info-dialog-paragraph']}>
        {this.props.children}
      </div>
    );
  }
}

InfoDialog.Body = InfoDialogBody;

export default InfoDialog;
