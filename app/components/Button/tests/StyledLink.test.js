import React from 'react';
import { shallow } from 'enzyme';

import StyledLink from '../StyledLink';

describe('<StyledLink />', () => {
  it('should have a className attribute', () => {
    const renderedComponent = shallow(<StyledLink />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<StyledLink id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });
});
