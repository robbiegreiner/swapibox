import React from 'react';
import PropTypes from 'prop-types';


const Crawler = ({ filmArray, whichCrawler }) => {

  return (
    <div className='crawl-container'>
      <div className='star-wars'>
        <div className='crawl'>
          <p className='crawl-text'>{filmArray[whichCrawler].openingCrawl}</p>
          <p className='film-title'>{filmArray[whichCrawler].title}</p>
          <p className='release-date'>{filmArray[whichCrawler].release}</p>
        </div>
      </div>
    </div>
  );
};

Crawler.propTypes = {
  filmArray: PropTypes.array.isRequired,
  whichCrawler: PropTypes.number.isRequired
};

export default Crawler;
