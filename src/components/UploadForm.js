import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import defaultProfilePicture from '../images/default profile picture.png';
import { visuallyHidden } from '../styles';

const StyledUploadForm = styled.form``;

const StyledInner = styled.div`
  ${visuallyHidden()}
`;

const StyledButton = styled.button`
  border: none;
  background: none;
`;

const StyledImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 50%;
  cursor: pointer;
`;

const UploadForm = ({ username }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async event => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    // Trigger form submission after file selection
    await handleSubmit(selectedFile);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async file => {
    if (!file) {
      console.error('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('username', username);

    try {
      const response = await axios.post(
        'http://localhost:3000/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data.url);
      setFile(null);
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  return (
    <StyledUploadForm>
      <StyledInner>
        <label htmlFor="image">Choose Image:</label>
        <input
          type="file"
          id="image"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </StyledInner>
      <StyledButton type="button" onClick={handleImageClick}>
        <StyledImage src={defaultProfilePicture} />
      </StyledButton>
    </StyledUploadForm>
  );
};

export default UploadForm;
