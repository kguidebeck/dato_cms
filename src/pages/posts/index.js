import React from 'react';
import Container from 'components/Container';
import { H1 } from 'components/H';
import InlineLink from 'components/InlineLink';

const PostList = () => (
  <main>
    <Container>
      <H1>Post List</H1>

      <ul>
        <li>
          <InlineLink href="/posts/1">Post 1</InlineLink>
        </li>
      </ul>

    </Container>
  </main>
);

export default PostList;
