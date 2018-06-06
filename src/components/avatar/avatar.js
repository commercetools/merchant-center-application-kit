import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isRetina from 'is-retina';
import md5 from 'md5';
import { compose } from 'recompose';
import styles from './avatar.mod.css';

const getFirstChar = str =>
  typeof str === 'string'
    ? str
        .trim()
        .slice(0, 1)
        .toUpperCase()
    : '';

export const getInitialsFromName = ({ firstName = '', lastName = '' }) =>
  `${getFirstChar(firstName)}${getFirstChar(lastName)}`;

const createMd5HashForEmail = email => md5(email.trim().toLowerCase());

const createGravatarImgUrl = size => md5Hash =>
  `https://www.gravatar.com/avatar/${md5Hash}?s=${
    isRetina() ? size * 2 : size
  }&d=blank`;

const getSizeForPreset = size => (size === 'big' ? 200 : 26);

export const getAvatarImageUrl = sizePreset =>
  compose(
    createGravatarImgUrl(getSizeForPreset(sizePreset)),
    createMd5HashForEmail
  );

const GravatarImg = props => (
  <div
    className={classnames(styles['gravatar-img'], {
      [styles['gravatar-img-big']]: props.size === 'big',
    })}
    style={{
      backgroundImage: `url(${getAvatarImageUrl(props.size)(props.email)})`,
    }}
  />
);
GravatarImg.displayName = 'GravatarImg';
GravatarImg.propTypes = {
  email: PropTypes.string,
  size: PropTypes.string,
};
GravatarImg.defaultProps = {
  size: 'small',
};

const Initials = props => <div className={styles.initials}>{props.text}</div>;

Initials.displayName = 'Initials';
Initials.propTypes = {
  text: PropTypes.string,
};
Initials.defaultProps = { text: '' };

const Avatar = props => (
  <div className={classnames(styles.avatar, styles[`avatar-${props.size}`])}>
    <GravatarImg email={props.email} size={props.size} />
    <Initials
      text={getInitialsFromName({
        firstName: props.firstName,
        lastName: props.lastName,
      })}
    />
  </div>
);
Avatar.displayName = 'Avatar';
Avatar.defaultProps = {
  size: 'small',
};

Avatar.propTypes = {
  firstName: PropTypes.any.isRequired,
  lastName: PropTypes.any.isRequired,
  email: PropTypes.any.isRequired,
  size: PropTypes.oneOf(['big', 'small']).isRequired,
};

export default Avatar;
