import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UnstyledButton from './UnstyledButton';
import InlineLink from './InlineLink';

const StyledButton = styled(InlineLink)`
  display: inline-block;
  padding: 0 30px;
  background-color: var(--black);
  color: var(--white);
  font-size: 1rem;
  line-height: 2.5rem;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
`;

const Button = ({ children, href, ...props }) =>
  href ? (
    <StyledButton href={href} {...props}>
      {children}
    </StyledButton>
  ) : (
    <StyledButton as={UnstyledButton} {...props}>
      {children}
    </StyledButton>
  );

Button.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
};

export default Button;
