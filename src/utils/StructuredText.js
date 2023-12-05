export const hasStructuredText = data => {
  let result = false;

  if (
    data &&
    data.value &&
    data.value.document.children[0].children[0].value !== ''
  ) {
    result = true;
  }

  return result;
};
