import React from 'react';
import styled from 'styled-components';
import { Container } from './ui';

const StyledUserProfile = styled.section``;

const UserProfile = () => {
  // Retrieve userDataArray from localStorage
  const userDataArray = JSON.parse(localStorage.getItem('userDataArray'));

  if (userDataArray) {
    const { username, email } = userDataArray;
    return (
      <>
        {userDataArray && Object.keys(userDataArray).length !== 0 ? (
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
