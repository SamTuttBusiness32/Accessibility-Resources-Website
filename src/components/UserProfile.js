import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Container, Heading, TextAlignment } from './ui';
import UploadForm from './UploadForm';
import { navigate } from 'gatsby';
import { sectionMargins } from '../styles';

const StyledUserProfile = styled.section`
  ${sectionMargins()};
`;

const StyledInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const StyledHeader = styled.header`
  text-align: ${({ theme }) => TextAlignment(theme.alignTextValue, 'center')};
`;

const UserProfile = () => {
  // Retrieve userDataArray from localStorage
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataFromLocalStorage = JSON.parse(
      localStorage.getItem('userData'),
    );
    if (userDataFromLocalStorage) {
      setUserData(userDataFromLocalStorage);
    }
  }, []);

  const handleLogOut = () => {
    // Clear all localStorage values
    localStorage.clear();
    // Optionally, you can also clear the state
    setUserData(null);
    navigate('/');
  };

  if (!userData || Object.keys(userData).length === 0) {
    return null; // or a loading state
  }

  const { userName: username, email } = userData;

  return (
    <StyledUserProfile>
      <Container extraNarrow={true}>
        <StyledInner>
          <StyledHeader>
            <Heading>{`${username}'s Profile`}</Heading>
            <p>{email}</p>
          </StyledHeader>
          <UploadForm username={username} />
          <Button onClick={handleLogOut}>Log Out</Button>
        </StyledInner>
      </Container>
    </StyledUserProfile>
  );
};

export default UserProfile;
