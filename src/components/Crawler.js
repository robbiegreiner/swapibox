import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Crawler.css';

const Crawler = ({ filmArray, whichCrawler }) => (
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

Crawler.propTypes = {
  filmArray: PropTypes.array.isRequired,
  whichCrawler: PropTypes.number.isRequired
};

export default Crawler;
