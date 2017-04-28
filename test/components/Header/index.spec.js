import React from 'react';
import { mount } from 'enzyme';

import Header from 'components/Header';

function setup() {
  return mount(<Header />);
}

describe('Header', () => {
  const wrapper = setup();

  it('should be a StatelessComponent', () => {
    expect(wrapper.instance().constructor.name).toBe('StatelessComponent');
  });

  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
