import React, { useState } from 'react';
import styled from 'styled-components';
import {
  brandColours,
  buttonStyles,
  inputStyles,
  labelStyles,
  minBreakpointQuery,
  sectionMargins,
} from '../styles';
import { Button, Container } from './ui';
import { navigate } from 'gatsby';

const StyledLoginForm = styled.section`
  ${sectionMargins()}
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

const LoginForm = ({ isLogin }) => {
  const [errorMessage, setErrorMessage] = useState();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();
    if (isLogin) {
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('Authorization successful');
          // Parse response body as JSON
          const userData = await response.json();
          // Store user data in localStorage
          const userDataArray = {
            username: userData.userName,
            email: userData.email,
          };
          localStorage.setItem('userDataArray', JSON.stringify(userDataArray));
          navigate('/profile');
        } else {
          // Handle errors
          if (response.status === 400) {
            const errorMessage = await response.text();
            console.error('Failed to submit form:', errorMessage);
            // Display error message to the user (you can implement this)
          } else {
            console.error('Failed to submit form:', response.statusText);
          }
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      try {
        const response = await fetch('http://localhost:3000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Handle successful login/signup
          navigate('/login');
        } else {
          // Handle errors
          if (response.status === 400) {
            // If status is 400, extract error message from response body
            const errorMessage = await response.text();
            console.error('Failed to submit form:', errorMessage);
            setErrorMessage('Username already exists');
            // Display error message to the user (you can implement this)
          } else {
            // For other errors, log the status text
            console.error('Failed to submit form:', response.statusText);
          }
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <StyledLoginForm>
      <Container extraNarrow={true}>
        <StyledInner>
          {errorMessage && <p>{errorMessage}</p>}
          <StyledForm onSubmit={handleSubmit}>
            <StyledFieldset>
              <StyledLabel>
                Username*
                <StyledInput
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                />
              </StyledLabel>
              {!isLogin && (
                <StyledLabel>
                  Email*
                  <StyledInput
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </StyledLabel>
              )}
              <StyledLabel>
                Password*
                <StyledInput
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </StyledLabel>
            </StyledFieldset>
            <StyledButtons>
              <StyledButton type="submit">Sign In</StyledButton>
              <a href={isLogin ? '/sign-up' : '/login'}>
                {isLogin ? 'Create account' : 'Login In'}
              </a>
            </StyledButtons>
          </StyledForm>
        </StyledInner>
      </Container>
    </StyledLoginForm>
  );
};

export default LoginForm;
