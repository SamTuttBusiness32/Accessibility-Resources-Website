import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  brandColours,
  buttonStyles,
  inputStyles,
  labelStyles,
  maxBreakpointQuery,
  minBreakpointQuery,
  sectionMargins,
} from '../styles';
import { Button, Container, HtmlContent } from './ui';

const StyledLoginForm = styled.section`
  ${sectionMargins('30px', '70px')}
`;

const StyledInner = styled.div`
  display: grid;
  gap: 30px;

  ${minBreakpointQuery.small`
    gap: 40px;
  `}

  ${minBreakpointQuery.large`
    gap: 50px;
  `}

  ${minBreakpointQuery.xxlarge`
    gap: 60px;
  `}
`;

const StyledForm = styled.form``;

const StyledFieldset = styled.fieldset`
  border: none;
  display: grid;
  gap: 20px;
  margin: 0;
  padding: 0;
`;

const StyledLabel = styled.label`
  ${labelStyles()}
`;

const StyledInput = styled.input`
  ${inputStyles()}
  border: solid 1px ${brandColours.primary};
`;

const StyledButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-direction: column;
  align-items: center;

  ${minBreakpointQuery.small`
    gap: 15px;
  `}

  ${minBreakpointQuery.small`
    gap: 20px;
  `}
`;

const StyledButton = styled(Button)`
  ${buttonStyles()}
  width: 100%;
`;

const LoginForm = () => {
  return (
    <StyledLoginForm>
      <Container extraNarrow={true}>
        <StyledInner>
          <StyledForm>
            <StyledFieldset>
              <StyledLabel>
                Username*
                <StyledInput
                  type="text"
                  name="userName"
                  id="userName"
                  required
                />
              </StyledLabel>
              <StyledLabel>
                Password*
                <StyledInput
                  type="password"
                  name="password"
                  id="password"
                  required
                />
              </StyledLabel>
            </StyledFieldset>
            <StyledButtons>
              <StyledButton>Sign In</StyledButton>
              <a>Create account</a>
            </StyledButtons>
          </StyledForm>
        </StyledInner>
      </Container>
    </StyledLoginForm>
  );
};

export default LoginForm;
