export const formateDate = date => {
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return date.toLocaleDateString('en-US', dateOptions);
};

export const createLink = text =>
  text
    .toLowerCase()
    .split(' ')
    .map(elem => elem.replace(/\W/g, ''))
    .join('-');
