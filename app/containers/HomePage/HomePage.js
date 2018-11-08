/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'react-grid-system'; 
import ReposList from 'components/ReposList';
import './style.scss';
import { TextField, Button, Card, CardHeader, CardContent, CardActions, CardMedia } from '@material-ui/core';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */

  // componentWillMount() {
  //   this.props.loadData();
  // }


  onSubmitForm = () => {
    if (this.props.skill && this.props.location && this.props.skill.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    const { loading, error, repos, data } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <Fragment>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div className="home-page">
          <Row className="searchBar">
           <Col lg={2} md={2} sm={2}>
           <div></div>
           </Col>
            <Col lg={3} md={3} sm={3}>
              <TextField
                id="skill"
                type="text"
                placeholder="Skill"
                value={this.props.skill}
                onChange={this.props.onChangeSkill}
                fullWidth
                />
            </Col>
            <Col lg={3} md={3} sm={3}>
              <TextField
                id="location"
                type="text"
                placeholder="Location"
                value={this.props.location}
                onChange={this.props.onChangeLocation}
                fullWidth
                />
            </Col>
            <Col lg={2} md={2} sm={2}>
              <Button color="primary" variant="raised" onClick={this.onSubmitForm}>
              Go</Button>
            </Col>
          </Row>
          {data ? data.map((item)=>(
            <Fragment key={item.id}>
              <Card className="jobCard">
                <a href={item.url} target="_blank" className="jobURL">
                <CardHeader title={item.title} subheader={ item.company + " ," + item.location} />
                </a>
                <CardContent>
                  <p dangerouslySetInnerHTML={{__html:item.description}}></p>
                </CardContent>
                <CardActions>
                <a href={item.company_url} target="_blank">
                <Button size="small" color="primary" variant="raised" >
                  Company URL
                </Button>
                </a>
                <a href={item.url} target="_blank">
                <Button size="small" color="primary" variant="raised" >
                  Job URL
                </Button>
                </a>
                </CardActions>
              </Card>
              </Fragment>
            )) : <p>OOPs! No Result Found</p> }
        </div>
      </Fragment>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  skill: PropTypes.string,
  location: PropTypes.string,
  onChangeUsername: PropTypes.func,
  loadData: PropTypes.func,
  data: PropTypes.array
};
