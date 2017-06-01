import React from 'react';
import Masonry from 'react-masonry-component';
import styled from 'styled-components';

const masonryOptions = {
  transitionDuration: 0,
};

const GridImg = styled.img`
  width: 250px;
`;

function PictureGrid({ pictures }) {
  let pics;
  if (pictures) {
    pics = pictures.map((element) => (
      (
        <div key={element.id}>
          <GridImg src={element.imgurl} />
        </div>
      )
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
