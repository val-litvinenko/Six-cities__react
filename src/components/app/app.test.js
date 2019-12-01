import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

jest.mock(`../map/map.jsx`);
it(`App correctly renders after relaunch`, () => {
  const appComponent = renderer
  .create(<App
    uniqueCities={[]}
    activeCity={{}}
    chooseCityHandler={() => {}}
    listOffer={[]}
  />)
  .toJSON();

  expect(appComponent).toMatchSnapshot();
});
