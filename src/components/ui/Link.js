import React from 'react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import styled, { css } from 'styled-components';
import { buildUrl } from '../../utils';

const commonLinkStyles = () => {
  return css`
    display: flex;
    gap: 8px;
    align-items: center;
  `;
};

const StyledLinkInternal = styled(GatsbyLink)`
  ${commonLinkStyles()};
`;

const StyledLinkExternal = styled.a`
  ${commonLinkStyles()};
`;

const StyledIcon = styled.img`
  height: 20px;
`;

export const Link = ({ to, icon, children, ...props }) => {
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
      {icon && (
        <StyledIcon
          src={icon.url}
          alt={`${icon.alt} Page Link`}
          loading="lazy"
        />
      )}
    </LinkComponent>
  );
};

export const LinkFragment = graphql`
  fragment LinkFragment on Node {
    ... on DatoCmsHome {
      slug
      icon {
        url
        alt
      }
    }
    ... on DatoCmsChecklistArchive {
      slug
      icon {
        url
        alt
      }
    }
    ... on DatoCmsGuideArchive {
      slug
      icon {
        url
        alt
      }
    }
    ... on DatoCmsGuide {
      slug
      internal {
        type
      }
    }
    ... on DatoCmsLogin {
      slug
      icon {
        url
        alt
      }
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
      icon {
        url
        alt
      }
    }
    ... on DatoCmsCategory {
      slug
    }
    ... on DatoCmsExternalUrl {
      url
    }
    ... on DatoCmsEmailAddress {
      emailAddress
    }
  }
`;
