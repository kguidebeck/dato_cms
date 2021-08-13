import React from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import RatioImg from './RatioImg';

/**
 * Passes down picture props without src so that CSS will be updated
 * but image won't be loaded until inView is true
 *
 * @param {array} picture
 */
const pictureWithoutSrc = (picture) => {
  if (!picture) return undefined;

  return picture.map((pic) => ({
    media: pic.media,
    width: pic.width,
    height: pic.height,
  }));
};

const LazyImg = ({
  src,
  srcSet,
  picture,
  width,
  height,
  className,
  bottomOffset,
  ...rest
}) => {
  const [imgRef, inView] = useInView({
    triggerOnce: true,
    rootMargin: bottomOffset || '500px',
  });

  return (
    <RatioImg
      width={width}
      height={height}
      className={className}
      src={inView ? src : undefined}
      srcSet={inView ? srcSet : undefined}
      picture={inView ? picture : pictureWithoutSrc(picture)}
      innerRef={imgRef}
      {...rest}
    />
  );
};

LazyImg.propTypes = {
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  picture: PropTypes.arrayOf(PropTypes.object),
  width: PropTypes.number,
  height: PropTypes.number,
  imageStyles: PropTypes.string,
  bottomOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default LazyImg;
