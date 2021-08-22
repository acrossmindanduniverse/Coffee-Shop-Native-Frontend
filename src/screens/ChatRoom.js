import React, {useEffect, useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getChatRoom, sendChat, getChat} from './../redux/actions/chat';
import {connect} from 'react-redux';
import {RoomChatHeader} from './../../components/GoBack';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import defaultPicture from '../../assets/defaultPicture.png';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {io} from 'socket.io-client';
import {API_URL} from '@env';

const ChatRoom = props => {
  const {config, fs} = RNFetchBlob;
  const {room, send, latest} = props.chat;
  const {info} = props.auth;
  const {user} = props.user;
  const newRoute = props.route.params;
  const scrollViewRef = useRef();
  const [chat, setChat] = useState({
    message: '',
    file: '',
    recipient_id: newRoute[0],
  });
  const timeFormat = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  const socket = io(`${API_URL}`);

  useEffect(() => {
    socket.on(info.id, data => {
      props.getChatRoom(props.auth.refreshToken.token, data.sender);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setChat({
        ...chat,
        file: res[0],
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
      }
    }
  };

  const handleDownload = (type, file) => {
    const {DownloadDir} = fs.dirs;
    const date = new Date();
    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: `${DownloadDir}/me_${Math.floor(
          date.getTime() + date.getSeconds() / 2,
        )}.${type}`,
      },
    };
    config(options)
      .fetch('GET', `${API_URL}${file}`)
      .then(res => {
        console.log(res, 'result');
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    props.getChatRoom(props.auth.refreshToken?.token, newRoute[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [send, latest]);

  const handleSendChat = () => {
    setChat({
      ...chat,
      message: '',
      file: '',
      recipient_id: newRoute[0],
    });
    props
      .sendChat(props.auth.refreshToken?.token, chat)
      .then(() => {
        props.getChatRoom(props.auth.refreshToken?.token, newRoute[0]);
        props.getChat(props.auth.refreshToken?.token);
      })
      .catch(err => {
        console.log(err);
      });
  };

  console.log(chat, 'chat data');

  const handleScrollView = () => {
    scrollViewRef.current.scrollToEnd({animated: true});
  };

  return (
    <View style={styles.parent}>
      <RoomChatHeader
        user={newRoute[2]}
        picture={
          newRoute[0] !== null
            ? {uri: `${API_URL}${newRoute[1]}`}
            : defaultPicture
        }
      />
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={handleScrollView}
        showsVerticalScrollIndicator={false}
        style={{marginVertical: 50, marginBottom: 20}}>
        <FlatList
          data={room}
          renderItem={userData => {
            return userData.item.sender_id !== info.id.toString() ? (
              <View style={styles.anotherUser}>
                {console.log(userData.item.picture, 'user picture')}
                {userData.item.picture === undefined ? (
                  <Image source={defaultPicture} style={styles.userPicture} />
                ) : (
                  <Image
                    source={{uri: `${API_URL}${userData.item.picture}`}}
                    style={styles.userPicture}
                  />
                )}
                <View>
                  {userData.item.file !== null && (
                    <View>
                      {userData.item.file.slice(19) === '.jpg' ||
                      userData.item.file.slice(19) === '.png' ||
                      userData.item.file.slice(19) === '.img' ? (
                        <View style={{flexDirection: 'row'}}>
                          <Image
                            source={{uri: `${API_URL}${userData.item.file}`}}
                            style={styles.file}
                          />
                          <TouchableOpacity
                            onPress={() =>
                              handleDownload(
                                userData.item.file.slice(20),
                                userData.item.file,
                              )
                            }
                            style={styles.downloadIconContainer}>
                            <AntDesign
                              name="download"
                              style={styles.downloadIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View style={styles.fileNonImg}>
                          <Text style={styles.fileType}>
                            {userData.item.file.slice(20)}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              handleDownload(
                                userData.item.file.slice(20),
                                userData.item.file,
                              )
                            }
                            style={styles.downloadIconContainer}>
                            <AntDesign
                              name="download"
                              style={styles.downloadIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  )}
                  <View style={styles.anotherUserContent}>
                    <Text style={styles.anotherUserChat}>
                      {userData.item.message}
                    </Text>
                  </View>
                  <View style={styles.timeContainer1}>
                    <Text style={styles.time}>{`${new Date(
                      userData.item.created_at,
                    )
                      .toLocaleDateString('en-US', timeFormat)
                      .slice(10)}`}</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.singedUser}>
                <View>
                  <View style={styles.singedUserContent}>
                    {userData.item.file !== null && (
                      <View
                        style={{
                          alignItems: 'flex-end',
                          marginBottom: 14,
                        }}>
                        {userData.item.file.slice(19) === '.jpg' ||
                        userData.item.file.slice(19) === '.png' ||
                        userData.item.file.slice(19) === '.img' ? (
                          <View>
                            <Image
                              source={{uri: `${API_URL}${userData.item.file}`}}
                              style={styles.file}
                            />
                          </View>
                        ) : (
                          <View style={styles.fileNonImg}>
                            <Text>{userData.item.file.slice(20)}</Text>
                          </View>
                        )}
                      </View>
                    )}
                    <View
                      style={{
                        borderRadius: 20,
                        borderWidth: 1,
                        marginLeft: 30,
                        backgroundColor: '#fff',
                      }}>
                      <Text style={styles.singedUserChat}>
                        {userData.item.message}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.timeContainer2}>
                    <Text style={styles.time}>{`${new Date(
                      userData.item.created_at,
                    )
                      .toLocaleDateString('en-US', timeFormat)
                      .slice(10)}`}</Text>
                  </View>
                </View>
                {userData.item.picture === undefined ? (
                  <Image source={defaultPicture} style={styles.userPicture} />
                ) : (
                  <Image
                    source={{uri: `${API_URL}${user[0].picture}`}}
                    style={styles.userPicture}
                  />
                )}
              </View>
            );
          }}
          keyExtractor={idx => String(idx)}
        />
      </ScrollView>
      {chat.file !== '' && (
        <View style={styles.sendFileContainer}>
          <Text style={styles.sendFileText}>Send File</Text>
          <TouchableOpacity
            onPress={() =>
              setChat({
                ...chat,
                file: '',
              })
            }>
            <Ionicons style={styles.cancelIcon} name="trash-outline" />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          value={chat.message}
          onPressOut={handleScrollView}
          onSubmitEditing={handleSendChat}
          onChangeText={e =>
            setChat({
              ...chat,
              message: e,
            })
          }
          placeholder="Type a message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={() => handleSendDocument()}>
          <Ionicons style={styles.icon} name="md-paper-plane-sharp" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopColor: '#EFEEEE',
    borderTopWidth: 3,
  },
  timeContainer1: {
    alignItems: 'flex-end',
  },
  time: {
    fontFamily: 'Poppins-Light',
    color: '#b5b5b5',
    marginHorizontal: 10,
    marginVertical: 20,
    fontSize: 18,
  },
  file: {
    width: 70,
    height: 70,
    borderRadius: 18,
    resizeMode: 'cover',
  },
  fileNonImg: {
    width: 70,
    height: 70,
    borderRadius: 18,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEEEE',
  },
  fileType: {
    fontFamily: 'Poppins-Light',
    fontSize: 15,
  },
  downloadIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadIcon: {
    color: '#000',
    fontSize: 30,
  },
  userPicture: {
    marginHorizontal: 15,
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    resizeMode: 'cover',
    backgroundColor: 'grey',
  },
  anotherUser: {
    marginHorizontal: 70,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  anotherUserContent: {
    borderRadius: 20,
    marginRight: 30,
    backgroundColor: '#6A4029',
  },
  anotherUserChat: {
    fontFamily: 'Poppins-Light',
    color: '#fff',
    fontSize: 18,
    margin: 17,
  },
  singedUser: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginHorizontal: 70,
  },
  // singedUserContent: {
  //   marginLeft: 30,
  // },
  singedUserChat: {
    fontFamily: 'Poppins-Light',
    fontSize: 18,
    margin: 17,
  },
  inputContainer: {
    flexDirection: 'row',
    marginHorizontal: 70,
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 50,
    backgroundColor: '#EFEEEE',
    borderRadius: 30,
    alignItems: 'center',
  },
  sendFileContainer: {
    flexDirection: 'row',
    marginHorizontal: 70,
    padding: 4,
  },
  sendFileText: {
    fontSize: 18,
    fontFamily: 'Poppins-Light',
  },
  cancelIcon: {
    fontSize: 23,
    marginLeft: 15,
  },
  input: {
    fontSize: 25,
    marginLeft: 20,
    marginTop: 10,
    width: '80%',
    fontFamily: 'Poppins-Light',
  },
  icon: {
    marginRight: 20,
    fontSize: 25,
    color: 'grey',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  chat: state.chat,
});

const mapDispatchToProps = {getChatRoom, sendChat, getChat};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
