export const formateDate = data => {
  const date = new Date(data);

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

export const formateTags = string =>
  string.split(',').map(tag =>
    tag
      .toLowerCase()
      .replace(/[\d_]/gi, '')
      .replace(/\s{2,}/g, ' ')
  );

export const formateContent = content => {
  const regexCursor = /<span.+<\/span>/gm;
  // For empty tags
  const regex = /<p><br><\/p>|<(\w+)\b(?:\s+[\w\-.:]+(?:\s*=\s*(?:"[^"]*"|"[^"]*"|[\w\-.:]+))?)*\s*\/?>\s*<\/\1\s*>/gm;

  return content
    .replace(regexCursor, '')
    .replace(/&nbsp;/g, ' ')
    .replace(regex, '')
    .replace(/<p>/g, '<p class="text-block">');
};
