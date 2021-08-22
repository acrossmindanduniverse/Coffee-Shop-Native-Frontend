import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {confirmPassword, errorDefault} from './../redux/actions/user';

const ConfirmPassword = props => {
  const {token} = props.auth.refreshToken;
  const {updateErrMsg, onToggle} = props.user;
  const [password, setPasssword] = useState({
    password: '',
  });

  const handleConfirmPassword = () => {
    props.confirmPassword(token, password);
  };

  useEffect(() => {
    if (onToggle) {
      props.errorDefault();
      props.navigation.navigate('editPassword');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onToggle]);

  return (
    <View>
      <View style={styles.inputParent}>
        <View style={styles.inputContainer}>
          <View>
            {updateErrMsg !== '' && (
              <Text style={styles.errorMsg}>{updateErrMsg}</Text>
            )}
          </View>
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
              placeholder="Enter Your Old Password"
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.inputBtn}
          onPress={handleConfirmPassword}>
          <Text style={styles.inputBtnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputParent: {
    marginVertical: 120,
    marginHorizontal: 60,
  },
  inputContainer: {
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 15,
  },
  errorMsg: {
    fontSize: 18,
    marginTop: 20,
    marginHorizontal: 20,
    fontFamily: 'Poppins-Medium',
    color: 'rgb(168, 50, 64)',
  },
  inputContent: {
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 80,
    borderWidth: 1,
    borderColor: 'grey',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  inputBtn: {
    backgroundColor: 'rgba(106, 64, 41, 1)',
    marginTop: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBtnText: {
    color: '#fff',
    marginVertical: 20,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {confirmPassword, errorDefault};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPassword);
