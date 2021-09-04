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
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  updateProfile,
  uploadPicture,
  getUserSigned,
  errorDefault,
} from '../redux/actions/user';
import {connect} from 'react-redux';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {authSignOut, authSignIn} from './../redux/actions/auth';
import {API_URL} from '@env';
import defaultPicture from '../../assets/defaultPicture.png';

const EditProfile = props => {
  const {token} = props.auth.refreshToken;
  const {info} = props.auth;
  const user = props.user.user[0];
  const [picture, setPicture] = useState({
    picture: '',
  });
  const [profile, setProfile] = useState({
    username: user.username,
    name: user.name,
    phone_number: user.phone_number,
    user_address: user.user_address,
  });
  const [modal, setModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const {updateErrMsg, pictureErr, pictureToggle, onToggle} = props.user;

  console.log(props.user, 'test auth');

  const showModal = visible => {
    setModal(visible);
  };

  const selectPicture = event => {
    if (!event.didCancel) {
      setPicture({
        ...picture,
        picture: event.assets[0],
      });
      props.getUserSigned(token);
      setModal(false);
    } else {
      console.log('cancel');
    }
  };

  const handeLaunchCamera = e => {
    if (!e.didCancel) {
      setPicture({
        ...picture,
        picture: e.assets[0],
      });
      props.getUserSigned(token);
      setModal(false);
    } else {
      console.log('cancel');
    }
  };

  const updateUserData = () => {
    if (picture.picture !== '') {
      props.uploadPicture(token, picture);
    } else {
      props
        .updateProfile(token, info.id, profile)
        .then(res => {
          props.getUserSigned(token);
          setSpinner(true);
          props.errorDefault();
          console.log(res, 'result from component');
        })
        .catch(err => {
          console.log(err, 'error from component');
        });
    }
  };

  useEffect(() => {
    if (pictureToggle) {
      props
        .updateProfile(token, info.id, profile)
        .then(res => {
          props.getUserSigned(token);
          setSpinner(true);
          props.errorDefault();
          console.log(res, 'result from component');
          return res;
        })
        .catch(err => {
          console.log(err, 'error from component');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pictureToggle, spinner]);

  useEffect(() => {
    setTimeout(() => {
      props.errorDefault();
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (onToggle) {
      setTimeout(() => {
        setSpinner(false);
        setSuccessModal(true);
      }, 300);
    } else if (successModal) {
      setTimeout(() => {
        setSuccessModal(false);
      }, 200);
    }
  }, [spinner, successModal, onToggle]);

  return (
    <View style={styles.parent}>
      {spinner && (
        <View style={styles.spinnerContainer}>
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </View>
      )}
      {successModal && (
        <View style={styles.spinnerContainer}>
          <View style={styles.successModalContainer}>
            <Text style={styles.successText}>Profile Updated!</Text>
          </View>
        </View>
      )}
      <Text style={styles.errMsg}>{updateErrMsg}</Text>
      <ScrollView>
        <View>
          <Text style={styles.editProfileText}>Edit Profile</Text>
          <View>
            <View
              style={{
                height: 25,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: 'red',
                  fontSize: 18,
                }}>
                {pictureErr}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => showModal(true)}
              style={styles.profilePictureContainer}>
              <Image
                source={
                  user.picture !== null
                    ? {
                        uri: `${API_URL}${user.picture}`,
                      }
                    : defaultPicture
                }
                style={styles.profilePicture}
              />
              <View style={styles.penContainer}>
                <Icon name="pen" style={styles.pen} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.formData}>
            <SafeAreaView>
              <Text style={styles.label}>Name :</Text>
              <TextInput
                value={profile.name}
                style={styles.input}
                onChangeText={val => {
                  setProfile({
                    ...profile,
                    name: val,
                  });
                }}
                defaultValue={user.name}
              />
            </SafeAreaView>
            <SafeAreaView>
              <Text style={styles.label}>Email Address :</Text>
              <TextInput
                value={profile.username}
                style={styles.input}
                onChangeText={val => {
                  setProfile({
                    ...profile,
                    username: val,
                  });
                }}
                defaultValue={user.username}
              />
            </SafeAreaView>
            <SafeAreaView>
              <Text style={styles.label}>Phone Number :</Text>
              <TextInput
                value={profile.phone_number}
                style={styles.input}
                onChangeText={val => {
                  setProfile({
                    ...profile,
                    phone_number: val,
                  });
                }}
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
                value={profile.user_address}
                style={styles.input}
                onChangeText={val => {
                  setProfile({
                    ...profile,
                    user_address: val,
                  });
                }}
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
  errMsg: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: 'red',
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
    backgroundColor: '#fff',
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
    padding: 7,
    borderRadius: 20,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnText: {
    fontWeight: 'bold',
    marginVertical: 20,
    fontSize: 20,
    color: '#fff',
  },
  spinnerContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    backgroundColor: '#000000a0',
    height: '100%',
  },
  spinner: {
    marginTop: '100%',
  },
  successModalContainer: {
    backgroundColor: '#6A4029',
    alignItems: 'center',
    marginTop: '100%',
    marginHorizontal: 30,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 25,
  },
  successText: {
    fontFamily: 'Poppins-Bold',
    marginHorizontal: 5,
    fontSize: 18,
    marginVertical: 20,
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
  uploadPicture,
  authSignOut,
  authSignIn,
  getUserSigned,
  errorDefault,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
