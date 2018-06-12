import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isRetina from 'is-retina';
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

/**
 * `s` - defines the size. We want a bigger one if the user is on a retina-display
 * `d` - defines the default if the user is not known to Gravatar. It returns a blank image,
 *        which let the initials underneath shine through
 *
 * @see: https://de.gravatar.com/site/implement/images/
 */
const createGravatarImgUrl = size => md5Hash =>
  `https://www.gravatar.com/avatar/${md5Hash}?s=${
    isRetina() ? size * 2 : size
  }&d=blank`;

const getSizeForPreset = size => (size === 'l' ? 200 : 26);

export const getAvatarImageUrl = sizePreset =>
  createGravatarImgUrl(getSizeForPreset(sizePreset));

export const GravatarImg = props => (
  <div
    className={classnames(styles['gravatar-img'], {
      [styles['gravatar-img-big']]: props.size === 'l',
    })}
    style={{
      backgroundImage: `url(${getAvatarImageUrl(props.size)(props.hash)})`,
    }}
  />
);

GravatarImg.displayName = 'GravatarImg';
GravatarImg.propTypes = {
  hash: PropTypes.string,
  size: PropTypes.oneOf(['l', 's']),
};
GravatarImg.defaultProps = {
  size: 's',
};

const Initials = props => (
  <div className={styles.initials}>
    {getInitialsFromName({
      firstName: props.firstName,
      lastName: props.lastName,
    })}
  </div>
);

Initials.displayName = 'Initials';
Initials.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};
Initials.defaultProps = { firstName: '', lastName: '' };

const Avatar = props => (
  <div
    className={classnames(styles.avatar, styles[`avatar-${props.size}`], {
      [styles['avatar-hover']]: props.isHighlighted,
    })}
  >
    <GravatarImg hash={props.gravatarHash} size={props.size} />
    <Initials firstName={props.firstName} lastName={props.lastName} />
  </div>
);
Avatar.displayName = 'Avatar';
Avatar.defaultProps = {
  firstName: '',
  lastName: '',
  isHighlighted: false,
  size: 's',
};

Avatar.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  gravatarHash: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool,
  size: PropTypes.oneOf(['l', 's']).isRequired,
};

export default Avatar;
