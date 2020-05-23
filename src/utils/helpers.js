export const formateDate = date => {
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return date.toLocaleDateString('en-US', dateOptions);
};
