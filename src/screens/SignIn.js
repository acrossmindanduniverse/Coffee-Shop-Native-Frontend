/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import signInImg from '../../assets/sign-in.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import {authSignIn, errorDefault} from '../redux/actions/auth';

const SignIn = props => {
  const {info, errMsg} = props.auth;
  useEffect(() => {
    if (info !== null) {
      props.navigation.navigate('home');
    }
  }, []);

  useEffect(() => {
    if (errMsg !== '') {
      props.errorDefault();
    }
  }, [errMsg]);

  console.log(props.auth);

  return (
    <View style={styles.parent}>
      <ImageBackground
        style={styles.image}
        source={signInImg}
        resizeMode="cover">
        <ScrollView>
          <Text style={styles.errorMessage}>{props.auth.errMsg}</Text>
          <Text style={styles.signIn}>Sign In</Text>
          <Formik
            style={styles.input}
            initialValues={{
              username: '',
              password: '',
            }}
            onSubmit={values => props.authSignIn(values)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View style={styles.signInContainer}>
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
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
  },
  image: {
    height: '100%',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    fontSize: 20,
  },
  signInContainer: {
    marginTop: 260,
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
