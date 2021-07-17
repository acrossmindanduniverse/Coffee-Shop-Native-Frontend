import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {toggleAuth} from './../redux/actions/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

const Dashboard = props => {
  // const isClicked = () => {
  //   props.toggleAuth();
  // };

  // console.log(props.user);

  return (
    <TouchableOpacity style={dashboardStyles.barsContainer}>
      <Icon name="bars" style={dashboardStyles.bars} />
    </TouchableOpacity>
  );
};

const dashboardStyles = StyleSheet.create({
  barsContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  bars: {
    color: '#000',
    fontSize: 30,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {toggleAuth};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
