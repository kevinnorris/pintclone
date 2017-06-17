import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';

import StyledLink from '../StyledLink';

describe('<StyledLink />', () => {
  it('should render an <Link /> component', () => {
    const renderedComponent = shallow(<StyledLink />);
    expect(renderedComponent.contains(<Link />)).toEqual(true);
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<StyledLink />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<StyledLink id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<StyledLink attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
