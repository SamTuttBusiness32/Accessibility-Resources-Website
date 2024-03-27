import React from 'react';
import { graphql } from 'gatsby';
import Content from './Content';
import Ctas from './Ctas';
import ImageContent from './ImageContent';
import Statistics from './Statistics';
import AccessibilityFunctionsGuide from './AccessibilityFunctionsGuide';

const ModularBlocks = ({ items }) =>
  items.map(item => (
    <React.Fragment key={item.id}>
      {item.model.apiKey === 'accessibility_functions_guide_modular_block' && (
        <AccessibilityFunctionsGuide heading={item.heading} text={item.text} />
      )}
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
      {item.model.apiKey === 'statistics_modular_block' && (
        <Statistics
          heading={item.heading}
          items={item.statistics}
          text={item.statisticsText}
          invert={item.invert}
        />
      )}
    </React.Fragment>
  ));

export default ModularBlocks;

export const ModularBlockFragments = graphql`
  fragment AccessibilityFunctionsGuideModularBlockFragment on DatoCmsAccessibilityFunctionsGuideModularBlock {
    id
    model {
      apiKey
    }
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
  }
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
        width: 710
        height: 800
        imgixParams: { fit: "crop", w: "710", h: "800" }
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
        layout: FULL_WIDTH
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

  fragment StatisticsModularBlockFragment on DatoCmsStatisticsModularBlock {
    id
    model {
      apiKey
    }
    heading
    statistics {
      statistic
      caption
    }
    statisticsText: text
    invert
  }
`;
