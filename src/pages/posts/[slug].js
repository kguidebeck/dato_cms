import React from 'react';
import { Helmet } from 'react-helmet';
import Container from 'components/Container';
import { H1 } from 'components/H';

const SinglePost = props => (
  <main>
    <Helmet
      title={`Post ${props.postId}`}
      meta={[{ property: 'og:title', content: `Post ${props.postId}` }]}
    />
    <Container>
      <div>
        <H1>My blog post #{props.postId}</H1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </Container>
  </main>
);

export const getStaticProps = async ({ params }) => ({
  props: { postId: params.slug },
});

// https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const getStaticPaths = async () => ({
  paths: [
    { params: { slug: '1' } },
    { params: { slug: '2' } },
    { params: { slug: '10' } },
  ],
  fallback: false,
});

export default SinglePost;
