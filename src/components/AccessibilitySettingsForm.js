import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  brandColours,
  standardColours,
  fontWeights,
  visuallyHidden,
} from '../styles';
import { Button } from './ui';

const StyledAccessibilitySettingsForm = styled.form`
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background-color: ${standardColours.white};
  color: ${brandColours.primary};
  border-radius: 0;
  line-height: 1.5;
  letter-spacing: 0;
  word-spacing: 0;
  font-weight: ${fontWeights.regular};
  text-align: center;
  font-size: 16px; /* This should be specified directly */
  border: solid 2px ${brandColours.tertiary};
  border-radius: 4px;

  &:hover {
    color: ${standardColours.white};
    background-color: ${brandColours.primary};
  }
`;

const StyledLabel = styled.label`
  ${visuallyHidden()};
`;

const AccessibilitySettingsForm = ({
  fontSizeMultiplier,
  saturationValue,
  colourValue,
  alignTextValue,
  textSpacingValue,
  lineHeightValue,
  hideImagesValue,
  highlightLinksValue,
  fontWeightValue,
  animationDelayValue,
  fontValue,
}) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'))
      ? JSON.parse(localStorage.getItem('userData'))
      : '';
    setUserData(userData);
  }, []);

  const { userName: username } = userData;

  const handleSaveClick = async e => {
    e.preventDefault();
    try {
      const formData = {
        userName: username,
        fontSizeMultiplier,
        saturationValue,
        colourValue,
        alignTextValue,
        textSpacingValue,
        lineHeightValue,
        hideImagesValue,
        highlightLinksValue,
        fontWeightValue,
        animationDelayValue,
        fontValue,
      };

      const response = await fetch('http://localhost:3000/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Settings saved successfully');
        const userData = await response.json();
        localStorage.setItem('userSettings', JSON.stringify(userData));
        // Optionally, you can redirect the user after successful save
      } else {
        console.error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <StyledAccessibilitySettingsForm>
      <StyledLabel>
        Font Size Multiplier:
        <input
          type="text"
          name="fontSizeMultiplier"
          value={fontSizeMultiplier}
        />
      </StyledLabel>
      <StyledLabel>
        Saturation Value:
        <input type="text" name="saturationValue" value={saturationValue} />
      </StyledLabel>
      <StyledLabel>
        Text Spacing Value:
        <input type="text" name="textSpacingValue" value={textSpacingValue} />
      </StyledLabel>
      <StyledLabel>
        Align Text Value:
        <input type="text" name="alignTextValue" value={alignTextValue} />
      </StyledLabel>
      <StyledLabel>
        Colour Value:
        <input type="text" name="colourValue" value={colourValue} />
      </StyledLabel>
      <StyledLabel>
        Line Height Value:
        <input type="text" name="lineHeightValue" value={lineHeightValue} />
      </StyledLabel>
      <StyledLabel>
        Hide Images Value:
        <input type="text" name="hideImagesValue" value={hideImagesValue} />
      </StyledLabel>
      <StyledLabel>
        Highlight Links Value:
        <input
          type="text"
          name="highlightLinksValue"
          value={highlightLinksValue}
        />
      </StyledLabel>
      <StyledLabel>
        Font Weight Value:
        <input type="text" name="fontWeightValue" value={fontWeightValue} />
      </StyledLabel>
      <StyledLabel>
        Animation Delay Value:
        <input
          type="text"
          name="animationDelayValue"
          value={animationDelayValue}
        />
      </StyledLabel>
      <StyledLabel>
        Font Value:
        <input type="text" name="fontValue" value={fontValue} />
      </StyledLabel>
      <StyledButton onClick={handleSaveClick} disabled={!username}>
        Save
      </StyledButton>
    </StyledAccessibilitySettingsForm>
  );
};

export default AccessibilitySettingsForm;
