import React from 'react';
import { Overlay, Popover, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';
import HeaderButton from 'components/HeaderButton';
import HeaderButtonSmall from 'components/HeaderButtonSmall';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
`;

const SetWidthPopover = styled(Popover)`
  width: 250px;
`;

function AddPicPopover({ error, fetching, show, target, imgUrl, title, titleChange, imgUrlChange, handelClick, handelSubmit }) {
  return (
    <Wrapper>
      <HeaderButtonSmall onClick={handelClick}>Add Pic</HeaderButtonSmall>
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={this}
      >
        <SetWidthPopover id="add-pic-popover">
          {error ? <p>{error}</p> : null}
          <Form horizontal onSubmit={handelSubmit}>
            <FormGroup controlId="addPicUrl">
              <Col componentClass={ControlLabel} sm={2}>
                Url
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  value={imgUrl}
                  onChange={imgUrlChange}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="addPicTitle">
              <Col componentClass={ControlLabel} sm={2}>
                Title
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  value={title}
                  onChange={titleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <HeaderButton main type="submit">
                  Add Picture
                </HeaderButton>
              </Col>
            </FormGroup>
          </Form>
        </SetWidthPopover>
      </Overlay>
    </Wrapper>
  );
}

AddPicPopover.propTypes = {
  error: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]).isRequired,
  fetching: React.PropTypes.bool.isRequired,
  show: React.PropTypes.bool.isRequired,
  target: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.object]),
  imgUrl: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  titleChange: React.PropTypes.func.isRequired,
  imgUrlChange: React.PropTypes.func.isRequired,
  handelClick: React.PropTypes.func.isRequired,
  handelSubmit: React.PropTypes.func.isRequired,
};

export default AddPicPopover;
