import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Chevron from 'react-native-vector-icons/Entypo';
import {updateProfile} from '../../redux/actions/user';
import {connect} from 'react-redux';

const Profile = props => {
  return (
    <View style={styles.parent}>
      <Text style={styles.myProfileText}>My Profile</Text>
      <View style={styles.infoText}>
        <Text style={styles.infoText1}>Your Information</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('editProfile')}>
          <Text style={styles.infoText2}>edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.editProfileContainer}>
        <View style={styles.editProfileContent}>
          <View>
            <Image style={styles.image} />
          </View>
          <View style={styles.editProfile}>
            <Text style={styles.userName}>User Name</Text>
            <SafeAreaView>
              <TextInput placeholder="user email" />
              <TextInput placeholder="user phone number" />
              <TextInput placeholder="user address" />
            </SafeAreaView>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.profileMenuContainer}>
          <View style={styles.profileMenu}>
            <Text style={styles.orderText}>Order History</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('history')}>
              <Chevron style={styles.chevronRight} name="chevron-right" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.profileMenuContainer}>
          <View style={styles.profileMenu}>
            <Text style={styles.orderText}>Change Password</Text>
            <Chevron style={styles.chevronRight} name="chevron-right" />
          </View>
        </View>
        <View style={styles.profileMenuContainer}>
          <View style={styles.profileMenu}>
            <Text style={styles.orderText}>FAQ</Text>
            <Chevron style={styles.chevronRight} name="chevron-right" />
          </View>
        </View>
        <View style={styles.profileMenuContainer}>
          <View style={styles.profileMenu}>
            <Text style={styles.orderText}>Help</Text>
            <Chevron style={styles.chevronRight} name="chevron-right" />
          </View>
        </View>
        <TouchableOpacity style={styles.saveChangeBtn}>
          <Text style={styles.saveChangeText}>Save Change</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    marginHorizontal: 57,
    marginVertical: 80,
  },
  myProfileText: {
    fontSize: 34,
    marginVertical: 40,
    fontWeight: 'bold',
  },
  infoText: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  infoText1: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText2: {
    color: 'rgba(106, 64, 41, 1)',
    fontSize: 17,
  },
  editProfileContainer: {
    elevation: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  editProfileContent: {
    margin: 19,
    flexDirection: 'row',
  },
  image: {
    width: 90,
    height: 90,
    backgroundColor: '#000',
    borderRadius: 90 / 2,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  editProfile: {
    marginLeft: 20,
  },
  orderText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  profileMenuContainer: {
    backgroundColor: '#fff',
    height: 70,
    borderRadius: 20,
    justifyContent: 'center',
    marginVertical: 15,
  },
  profileMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  saveChangeBtn: {
    backgroundColor: '#6A4029',
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    borderRadius: 20,
  },
  chevronRight: {
    fontSize: 20,
  },
  saveChangeText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#fff',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Profile);
