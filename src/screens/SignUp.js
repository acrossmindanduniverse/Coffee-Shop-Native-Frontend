import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import image from '../../assets/sign-up.png';
import {connect} from 'react-redux';
import {authSignUp} from './../../redux/actions/auth';

const SignUp = props => {
  return (
    <View style={styles.parent}>
      <ImageBackground style={styles.image} source={image} resizeMode="cover">
        <Text style={styles.signUp}>Sign Up</Text>
        <Formik
          style={styles.input}
          initialValues={{
            username: '',
            password: '',
            resend_password: '',
            phone_number: '',
          }}
          onSubmit={values => props.authSignUp(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={styles.signUpContainer}>
              <View>
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
                  onChangeText={handleChange('resend_password')}
                  onBlur={handleBlur('resend_password')}
                  secureTextEntry={true}
                  placeholder="Resend Password"
                  placeholderTextColor="#fff"
                  value={values.resend_password}
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
                <TouchableOpacity
                  style={styles.googleSignUp}
                  onPress={handleSubmit}>
                  <Icon style={styles.googleIcon} name="google" />
                  <Text style={styles.googleSignUpText}>
                    Create With Google
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  image: {
    height: '100%',
  },
  signUpContainer: {
    marginTop: 260,
  },
  signUp: {
    fontSize: 70,
    marginTop: 180,
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#fff',
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

const mapDispatchToProps = {authSignUp};

export default connect(null, mapDispatchToProps)(SignUp);
