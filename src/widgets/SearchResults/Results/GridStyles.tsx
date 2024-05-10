import { useNavigate } from 'react-router-dom';

import { DEFAULT_IMAGE, HIGHLIGHT_DATA } from '../../../data/constants';
import type { ArticleModel } from '../../utils';
import { HighlightComponent, getDescription } from '../../utils';
import { ArticleCardStyled, GridStyled } from '../styled';

export interface SearchPaginationType {
  onItemClick: (facet: any) => void;
  language: string;
  articles: ArticleModel[];
}

export const GridStyledResults = ({ onItemClick, language, articles }: SearchPaginationType) => {
  const navigate = useNavigate();
  return (
    <>
      <GridStyled>
        {articles.map((a, index) => (
          <ArticleCardStyled.Root key={`${a.id}@${a.source_id}@${language}`}>
            <ArticleCardStyled.ImageWrapper>
              <ArticleCardStyled.Image src={a.image_url || a.image || DEFAULT_IMAGE} />
            </ArticleCardStyled.ImageWrapper>
            <ArticleCardStyled.Title>
              <ArticleCardStyled.Link
                title={a.title}
                to={`/detail/${a.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onItemClick({ id: a.id || '', index });
                  navigate(`/detail/${a.id}`);
                }}
              >
                {a.title}
              </ArticleCardStyled.Link>
            </ArticleCardStyled.Title>
            <ArticleCardStyled.Subtitle>
              <HighlightComponent
                text={getDescription(a, 'subtitle')}
                preSeparator={HIGHLIGHT_DATA.pre}
                postSeparator={HIGHLIGHT_DATA.post}
                highlightElement={HIGHLIGHT_DATA.highlightTag}
              />
            </ArticleCardStyled.Subtitle>
            <ArticleCardStyled.Type>{a.type ? a.type : 'Unknown'}</ArticleCardStyled.Type>
          </ArticleCardStyled.Root>
        ))}
      </GridStyled>
    </>
  );
};

export default GridStyledResults;
