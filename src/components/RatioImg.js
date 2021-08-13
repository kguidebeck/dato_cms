import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { cover, size } from 'polished';
import makePercent from 'util/makePercent';

/**
 * Generates media queries for each picture size
 * @param {array} pictures
 */
const makeMediaQueries = (pictures) => {
  if (!pictures) return;

  return pictures.map((picture) => {
    if (!picture.media || !picture.width || !picture.height) return '';

    return `
      @media${picture.media} {
        padding-bottom: ${makePercent(picture.height, picture.width)}
      }
    `;
  });
};

const Picture = ({ pictures, children }) =>
  pictures ? (
    <picture>
      {pictures.map((pic, i) => (
        <source
          srcSet={pic.srcSet}
          media={pic.media}
          type={pic.type}
          // eslint-disable-next-line react/no-array-index-key
          key={i}
        />
      ))}
      {children}
    </picture>
  ) : (
    children
  );

Picture.propTypes = {
  pictures: PropTypes.array,
  children: PropTypes.node,
};

const Img = styled.img`
  ${(props) =>
    props.styles &&
    css`
      ${props.styles}
    `}
`;

const Wrapper = styled.div`
  position: relative;

  &::after,
  ${Img} {
    display: block;
  }

  ${(props) =>
    props.$width &&
    props.$height &&
    css`
      &::after {
        content: '';
        width: 100%;
        padding-bottom: var(--aspect-ratio);

        ${props.picture &&
        css`
          ${makeMediaQueries(props.picture)}
        `}
      }

      ${Img} {
        ${size('100%')}
        ${cover()}
      object-fit: cover;
      }
    `}
`;

const RatioImg = ({
  src,
  srcSet,
  picture,
  width,
  height,
  className,
  innerRef,
  imageStyles,
  style,
  as,
  alt,
  ...rest
}) => (
  <Wrapper
    $width={width}
    $height={height}
    className={className}
    picture={picture}
    ref={innerRef}
    as={as}
    style={{
      ...(width && height
        ? { '--aspect-ratio': makePercent(height, width) }
        : {}),
      ...style,
    }}
  >
    <Picture pictures={picture}>
      <Img src={src} srcSet={srcSet} styles={imageStyles} alt={alt} {...rest} />
    </Picture>
  </Wrapper>
);

RatioImg.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string,
  srcSet: PropTypes.string,
  style: PropTypes.object,
  picture: PropTypes.arrayOf(PropTypes.object),
  width: PropTypes.number,
  height: PropTypes.number,
  imageStyles: PropTypes.string,
};

export default RatioImg;
