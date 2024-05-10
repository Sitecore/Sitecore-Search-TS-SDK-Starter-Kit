import { useNavigate } from 'react-router-dom';

import { DEFAULT_IMAGE, HIGHLIGHT_DATA } from '../../../data/constants';
import type { ArticleModel } from '../../utils';
import { HighlightComponent, getDescription } from '../../utils';
import { ArticleCardRowStyled, RowStyled } from '../styled';

export interface SearchPaginationType {
  onItemClick: (facet: any) => void;
  language: string;
  articles: ArticleModel[];
}

export const RowStyledResults = ({ onItemClick, language, articles }: SearchPaginationType) => {
  const navigate = useNavigate();
  return (
    <>
      <RowStyled>
        {articles.map((a, index) => (
          <ArticleCardRowStyled.Root key={`${a.id}@${a.source_id}@${language}`}>
            <ArticleCardRowStyled.Left>
              <ArticleCardRowStyled.Image src={a.image_url || a.image || DEFAULT_IMAGE} />
            </ArticleCardRowStyled.Left>
            <ArticleCardRowStyled.Right>
              <ArticleCardRowStyled.Title>
                <ArticleCardRowStyled.Link
                  to={`/detail/${a.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onItemClick({ id: a.id || '', index });
                    navigate(`/detail/${a.id}`);
                  }}
                >
                  {a.title}
                </ArticleCardRowStyled.Link>
              </ArticleCardRowStyled.Title>
              <ArticleCardRowStyled.Content>
                <HighlightComponent
                  text={getDescription(a, 'description')}
                  preSeparator={HIGHLIGHT_DATA.pre}
                  postSeparator={HIGHLIGHT_DATA.post}
                  highlightElement={HIGHLIGHT_DATA.highlightTag}
                />
              </ArticleCardRowStyled.Content>
              <ArticleCardRowStyled.Type>{a.type ? a.type : 'Unknown'}</ArticleCardRowStyled.Type>
            </ArticleCardRowStyled.Right>
          </ArticleCardRowStyled.Root>
        ))}
      </RowStyled>
    </>
  );
};

export default RowStyledResults;
