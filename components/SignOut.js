import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {authSignOut} from '../src/redux/actions/auth';
import {getUserDefault} from '../src/redux/actions/user';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SignOut = props => {
  const handleSignOut = () => {
    props.authSignOut();
    props.getUserDefault();
  };

  return (
    <View style={styles.menu}>
      <TouchableOpacity style={styles.btnSignOut} onPress={handleSignOut}>
        <Text style={styles.menuItem}>Sign-Out</Text>
        <FontAwesome style={styles.icon} name="long-arrow-right" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    color: '#6A4029',
    fontWeight: '600',
    fontSize: 25,
  },
  btnSignOut: {
    flexDirection: 'row',
    marginVertical: 50,
    marginLeft: 40,
  },
  icon: {
    color: '#6A4029',
    fontSize: 40,
    marginLeft: 10,
  },
});

const mapDispatchToProps = {authSignOut, getUserDefault};

export default connect(null, mapDispatchToProps)(SignOut);
