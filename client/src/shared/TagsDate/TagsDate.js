import React from 'react';

import TagsList from '../TagsList';
import { formateDate } from '../../utils/helpers';

const TagsDate = ({ tags, date }) => {
  const formatedDate = formateDate(date);

  return (
    <div className="tags-date">
      <TagsList tags={tags} />
      <span className="sep">/</span>
      <time>{formatedDate}</time>
    </div>
  );
};

export default TagsDate;
