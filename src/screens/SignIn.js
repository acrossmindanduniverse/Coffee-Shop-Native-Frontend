/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import signInImg from '../../assets/sign-in.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import {authSignIn, errorDefault} from '../redux/actions/auth';

const SignIn = props => {
  const {errMsg, onAuth} = props.auth;

  const handleSignIn = data => {
    props.authSignIn(data);
  };

  useEffect(() => {
    if (onAuth) {
      props.errorDefault();
    }
  }, [onAuth]);

  return (
    <View style={styles.parent}>
      <ImageBackground
        style={styles.image}
        source={signInImg}
        resizeMode="cover">
        <View style={styles.signInContainer}>
          <Text style={styles.signIn}>Sign In</Text>
          <Formik
            style={styles.input}
            initialValues={{
              username: '',
              password: '',
            }}
            onSubmit={values => handleSignIn(values)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View style={styles.formContent}>
                {errMsg !== '' && (
                  <View style={styles.errorMessageContainer}>
                    <Text style={styles.errorMessage}>{errMsg}</Text>
                  </View>
                )}
                <View>
                  <TextInput
                    style={styles.signInForm}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    placeholder="Email Address"
                    placeholderTextColor="#fff"
                    value={values.username}
                  />
                  <TextInput
                    style={styles.signInForm}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry={true}
                    placeholder="Password"
                    placeholderTextColor="#fff"
                    value={values.password}
                  />
                </View>
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={styles.signInBtn}
                    onPress={handleSubmit}>
                    <Text style={styles.signInText}>Sign In</Text>
                  </TouchableOpacity>
                  <View style={styles.signInOptionContainer}>
                    <View style={styles.sideBorder} />
                    <Text style={styles.signInOption}>or sign in with</Text>
                    <View style={styles.sideBorder} />
                  </View>
                  <TouchableOpacity
                    style={styles.googleSignIn}
                    onPress={handleSubmit}>
                    <Icon style={styles.googleIcon} name="google" />
                    <Text style={styles.googleSignInText}>
                      Sign In With Google
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
  image: {
    height: '100%',
  },
  errorMessageContainer: {
    backgroundColor: '#fff',
    borderRadius: 25,
    marginHorizontal: 50,
  },
  errorMessage: {
    color: 'red',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginVertical: 18,
    fontSize: 20,
  },
  signInContainer: {
    justifyContent: 'flex-end',
    height: '100%',
  },
  formContent: {
    marginBottom: 30,
  },
  signIn: {
    fontSize: 70,
    marginTop: 180,
    marginLeft: 31,
    bottom: 78,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#fff',
  },
  signInForm: {
    borderBottomWidth: 1,
    height: 65,
    marginHorizontal: 31,
    borderBottomColor: '#fff',
    fontSize: 20,
    color: '#fff',
  },
  btnContainer: {
    marginHorizontal: 31,
    marginTop: 40,
  },
  signInBtn: {
    backgroundColor: '#FFBA33',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    borderRadius: 20,
  },
  googleSignIn: {
    backgroundColor: '#fff',
    marginTop: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    borderRadius: 20,
  },
  signInText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
  },
  googleSignInText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#6A4029',
  },
  googleIcon: {
    fontSize: 20,
    color: '#000',
    marginRight: 15,
  },
  sideBorder: {
    marginHorizontal: 10,
    flex: 1,
    height: 1,
    backgroundColor: '#fff',
  },
  forgotPassword: {
    marginLeft: 31,
    marginTop: 23,
  },
  forgotPasswordText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signInOptionContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  signInOption: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {authSignIn, errorDefault};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
