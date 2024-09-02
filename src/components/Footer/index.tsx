import React from 'react';

import footerData from '@/data/footer.json';

const Footer = (): JSX.Element => {
  return (
    <footer className="relative w-full border-t border-t-gray-200 dark:border-t-gray-400 pt-4 pb-4">
      <div className="w-[80%] m-auto flex justify-between flex-wrap">
        {footerData.map((list, index) => (
          <div
            key={`${list.mainTitle}-${index}`}
            className="flex-grow-0 flex-shrink-0 basis-[25%] max-w-[20%] text-left"
          >
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-[30px]">{list.mainTitle}</h4>
            <ul>
              {list.items.map((item, index) => (
                <li key={`${item}-${index}`}>
                  <a href="#" className=" text-gray-900 dark:text-gray-100 text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
