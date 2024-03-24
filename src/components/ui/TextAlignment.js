export const TextAlignment = (value, defaultValue = 'inherit') => {
  switch (value) {
    case 2:
      return 'left';
    case 3:
      return 'center';
    case 4:
      return 'right';
    case 5:
      return 'justify';
    default:
      return defaultValue;
  }
};
