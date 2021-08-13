import React, { useState } from 'react';
import Container from 'components/Container';
import InlineLink from 'components/InlineLink';
import { H1 } from 'components/H';
import Button from 'components/Button';

const Index = () => {
  const [counter, setCounter] = useState(0);

  return (
    <main>
      <Container>
        <H1>next.js starter</H1>
        <InlineLink href="https://elegantseagulls.com/posts">
          All Posts
        </InlineLink>
        <ul>
          <li>
            <InlineLink href="/posts/2">post #2</InlineLink>
          </li>
          <li>
            <InlineLink href="/posts/10">post #10</InlineLink>
          </li>
        </ul>
        <Button
          onClick={() => {
            setCounter(counter + 1);
          }}
        >
          increase &rarr;
        </Button>{' '}
        {counter}
      </Container>
    </main>
  );
};

export default Index;
