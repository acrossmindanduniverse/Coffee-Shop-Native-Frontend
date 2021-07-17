import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {authSignOut} from '../redux/actions/auth';

const Private = () => {
  return (
    <View>
      <Text>test</Text>
    </View>
  );
};

const mapDispatchToProps = {authSignOut};

export default connect(null, mapDispatchToProps)(Private);
