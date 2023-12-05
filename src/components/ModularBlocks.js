import React from 'react';
import { graphql } from 'gatsby';
import Content from './Content';

const ModularBlocks = ({ items }) =>
  items.map(item => (
    <React.Fragment key={item.id}>
      {item.model.apiKey === 'content_modular_block' && (
        <Content
          content={item.content}
          twoColumns={item.twoColumns}
          highlight={item.highlight}
          contain={item.contain}
        />
      )}
    </React.Fragment>
  ));

export default ModularBlocks;

export const ModularBlockFragments = graphql`
  fragment ContentModularBlockFragment on DatoCmsContentModularBlock {
    id
    model {
      apiKey
    }
    content {
      value
      links {
        id: originalId
        text
        pageUrl {
          ...LinkFragment
        }
      }
    }
    twoColumns
    highlight
    contain
  }
`;
