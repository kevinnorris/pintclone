import React from 'react';
import Masonry from 'react-masonry-component';
import styled from 'styled-components';

import Pin from 'components/Pin';

const masonryOptions = {
  transitionDuration: 0,
};

const Wrapper = styled.div`
  margin: 0 auto;
  width: 1200px;

  @media (max-width: 1249px) {
    width: 1000px;
  }

  @media (max-width: 999px) {
    width: 750px;
  }

  @media (max-width: 749px) {
    width: 500px;
  }

  @media (max-width: 499px) {
    width: 250px;
  }
`;

function PictureGrid({ pictures }) {
  let pics;
  if (pictures) {
    pics = pictures.map((element) => (
      <Pin
        key={element.id}
        id={element.id}
        title={element.title}
        imgurl={element.imgurl}
        username={element.username}
        userThumbnail={element.avatarurl}
        likes={element.likecount}
        liked={element.liked}
      />
    ));
  }
  return (
    <Wrapper>
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
    </Wrapper>
  );
}

PictureGrid.propTypes = {
  pictures: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.bool]),
};

export default PictureGrid;
