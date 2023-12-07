import React from 'react';
import { graphql } from 'gatsby';
import Content from './Content';
import Ctas from './Ctas';
import ImageContent from './ImageContent';

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
      {item.model.apiKey === 'ctas_modular_block' && (
        <Ctas heading={item.heading} items={item.ctas} />
      )}
      {item.model.apiKey === 'image_content_modular_block_v1' && (
        <ImageContent
          image={item.image}
          heading={item.heading}
          text={item.text}
          link={item.link}
          flip={item.flip}
          version={1}
        />
      )}
      {item.model.apiKey === 'image_content_modular_block_v2' && (
        <ImageContent
          image={item.image}
          heading={item.heading}
          text={item.text}
          link={item.link}
          flip={item.flip}
          version={2}
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

  fragment CtasModularBlockFragment on DatoCmsCtasModularBlock {
    id
    model {
      apiKey
    }
    heading
    ctas {
      heading
      text {
        value
        links {
          id: originalId
          text
          pageUrl {
            ...LinkFragment
          }
        }
      }
      image {
        url
        alt
      }
      link {
        text
        pageUrl {
          ...LinkFragment
        }
      }
      rank
    }
  }

  fragment ImageContentModularBlockV1Fragment on DatoCmsImageContentModularBlockV1 {
    id
    model {
      apiKey
    }
    image {
      gatsbyImageData(
        width: 500
        height: 850
        layout: FULL_WIDTH
        imgixParams: { fit: "crop", w: "710", h: "770" }
      )
      alt
    }
    heading
    text {
      value
    }
    link {
      text
      pageUrl {
        ...LinkFragment
      }
    }
    flip
  }

  fragment ImageContentModularBlockV2Fragment on DatoCmsImageContentModularBlockV2 {
    id
    model {
      apiKey
    }
    image {
      gatsbyImageData(
        width: 1200
        height: 900

        imgixParams: { fit: "crop", w: "1200", h: "900" }
      )
      alt
    }
    heading
    text {
      value
    }
    link {
      text
      pageUrl {
        ...LinkFragment
      }
    }
    flip
  }
`;
