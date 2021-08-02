import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {updateProfile, getUserSigned} from '../redux/actions/user';
import {connect} from 'react-redux';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import ImagePicker from 'react-native-image-picker';
import {authSignOut, authSignIn} from './../redux/actions/auth';
import {API_URL} from '@env';

const EditProfile = props => {
  const {userData, refreshToken} = props.auth.info;
  const [picture, setPicture] = useState('');
  const [username, setUsername] = useState(userData.username);
  const [name, setName] = useState(userData.name);
  const [phone_number, setPhoneNumber] = useState(userData.phone_number);
  const [user_address, setUserAddress] = useState(userData);
  const [modal, setModal] = useState(false);
  const user = props.user.user[0];

  // const userSigned = props.user.user[0].length > 0 ?

  const showModal = visible => {
    setModal(visible);
  };

  const selectPicture = event => {
    if (!event.didCancel) {
      setPicture(event.assets[0]);
      props.getUserSigned(refreshToken);
      setModal(false);
    } else {
      console.log('cancel');
    }
  };

  const handeLaunchCamera = event => {
    if (!event.didCancel) {
      setPicture(event.assets[0]);
      props.getUserSigned(refreshToken);
      setModal(false);
    } else {
      console.log('cancel');
    }
    console.log(event, 'event for camera');
  };

  console.log(props.user, 'signed');

  const updateUserData = () => {
    const setData = {
      picture,
      username,
      name,
      phone_number,
      user_address,
    };
    props.updateProfile(refreshToken, userData.id, setData);
    props.getUserSigned(refreshToken);
  };

  useEffect(() => {
    props.getUserSigned(refreshToken);
  }, []);

  console.log(userData);

  return (
    <View style={styles.parent}>
      <ScrollView>
        <View>
          <Text style={styles.editProfileText}>Edit Profile</Text>
          <TouchableOpacity
            onPress={() => showModal(true)}
            style={styles.profilePictureContainer}>
            <Image
              source={{uri: `${API_URL}${user.picture}`}}
              style={styles.profilePicture}
            />
            <View style={styles.penContainer}>
              <Icon name="pen" style={styles.pen} />
            </View>
          </TouchableOpacity>
          <View style={styles.formData}>
            <SafeAreaView>
              <Text style={styles.label}>Name :</Text>
              <TextInput
                value={name}
                style={styles.input}
                onChangeText={setName}
                defaultValue={user.name}
              />
            </SafeAreaView>
            <SafeAreaView>
              <Text style={styles.label}>Email Address :</Text>
              <TextInput
                value={username}
                style={styles.input}
                onChangeText={setUsername}
                defaultValue={user.username}
              />
            </SafeAreaView>
            <SafeAreaView>
              <Text style={styles.label}>Phone Number :</Text>
              <TextInput
                value={phone_number}
                style={styles.input}
                onChangeText={setPhoneNumber}
                defaultValue={user.phone_number}
              />
            </SafeAreaView>
            <SafeAreaView>
              <Text style={styles.label}>Date of Birth :</Text>
              <TextInput style={styles.input} />
            </SafeAreaView>
            <SafeAreaView>
              <Text style={styles.label}>Delivery Address :</Text>
              <TextInput
                value={user_address}
                style={styles.input}
                onChangeText={setUserAddress}
                defaultValue={user.user_address}
              />
            </SafeAreaView>
            <TouchableOpacity onPress={updateUserData} style={styles.saveBtn}>
              <Text style={styles.saveBtnText}>Save And Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={modal}
        onRequestClose={() => setModal(true)}
        transparent={true}
        animationType={'fade'}
        style={styles.imagePickerModal}>
        <View style={styles.modalParent}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => showModal(false)}
              style={styles.closeIcon}>
              <AntDesign name="close" size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => launchCamera({}, handeLaunchCamera)}
              style={styles.imagePickerBtn1}>
              <AntDesign style={styles.imagePickerIcon} name="camera" />
              <Text style={styles.imagePickerText}>Take a photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => launchImageLibrary({}, selectPicture)}
              style={styles.imagePickerBtn}>
              <AntDesign style={styles.imagePickerIcon} name="file1" />
              <Text style={styles.imagePickerText}>Choose from gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    resizeMode: 'cover',
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
    borderRadius: 20,
    marginVertical: 20,
    marginHorizontal: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnText: {
    fontWeight: 'bold',
    marginVertical: 20,
    fontSize: 20,
    color: '#fff',
  },
  modalParent: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'flex-end',
    zIndex: 1,
    backgroundColor: '#000000a0',
    height: '100%',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  closeIcon: {
    marginHorizontal: 35,
    marginVertical: 15,
    alignItems: 'flex-end',
  },
  imagePickerBtn1: {
    marginHorizontal: 100,
    marginTop: 35,
    alignItems: 'center',
    borderWidth: 1,
    height: 35,
    borderRadius: 10,
    marginVertical: 20,
    flexDirection: 'row',
  },
  imagePickerBtn: {
    marginHorizontal: 100,
    alignItems: 'center',
    borderWidth: 1,
    height: 35,
    borderRadius: 10,
    marginVertical: 20,
    flexDirection: 'row',
  },
  imagePickerText: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: 20,
  },
  imagePickerIcon: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {
  updateProfile,
  authSignOut,
  authSignIn,
  getUserSigned,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
