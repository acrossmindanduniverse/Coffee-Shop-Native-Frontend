import {Formik} from 'formik';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {signUpSchema} from '../../components/validationSchema';
import Icon from 'react-native-vector-icons/FontAwesome';
import image from '../../assets/sign-up.png';
import {connect} from 'react-redux';
import {authSignUp, errorDefault} from '../redux/actions/auth';

// useEffect(() => {

// }, []);

const SignUp = props => {
  console.log(props.auth);
  return (
    <View style={styles.parent}>
      <ImageBackground style={styles.image} source={image} resizeMode="cover">
        <ScrollView>
          <Text style={styles.signUp}>Sign Up</Text>
          <Formik
            style={styles.input}
            initialValues={{
              username: '',
              password: '',
              phone_number: '',
            }}
            validationSchema={signUpSchema}
            onSubmit={val => props.authSignUp(val)}>
            {({errors, handleChange, handleBlur, handleSubmit, values}) => (
              <View style={styles.signUpContainer}>
                <View>
                  <Text style={styles.errorMessage}>{errors.username}</Text>
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
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    height: '100%',
    flex: 1,
  },
  signUpContainer: {
    marginTop: 330,
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

const mapDispatchToProps = {authSignUp, errorDefault};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
