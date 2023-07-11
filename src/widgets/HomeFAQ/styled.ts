import styled from 'styled-components';

export const HeroGlassPanel = styled.div`
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%), inset 0 0 200px rgb(255 255 255 / 30%);
  border-radius: 5px;
  position: relative;
  z-index: 1;
  background: #f6f6f629;
  overflow: hidden;
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
  color: #ffffff;
  width: 25%;
  padding: 1.5em 2em;

  h1 {
    font-size: 2rem;
  }
`;
