/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');
// const selectData = (state) => state.get('data');

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);
const makeSelectSkill = () => createSelector(
  selectHome,
  (homeState) => homeState.get('skill')
);

const makeSelectLocation = () => createSelector(
  selectHome,
  (homeState) => homeState.get('location')
);
const getDataFromSelector = () => createSelector(
  selectHome,
  (homeState) => homeState.get('data') ? homeState.get('data') : []
);

export {
  selectHome,
  makeSelectUsername,
  makeSelectSkill,
  makeSelectLocation,
  getDataFromSelector
};
