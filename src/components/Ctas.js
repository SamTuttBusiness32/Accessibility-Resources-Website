import React from 'react';
import styled from 'styled-components';
import { minBreakpointQuery, sectionMargins } from '../styles';
import { Container, Heading } from './ui';
import CtaCard from './CtaCard';

const StyledCtas = styled.section`
  ${sectionMargins()};
`;

const StyledHeading = styled(Heading)`
  text-align: center;
`;

const StyledItems = styled.div`
  --columns: 1;
  --gap: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--gap);
  margin-top: 30px;

  ${minBreakpointQuery.small`
    margin-top: 40px;
    --columns: 3;
  `}

  ${minBreakpointQuery.medium`
    margin-top: 50px;
  `}
`;

const StyledItem = styled(CtaCard)`
  width: calc((100% - (var(--columns) - 1) * var(--gap)) / var(--columns));
`;

const Ctas = ({ heading, items }) => (
  <StyledCtas>
    <Container>
      <StyledHeading>{heading}</StyledHeading>
      <StyledItems>
        {items.map((item, id) => (
          <StyledItem key={id} {...item} />
        ))}
      </StyledItems>
    </Container>
  </StyledCtas>
);

export default Ctas;
