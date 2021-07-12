import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {updateProfile} from './../../redux/actions/user';
import {connect} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';

const EditProfile = props => {
  const {userData, refreshToken} = props.auth.info;
  const [picture, setPicture] = useState('');
  const [updateData, setUpdateData] = useState({
    name: '',
    username: '',
    phone_number: '',
    user_address: '',
  });

  const selectPicture = event => {
    if (!event.didCancel) {
      setPicture(event.assets[0].uri);
    }
  };

  const updateUserData = () => {
    const setData = {
      name: updateData.name,
      user_address: userData.user_address,
      picture: picture,
    };
    props.updateProfile(refreshToken, userData.id, setData);
  };

  console.log(userData);
  return (
    <View style={styles.parent}>
      <Text style={styles.editProfileText}>Edit Profile</Text>
      <ScrollView>
        <TouchableOpacity
          onPress={() => launchImageLibrary({}, selectPicture)}
          style={styles.profilePictureContainer}>
          <Image source={{uri: picture}} style={styles.profilePicture} />
          <View style={styles.penContainer}>
            <Icon name="pen" style={styles.pen} />
          </View>
        </TouchableOpacity>
        <View style={styles.formData}>
          <SafeAreaView>
            <Text style={styles.label}>Name :</Text>
            <TextInput
              value={updateData.name}
              style={styles.input}
              onChangeText={e => setUpdateData(e)}
            />
          </SafeAreaView>
          <SafeAreaView>
            <Text style={styles.label}>Email Address :</Text>
            <TextInput
              value={updateData.username}
              style={styles.input}
              onChangeText={e => setUpdateData(e)}
            />
          </SafeAreaView>
          <SafeAreaView>
            <Text style={styles.label}>Phone Number :</Text>
            <TextInput
              value={updateData.phone_number}
              style={styles.input}
              onChangeText={e => setUpdateData(e)}
            />
          </SafeAreaView>
          <SafeAreaView>
            <Text style={styles.label}>Date of Birth :</Text>
            <TextInput style={styles.input} />
          </SafeAreaView>
          <SafeAreaView>
            <Text style={styles.label}>Delivery Address :</Text>
            <TextInput
              value={updateData.user_address}
              style={styles.input}
              onChangeText={e => setUpdateData(e)}
            />
          </SafeAreaView>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={updateUserData} style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Save And Change</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  editProfileText: {
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 70,
    textAlign: 'center',
  },
  profilePictureContainer: {
    alignItems: 'center',
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: 'grey',
  },
  penContainer: {
    backgroundColor: '#6A4029',
    left: 70,
    bottom: 50,
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  pen: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
  },
  formData: {
    marginHorizontal: 50,
  },
  label: {
    fontSize: 17,
    marginVertical: 13,
    fontWeight: 'bold',
    color: '#9F9F9F',
  },
  input: {
    borderBottomWidth: 1,
    color: '#9F9F9F',
  },
  saveBtn: {
    backgroundColor: '#6A4029',
    height: 70,
    borderRadius: 20,
    marginBottom: 30,
    marginHorizontal: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {updateProfile};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
