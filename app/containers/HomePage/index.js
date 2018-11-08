import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError
} from 'containers/App/selectors';
import { loadRepos } from '../App/actions';
import { changeSkill, changeLocation, dataLoadRequest } from './actions';
import { makeSelectUsername, getDataFromSelector, makeSelectSkill, makeSelectLocation } from './selectors';
import reducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';


const mapDispatchToProps = (dispatch) => ({
  onChangeSkill: (evt) => dispatch(changeSkill(evt.target.value)),
  onChangeLocation: (evt) => dispatch(changeLocation(evt.target.value)),
  onSubmitForm: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(dataLoadRequest());
  }
  // loadData: () => dispatch(dataLoadRequest())
});

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  data: getDataFromSelector(),
  username: makeSelectUsername(),
  skill: makeSelectSkill(),
  location: makeSelectLocation(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
