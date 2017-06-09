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

class AddPicPopover extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    show: false,
    target: false,
    imgUrl: '',
    title: '',
  }

  handleClick = (e) => {
    this.setState({ target: e.target, show: !this.state.show });
  };

  handelInputChange(field) {
    return (e) => {
      const newState = {
        ...this.state,
        [field]: e.target.value,
      };
      this.setState(newState);
    };
  }

  handelSubmit = (e) => {
    e.preventDefault();
    this.props.addPic(this.state.imgUrl, this.state.title);
  }

  render() {
    return (
      <Wrapper>
        <HeaderButtonSmall onClick={this.handleClick}>Add Pic</HeaderButtonSmall>
        <Overlay
          show={this.state.show}
          target={this.state.target}
          placement="bottom"
          container={this}
        >
          <SetWidthPopover id="add-pic-popover">
            {this.props.error ? <p>{this.props.error}</p> : null}
            <Form horizontal onSubmit={this.handelSubmit}>
              <FormGroup controlId="addPicUrl">
                <Col componentClass={ControlLabel} sm={2}>
                  Url
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    value={this.state.imgUrl}
                    onChange={this.handelInputChange('imgUrl')}
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
                    value={this.state.title}
                    onChange={this.handelInputChange('title')}
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
}

AddPicPopover.propTypes = {
  error: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]).isRequired,
  fetching: React.PropTypes.bool.isRequired,
  addPic: React.PropTypes.func.isRequired,
};

export default AddPicPopover;
