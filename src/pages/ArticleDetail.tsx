import { useParams } from 'react-router-dom';

import ArticleDetailWidget from '../widgets/ArticleDetail';

const ArticleDetail = (): JSX.Element => {
  const { id } = useParams();
  return <ArticleDetailWidget key={id} rfkId="rfkid_7" />;
};

export default ArticleDetail;
