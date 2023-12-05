import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout';
import Banner from '../components/Banner';
import ModularBlocks from '../components/ModularBlocks';

const NotFoundPage = () => {
  const {
    datoCmsNotFound: { title, modularBlocks },
  } = useStaticQuery(graphql`
    query NotFoundPageQuery {
      datoCmsNotFound {
        title
        modularBlocks {
          ...ContentModularBlockFragment
        }
      }
    }
  `);

  return (
    <Layout noIndex={true}>
      <main>
        <Banner heading={title} />
        <ModularBlocks items={modularBlocks} />
      </main>
    </Layout>
  );
};

export default NotFoundPage;
