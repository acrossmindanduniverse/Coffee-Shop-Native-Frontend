import {Formik} from 'formik';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {signUpSchema} from '../../components/validationSchema';
import Icon from 'react-native-vector-icons/FontAwesome';
import image from '../../assets/sign-up.png';
import {connect} from 'react-redux';
import {authSignUp, errorDefault, toggleAuth} from '../redux/actions/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SignUp = props => {
  const [customAlert, setCustomAlert] = useState(false);
  const {signUpErrMsg, onToggle} = props.auth;
  const [spinner, setSpinner] = useState(false);
  const errorMsg = 'username unavailable, please input another one';

  const handleSignUp = data => {
    props.authSignUp(data);
  };

  useEffect(() => {
    if (onToggle) {
      props.errorDefault();
      setSpinner(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onToggle]);

  useEffect(() => {
    if (spinner) {
      setTimeout(() => {
        setSpinner(false);
      }, 2000);
      setTimeout(() => {
        setCustomAlert(true);
      }, 2000);
    }
  }, [spinner, customAlert]);

  useEffect(() => {
    if (customAlert) {
      setTimeout(() => {
        setCustomAlert(false);
        props.navigation.navigate('signIn');
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customAlert]);

  return (
    <View style={styles.parent}>
      <ImageBackground style={styles.image} source={image} resizeMode="cover">
        {spinner && (
          <View style={styles.customAlertContainer}>
            <View marginTop={25}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          </View>
        )}
        {customAlert && (
          <View style={styles.customAlertContainer}>
            <View style={styles.successContainer}>
              <AntDesign name="checkcircleo" style={styles.succesText} />
              <Text style={styles.succesText}>Sign Up Success</Text>
            </View>
          </View>
        )}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUp}>Sign Up</Text>
          {signUpErrMsg === errorMsg && (
            <Text style={styles.errorMessage}>{errorMsg}</Text>
          )}
          <Formik
            style={styles.input}
            initialValues={{
              username: '',
              password: '',
              phone_number: '',
            }}
            validationSchema={signUpSchema}
            onSubmit={val => handleSignUp(val)}>
            {({errors, handleChange, handleBlur, handleSubmit, values}) => (
              <View style={styles.formContent}>
                <View>
                  <Text style={styles.errorMessage}>{errors.username}</Text>
                  <Text style={styles.errorMessage}>{errors.password}</Text>
                  <TextInput
                    style={styles.signUpForm}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    placeholder="Email Address"
                    placeholderTextColor="#fff"
                    value={values.username}
                  />
                  <TextInput
                    style={styles.signUpForm}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry={true}
                    placeholder="Password"
                    placeholderTextColor="#fff"
                    value={values.password}
                  />
                  <TextInput
                    style={styles.signUpForm}
                    onChangeText={handleChange('phone_number')}
                    onBlur={handleBlur('phone_number')}
                    placeholder="Phone Number"
                    placeholderTextColor="#fff"
                    value={values.phone_number}
                  />
                </View>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={styles.signUpBtn}
                    onPress={handleSubmit}>
                    <Text style={styles.signUpText}>Create Account</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.googleSignUp}>
                    <Icon style={styles.googleIcon} name="google" />
                    <Text style={styles.googleSignUpText}>
                      Create With Google
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
  },
  customAlertContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    backgroundColor: '#000000a0',
    height: '100%',
  },
  successContainer: {
    backgroundColor: '#6A4029',
    alignItems: 'center',
    marginTop: 25,
    marginHorizontal: 30,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 25,
  },
  succesText: {
    fontFamily: 'Poppins-Bold',
    marginHorizontal: 5,
    fontSize: 18,
    marginVertical: 20,
    color: '#fff',
  },
  image: {
    height: '100%',
  },
  signUpContainer: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  formContent: {
    marginBottom: 180,
  },
  signUp: {
    fontSize: 70,
    marginTop: 180,
    textAlign: 'center',
    fontStyle: 'normal',
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  errorMessage: {
    fontSize: 20,
    color: 'red',
    marginHorizontal: 31,
  },
  signUpForm: {
    borderBottomWidth: 1,
    height: 65,
    marginHorizontal: 31,
    borderBottomColor: 'grey',
    fontSize: 20,
    color: '#fff',
  },
  btnContainer: {
    marginHorizontal: 31,
    flex: 1,
    marginTop: 40,
  },
  signUpBtn: {
    backgroundColor: '#6A4029',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    borderRadius: 20,
  },
  googleSignUp: {
    backgroundColor: '#fff',
    marginTop: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    borderRadius: 20,
  },
  signUpText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  googleSignUpText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#6A4029',
  },
  googleIcon: {
    fontSize: 20,
    color: '#000',
    marginRight: 15,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {authSignUp, errorDefault, toggleAuth};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
