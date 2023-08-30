import { useSearchResults } from '@sitecore-search/react';

const useSortingOptions = (): any => {
  const {
    state: { sortType },
    queryResult: { data: { sort: { choices: sortChoices = [] } = {} } = {} } = {},
  } = useSearchResults();
  let currentOption = -1;
  const sortOptions = sortChoices.map((s: { label: string; name: string; order?: string }, index: number) => {
    const newOption = {
      label: s.label,
      name: Object.hasOwn(s, 'order') ? `${s.name}_${s.order}` : s.name,
    };
    if (sortType === newOption.name) {
      currentOption = index;
    }
    return newOption;
  });
  currentOption = currentOption >= 0 ? currentOption : 0;
  return {
    sortChoices: sortOptions,
    currentOption: sortOptions.length > 0 ? sortOptions[currentOption] : {},
  };
};

export default useSortingOptions;
