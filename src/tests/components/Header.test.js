import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

test('should render Header Component correctly', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();

  //   expect(wrapper.find('h1').length).toBe(1);
  //   expect(wrapper.find('h1').text()).toBe('Expensify');

  //   const renderer = new ReactShallowRenderer();
  //   renderer.render(<Header />);
  //   expect(renderer.getRenderOutput()).toMatchSnapshot();
  //   console.log(renderer.getRenderOutput());
});
