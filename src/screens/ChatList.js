import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {getUser} from '../redux/actions/user';
import {getChat, deleteChatRoom, defaultState} from './../redux/actions/chat';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {API_URL} from '@env';
import {io} from 'socket.io-client';
import PushNotification from 'react-native-push-notification';
import defaultPicture from '../../assets/defaultPicture.png';

const ChatList = props => {
  const {latest, deleteToggle} = props.chat;
  const {info} = props.auth;
  const latestReverse = latest.reverse();
  const {findUser} = props.user;
  const [modal, setModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteChat, setDeleteChat] = useState({
    recipient_id: '',
  });
  const timeFormat = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  const socket = io(`${API_URL}`);

  const showModal = visible => {
    setModal(visible);
  };

  const handleDeleteChat = () => {
    props.deleteChatRoom(props.auth.refreshToken.token, deleteChat);
    setDeleteChat({
      ...deleteChat,
      recipient_id: '',
    });
    setModal(false);
  };

  const handleSearch = () => {
    props.getUser(props.auth.refreshToken?.token, search).then(() => {
      setSearch('');
    });
  };

  const handleGoToRoom = data => {
    props.navigation.navigate('chatRoom', [
      data.item.id,
      data.item.picture,
      data.item.name,
    ]);
  };

  useEffect(() => {
    if (deleteToggle) {
      setSpinner(true);
    }
  }, [deleteToggle]);

  useEffect(() => {
    if (spinner) {
      setTimeout(() => {
        setSpinner(false);
        props.defaultState();
        // props.getChat(props.auth.refreshToken?.token);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinner]);

  useEffect(() => {
    socket.on(info.id, data => {
      props.getChat(props.auth.refreshToken.token);
      PushNotification.localNotification({
        channelId: 'general',
        title: `New message from: ${data.senderData.name}`,
        message: `${data.message}`,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(latest);

  useEffect(() => {
    props.getChat(props.auth.refreshToken.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.parent}>
      {spinner && (
        <View style={styles.loading}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              height: '100%',
              width: '100%',
              marginTop: 100,
              zIndex: 1,
            }}>
            <ActivityIndicator size="large" color="rgba(106, 64, 41, 1)" />
          </View>
        </View>
      )}
      <Modal
        visible={modal}
        style={styles.modal}
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => setModal(true)}>
        <View style={styles.modalParent}>
          <View style={styles.modalContainer}>
            <View style={styles.customTextContainer}>
              <Text style={styles.customText}>
                Are you sure want to delete this conversation?
              </Text>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={handleDeleteChat}
                style={styles.primaryBtn}
                activeOpacity={0.5}>
                <Text style={styles.secondaryText}>Ok</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => showModal(false)}
                activeOpacity={0.5}>
                <Text style={styles.secondaryText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{flex: 1}}>
        <View style={styles.firstContent}>
          <View style={styles.firstInside}>
            <View style={styles.inputContainer}>
              <Icon style={styles.icon} name="search1" />
              <TextInput
                value={search}
                onSubmitEditing={handleSearch}
                onChangeText={val => setSearch(val)}
                style={styles.input}
                placeholder="Search"
              />
            </View>
            <View style={styles.chooseChat}>
              <Text style={styles.primaryText}>
                Choose anyone you want to talk with
              </Text>
            </View>
            <FlatList
              data={findUser}
              horizontal
              renderItem={userData => (
                <TouchableOpacity
                  onPress={() => handleGoToRoom(userData)}
                  style={styles.userComp}>
                  {console.log(userData.item.picture, 'picture')}
                  {userData.item.picture === null ? (
                    <Image source={defaultPicture} style={styles.picture1st} />
                  ) : (
                    <Image
                      source={{uri: `${API_URL}${userData.item.picture}`}}
                      style={styles.picture1st}
                    />
                  )}
                  <Text style={styles.primaryText}>{userData.item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        {latest.length < 1 ? (
          <View style={styles.noConvoContainer}>
            <Text style={styles.noConvo}>You Have No Conversation Left</Text>
          </View>
        ) : (
          <View style={styles.secondContent}>
            <Text style={styles.messageHeader}>Message</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <FlatList
                data={latestReverse}
                renderItem={userData => (
                  <TouchableOpacity
                    onLongPress={() => {
                      showModal(true);
                      setDeleteChat({
                        ...deleteChat,
                        recipient_id: userData.item.id,
                      });
                    }}
                    onPress={() => handleGoToRoom(userData)}
                    style={styles.chatBox}>
                    {userData.item.picture === null ? (
                      <Image
                        source={defaultPicture}
                        style={styles.picture2nd}
                      />
                    ) : (
                      <Image
                        source={{uri: `${API_URL}${userData.item.picture}`}}
                        style={styles.picture2nd}
                      />
                    )}
                    <View style={styles.chatBoxContainer}>
                      <View style={styles.chatBoxContent1}>
                        <View
                          style={{
                            width: '75%',
                          }}>
                          <Text style={styles.name}>{userData.item.name}</Text>
                        </View>
                        <Text style={styles.time}>{`${new Date(
                          userData.item.created_at,
                        )
                          .toLocaleDateString('en-US', timeFormat)
                          .slice(0, 9)}`}</Text>
                      </View>
                      <Text style={styles.lastChat}>
                        {userData.item.message}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={idx => idx}
              />
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    backgroundColor: '#000000a0',
    height: '100%',
  },
  modalParent: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#000000a0',
    height: '100%',
  },
  modal: {
    position: 'absolute',
    backgroundColor: 'grey',
  },
  modalContainer: {
    backgroundColor: '#fff',
    elevation: 3,
    marginHorizontal: 60,
    marginVertical: 200,
    borderRadius: 20,
  },
  customTextContainer: {
    backgroundColor: 'rgba(106, 64, 41, 1)',
    justifyContent: 'center',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    height: 80,
  },
  customText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginVertical: 70,
    top: 20,
    marginHorizontal: 90,
  },
  firstContent: {
    borderBottomWidth: 4,
    borderBottomColor: '#EFEEEE',
  },
  noConvoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noConvo: {
    marginVertical: 250,
    fontFamily: 'Poppins-Light',
    color: '#9A9A9D',
    fontSize: 20,
  },
  secondContent: {
    flex: 1,
  },
  chatBoxContainer: {
    marginBottom: 30,
  },
  firstInside: {
    marginHorizontal: 85,
  },
  messageHeader: {
    fontSize: 30,
    marginHorizontal: 90,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    marginVertical: 30,
  },
  userComp: {
    justifyContent: 'center',
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  chatBox: {
    justifyContent: 'center',
    marginBottom: 20,
    marginHorizontal: 140,
    flexDirection: 'row',
  },
  chatBoxContent1: {
    flexDirection: 'row',
    marginLeft: 30,
    justifyContent: 'space-between',
  },
  chooseChat: {
    marginVertical: 40,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  time: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#9A9A9D',
  },
  picture1st: {
    width: 90,
    height: 90,
    marginBottom: 15,
    borderRadius: 90 / 2,
    resizeMode: 'cover',
    backgroundColor: 'grey',
  },
  picture2nd: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    resizeMode: 'cover',
    backgroundColor: 'grey',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 20,
    backgroundColor: '#EFEEEE',
    borderRadius: 30,
    alignItems: 'center',
  },
  primaryBtn: {
    width: 100,
    alignItems: 'center',
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
  },
  secondaryText: {
    color: 'rgba(106, 64, 41, 1)',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  primaryText: {
    fontFamily: 'Poppins-Light',
    fontSize: 18,
  },
  lastChat: {
    marginLeft: 30,
    fontFamily: 'Poppins-Light',
    fontSize: 18,
  },
  input: {
    fontSize: 25,
    marginTop: 10,
    width: '80%',
    fontFamily: 'Poppins-Light',
  },
  icon: {
    marginHorizontal: 20,
    fontSize: 25,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  chat: state.chat,
});

const mapDispatchToProps = {getChat, deleteChatRoom, getUser, defaultState};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
