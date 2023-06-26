import styled from 'styled-components';

export const ArticleCard = styled.div`
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%), inset 0 0 200px rgb(255 255 255 / 30%);
  border-radius: 5px;
  position: relative;
  z-index: 1;
  background: inherit;
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
  padding: 30px 20px;
  width: 25%;
  min-height: 250px;
  align-items: center;
  display: flex;
  cursor: pointer;
`;

export const ArticleCardContent = styled.div`
  display: block;
  width: 100%;

  h3 {
    width: 100%;
    height: 30px;
    color: #000;
  }
  span {
    width: 100%;
    height: 43px;
    overflow: hidden;
    font-size: 13px;
    display: block;
    color: #000;
  }
`;

export const ArticleCardImage = styled.div`
  margin-bottom: 15px;
  height: 160px;
  width: 100%;

  svg {
    width: auto;
    height: 100%;
    border-radius: 8px;
  }
`;

export const HighlightedHeading = styled.h2`
  margin-bottom: 45px;
  text-align: center;
  font-size: 3rem;
  width: 100%;
  color: #000;
`;
