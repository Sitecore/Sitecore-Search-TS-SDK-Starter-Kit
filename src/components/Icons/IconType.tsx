import React from 'react';
import ArticleIcon from './ArticleIcon';
import BlogIcon from './BlogIcon';
import CalendarIcon from './CalendarIcon';
import NewsIcon from './NewsIcon';

const getIcon = (type: string): JSX.Element => {
  switch (type) {
    case 'Blogs':
      return <BlogIcon />;
    case 'Webinar':
      return <CalendarIcon />;
    case 'News':
      return <NewsIcon />;
    case 'Events':
      return <CalendarIcon />;
    default:
      return <ArticleIcon />;
  }
};

export default getIcon;
