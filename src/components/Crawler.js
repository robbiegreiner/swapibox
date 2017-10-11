import React from 'react';
import PropTypes from 'prop-types';


const Crawler = ({ filmArray, whichCrawler }) => {
  
  return (
    <div className='crawler'>
      <p className='crawl-text'></p>
      <p className='film-title'></p>
      <p className='release-date'></p>
    </div>
  );
};

Crawler.propTypes = {
  filmArray: PropTypes.array.isRequired,
  whichCrawler: PropTypes.number.isRequired
};

export default Crawler;
