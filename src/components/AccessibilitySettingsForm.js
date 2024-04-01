import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { brandColours, standardColours, fontWeights } from '../styles';
import { Button } from './ui';
import { navigate } from 'gatsby';

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
  const userDataArray = JSON.parse(localStorage.getItem('userDataArray'));

  const handleSaveClick = async e => {
    e.preventDefault();
    try {
      const formData = {
        userName: userDataArray.username,
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
      <label>
        Font Size Multiplier:
        <input
          type="text"
          name="fontSizeMultiplier"
          value={fontSizeMultiplier}
        />
      </label>
      <label>
        Saturation Value:
        <input type="text" name="saturationValue" value={saturationValue} />
      </label>
      <label>
        Text Spacing Value:
        <input type="text" name="textSpacingValue" value={textSpacingValue} />
      </label>
      <label>
        Align Text Value:
        <input type="text" name="alignTextValue" value={alignTextValue} />
      </label>
      <label>
        Colour Value:
        <input type="text" name="colourValue" value={colourValue} />
      </label>
      <label>
        Line Height Value:
        <input type="text" name="lineHeightValue" value={lineHeightValue} />
      </label>
      <label>
        Hide Images Value:
        <input type="text" name="hideImagesValue" value={hideImagesValue} />
      </label>
      <label>
        Highlight Links Value:
        <input
          type="text"
          name="highlightLinksValue"
          value={highlightLinksValue}
        />
      </label>
      <label>
        Font Weight Value:
        <input type="text" name="fontWeightValue" value={fontWeightValue} />
      </label>
      <label>
        Animation Delay Value:
        <input
          type="text"
          name="animationDelayValue"
          value={animationDelayValue}
        />
      </label>
      <label>
        Font Value:
        <input type="text" name="fontValue" value={fontValue} />
      </label>
      <StyledButton onClick={handleSaveClick} disabled={!userDataArray}>
        Save
      </StyledButton>
    </StyledAccessibilitySettingsForm>
  );
};

export default AccessibilitySettingsForm;
