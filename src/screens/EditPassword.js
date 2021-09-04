/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {editPassword, errorDefault} from './../redux/actions/user';
import {authSignOut} from './../redux/actions/auth';

const EditPassword = props => {
  const {token} = props.auth.refreshToken;
  const {updateErrMsg, onToggle} = props.user;
  const [password, setPasssword] = useState({
    password: '',
    resendPassword: '',
  });
  const [validate, setValidate] = useState(false);
  const [modal, setModal] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const handleEditPassword = () => {
    props.editPassword(token, password).then(() => {
      setSpinner(true);
    });
  };

  const showModal = visible => {
    setModal(visible);
  };

  useEffect(() => {
    if (onToggle) {
      setModal(false);
      setSpinner(true);
      props.errorDefault();
      // props.navigation.navigate('editPassword');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onToggle, spinner]);

  useEffect(() => {
    if (spinner) {
      setTimeout(() => {
        setSpinner(false);
        props.authSignOut();
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinner]);

  useEffect(() => {
    if (
      password.resendPassword !== password.password ||
      password.password.length < 8
    ) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  }, [validate, password]);

  return (
    <View style={{flex: 1}}>
      {spinner && (
        <View style={styles.loading}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              height: '100%',
              width: '100%',
              padding: 100,
              zIndex: 1,
            }}>
            <ActivityIndicator size="large" color="rgba(106, 64, 41, 1)" />
          </View>
        </View>
      )}
      <View style={styles.inputParent}>
        <Modal visible={modal} animationType="fade" transparent={true}>
          <View style={styles.modalContainer}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 10,
              }}>
              <View style={styles.modalContent}>
                <Text style={styles.warn}>
                  Are you sure want to change your password? after this you
                  should back to sign in
                </Text>
                <View>
                  <TouchableOpacity
                    onPress={handleEditPassword}
                    style={styles.changeBtn}>
                    <Text style={styles.changeBtnText}>Change Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => showModal(false)}
                    style={styles.cancelBtn}>
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.inputContainer}>
          <View
            style={{
              justifyContent: 'center',
              height: 80,
            }}>
            {password.password.length < 8 && (
              <Text style={styles.errorMsg}>
                Password must be 8 or greater charaters long
              </Text>
            )}
            {password.resendPassword !== password.password && (
              <Text style={styles.errorMsg}>Password didn't match</Text>
            )}
          </View>
          <View style={{padding: 50}}>
            <View style={styles.inputContent}>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={val =>
                  setPasssword({
                    ...password,
                    password: val,
                  })
                }
                placeholder="Enter Your New Password"
              />
            </View>
            <View marginTop={25} style={styles.inputContent}>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={e =>
                  setPasssword({
                    ...password,
                    resendPassword: e,
                  })
                }
                placeholder="Retype New Password"
              />
              {!validate ? (
                <View style={styles.matching}>
                  <View style={styles.didntMatch} />
                </View>
              ) : (
                <View style={styles.matching}>
                  <View style={styles.match} />
                </View>
              )}
            </View>
          </View>
        </View>
        {validate ? (
          <TouchableOpacity
            style={styles.inputBtn}
            onPress={() => showModal(true)}>
            <Text style={styles.inputBtnText}>Continue</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.inputBtn2}>
            <Text style={styles.inputBtnText}>Continue</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputParent: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  loading: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    backgroundColor: '#000000a0',
    height: '100%',
  },
  modalContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#000000a0',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    padding: 40,
  },
  warn: {
    fontSize: 25,
    textAlign: 'justify',
    fontFamily: 'Poppins-Medium',
    marginVertical: 35,
  },
  changeBtn: {
    backgroundColor: 'rgba(106, 64, 41, 1)',
    marginBottom: 15,
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeBtnText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },
  cancelBtn: {
    marginBottom: 15,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(106, 64, 41, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    color: 'rgba(106, 64, 41, 1)',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },
  inputContainer: {
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 15,
  },
  matching: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  didntMatch: {
    backgroundColor: 'red',
    marginHorizontal: 15,
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
  },
  match: {
    backgroundColor: '#4eff21',
    marginHorizontal: 15,
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
  },
  errorMsg: {
    fontSize: 18,
    marginHorizontal: 20,
    fontFamily: 'Poppins-Medium',
    color: 'rgb(168, 50, 64)',
  },
  inputContent: {
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'grey',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputBtn: {
    backgroundColor: 'rgba(106, 64, 41, 1)',
    marginTop: 35,
    borderRadius: 20,
    alignItems: 'center',
    padding: 18,
    justifyContent: 'center',
  },
  inputBtn2: {
    backgroundColor: 'rgba(106, 64, 41, 1)',
    opacity: 0.8,
    marginTop: 35,
    borderRadius: 20,
    alignItems: 'center',
    padding: 18,
    justifyContent: 'center',
  },
  inputBtnText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {editPassword, errorDefault, authSignOut};

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword);
