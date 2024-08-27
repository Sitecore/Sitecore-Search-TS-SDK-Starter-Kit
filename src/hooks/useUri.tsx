import { useLocation } from 'react-router-dom';

import { BASE_PATH } from '@/data/constants';

const useUri = () => {
  const location = useLocation();
  console.log('LOCATION:', location);
  return `${BASE_PATH}${location.pathname}${location.search}`;
};

export default useUri;
