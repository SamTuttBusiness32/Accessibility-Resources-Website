import React from 'react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import styled, { css } from 'styled-components';
import { buildUrl } from '../../utils';

const commonLinkStyles = () => {
  return css`
    display: inline-block;
  `;
};

const StyledLinkInternal = styled(GatsbyLink)`
  ${commonLinkStyles()};
`;

const StyledLinkExternal = styled.a`
  ${commonLinkStyles()};
`;

export const Link = ({ to, children, ...props }) => {
  const isExternal = to.url || to.emailAddress;
  const LinkComponent = isExternal ? StyledLinkExternal : StyledLinkInternal;
  const slug = typeof to === 'string' ? to : to && to.slug;

  return (
    <LinkComponent
      {...(isExternal
        ? {
            href: to.url || `mailto:${to.emailAddress}`,
            target: '_blank',
            rel: 'noopener',
          }
        : {
            to: slug === '/' ? slug : buildUrl(slug, to),
          })}
      {...props}
    >
      {children}
    </LinkComponent>
  );
};

export const LinkFragment = graphql`
  fragment LinkFragment on Node {
    ... on DatoCmsHome {
      slug
    }
    ... on DatoCmsPage {
      slug
      treeParent {
        slug
        treeParent {
          slug
          treeParent {
            slug
          }
        }
      }
    }
    ... on DatoCmsExternalUrl {
      url
    }
    ... on DatoCmsEmailAddress {
      emailAddress
    }
  }
`;
