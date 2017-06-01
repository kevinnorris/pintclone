import React from 'react';
import Masonry from 'react-masonry-component';
import styled from 'styled-components';

import Pin from 'components/Pin';

const masonryOptions = {
  transitionDuration: 0,
};

function PictureGrid({ pictures }) {
  let pics;
  if (pictures) {
    pics = pictures.map((element) => (
      <Pin
        key={element.id}
        id={element.id}
        title={element.title}
        imgurl={element.imgurl}
      />
    ));
  }
  return (
    <div>
      {pics ?
        <Masonry
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad
        >
          {pics}
        </Masonry> :
        null
      }
    </div>
  );
}

PictureGrid.propTypes = {
  pictures: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.bool]),
};

export default PictureGrid;
