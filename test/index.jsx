import React from 'react';
import Chai from 'chai';
import { Store, Plugin } from 'fuuka';
import { mount } from 'enzyme';
import Root from '../src/root';

Chai.use(Plugin);
Chai.should();

describe('Root component', () => {
  it('should render the title', () => {
    let store = new Store({});
    let sut = mount(<Root store={store} />);

    sut.find('h1').text().should.equal('Hello, React!');
  });
});
