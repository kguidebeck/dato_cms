import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

if (process.env.NODE_ENV !== 'production' && !process.env.SITE_URL) {
  // eslint-disable-next-line no-console
  console.warn('InlineLink.js: No SITE_URL set in .env');
}

const InlineLink = ({ href, target = '_blank', children, ...rest }) => {
  const siteUrl = new RegExp(`https?://(www.)?${process.env.SITE_URL}/?`, 'g');

  if (!href) return null;
  const formatInternal = href.replace(siteUrl, '/');

  return formatInternal.match(/^(https?:)?\/\/|mailto:/) ? (
    <a
      href={formatInternal}
      target={target}
      rel={target === '_blank' ? 'noreferrer noopener' : undefined}
      {...rest}
    >
      {children}
    </a>
  ) : (
    <Link href={formatInternal}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

InlineLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
  target: PropTypes.string,
};

export default InlineLink;
