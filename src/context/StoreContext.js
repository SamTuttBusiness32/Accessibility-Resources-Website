import React, { createContext, useState } from 'react';

const defaultValues = {
  fontSizeMultiplier: '1',
  setFontSizeMultiplier: () => {},
};

export const StoreContext = createContext(defaultValues);

export const StoreProvider = ({ children }) => {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(
    defaultValues.fontSizeMultiplier,
  );

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,

        fontSizeMultiplier,
        setFontSizeMultiplier,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
