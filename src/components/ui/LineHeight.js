export const LineHeight = (value, defaultValue = 1.2) => {
  switch (value) {
    case 2:
      return 1.25 * defaultValue;
    case 3:
      return 1.5 * defaultValue;
    case 4:
      return 2 * defaultValue;
    default:
      return 1 * defaultValue;
  }
};
