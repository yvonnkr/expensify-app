import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <div>
    <Route
      {...rest}
      component={props =>
        isAuthenticated ? (
          <div>
            <Header />
            <Component {...props} />{' '}
          </div>
        ) : (
          <Redirect to='/' />
        )
      }
    />
  </div>
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid //if uid exists true else undefined so used '!!' (to return boolean)
});

export default connect(mapStateToProps)(PrivateRoute);
