import React from 'react';
import { mount } from 'enzyme';

import Home from 'containers/Home';

jest.mock('react-router-dom/NavLink', () =>
  (({ to, children }) => (<a href={to}>{children}</a>))
);

describe('Home', () => {
  const wrapper = mount(<Home />);

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
