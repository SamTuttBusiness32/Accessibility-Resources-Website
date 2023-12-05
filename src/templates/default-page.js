import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Banner from '../components/Banner';
import ModularBlocks from '../components/ModularBlocks';

const DefaultPageTemplate = ({
  data: {
    datoCmsPage: { seoMetaTags, noIndex, title, modularBlocks },
  },
}) => (
  <Layout seo={seoMetaTags} noIndex={noIndex}>
    <main>
      <ModularBlocks items={modularBlocks} />
    </main>
  </Layout>
);

export const DefaultPageTemplateQuery = graphql`
  query DefaultPageTemplateQuery($id: String!) {
    datoCmsPage(id: { eq: $id }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      noIndex
      title
      modularBlocks {
        ...ContentModularBlockFragment
      }
    }
  }
`;

export default DefaultPageTemplate;
