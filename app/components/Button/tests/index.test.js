import React from 'react';
import { mount } from 'enzyme';

import Button from '../index';

const to = '/kevinnorris';
const children = (<h1>Test</h1>);
const renderComponent = (props = {}) => mount(
  <Button {...props}>
    {children}
  </Button>
);

describe('<Button />', () => {
  it('should render an <button> tag if no route is specified', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find('button').length).toEqual(1);
  });

  it('should render a <a> tag to change route if the to prop is specified', () => {
    const renderedComponent = renderComponent({ to });
    expect(renderedComponent.find('a').length).toEqual(1);
  });

  it('should have children', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should handle click events', () => {
    const onClickSpy = jest.fn();
    const renderedComponent = renderComponent({ onClick: onClickSpy });
    renderedComponent.find('a').simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should have a className attribute', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find('a').prop('className')).toBeDefined();
  });

  it('should not adopt a type attribute when rendering an <a> tag', () => {
    const type = 'text/html';
    const renderedComponent = renderComponent({ to, type });
    expect(renderedComponent.find('a').prop('type')).toBeUndefined();
  });

  it('should adopt a type attribute when rendering a button', () => {
    const type = 'submit';
    const renderedComponent = renderComponent({ type });
    expect(renderedComponent.find('button').prop('type')).toBeDefined();
  });
});
