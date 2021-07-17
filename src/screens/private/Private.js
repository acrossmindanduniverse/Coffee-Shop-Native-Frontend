import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {connect} from 'react-redux';

const Private = ({children, auth, navigation, ...rest}) => {
  const {onAuth} = auth;
  return (
    <NavigationContainer
      {...rest}
      render={() => {
        if (!onAuth) {
          return navigation.navigate('welcome');
        }
        return children;
      }}
    />
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Private);
