import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { sectionMargins } from '../styles';
import { Container, HtmlContent } from './ui';

const StyledChecklist = styled.section`
  ${sectionMargins()};
`;

const Checklist = ({ items }) => (
  <StyledChecklist>
    <Container>
      {items.map(({ title, content, treeChildren }, i) => (
        <>
          <p>{title}</p>
          <HtmlContent content={content} />
          {treeChildren.map(({ title, content, treeChildren }, i) => (
            <>
              <p>{title}</p>
              <HtmlContent content={content} />
              {treeChildren.map(({ title, content, level }, i) => (
                <>
                  <p>{title}</p>
                  <p>{level}</p>
                  <HtmlContent content={content} />
                </>
              ))}
            </>
          ))}
        </>
      ))}
    </Container>
  </StyledChecklist>
);

export default Checklist;
