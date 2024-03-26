export const standardTransition = (value, delay = 1) => {
  switch (delay) {
    case 2:
      return `${value} 0.4s linear`;
    case 3:
      return `${value} 0s linear`;
    default:
      return `${value} 0.2s linear`;
  }
};
