import React from 'react';
import styled from 'styled-components';
import { Container } from './ui';

const StyledUserProfile = styled.section``;

const UserProfile = () => {
  // Retrieve userDataArray from localStorage
  const userData = JSON.parse(localStorage.getItem('userData'));

  if (userData) {
    const { userName: username, email } = userData;
    return (
      <>
        {userData && Object.keys(userData).length !== 0 ? (
          <StyledUserProfile>
            <Container narrow={true}>
              <h2>{`${username}'s Profile`}</h2>
              <p>{email}</p>
            </Container>
          </StyledUserProfile>
        ) : (
          ''
        )}
      </>
    );
  }
};

export default UserProfile;
