import styled from 'styled-components';

import { PageSection } from '../Common';

export const FAQBackground = styled.div`
  background-image: url('https://wwwsitecorecom.azureedge.net/assets/images/Sitecore_3D-Composition_Neutral_Scene07.jpg');
  background-color: #02a79a;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
  opacity: 0.3;
`;

export const FAQContent = styled.div`
  justify-content: space-around;
  display: flex;
`;

export const FAQPageSection = styled(PageSection)`
  background-color: #02a79a;
  padding-top: 40px;
`;
