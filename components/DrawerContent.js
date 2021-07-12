import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const DrawerContent = props => {
  const {userData} = props.auth.info;
  const menuItem = Object.keys(props.descriptors);
  const renderMenu = menuItem.map(
    item => props.descriptors[item].options.title,
  );
  console.log(menuItem[0].split('-')[0]);
  return (
    <View style={drawerContent.parent}>
      <View style={drawerContent.profileInfo}>
        <Image style={drawerContent.profilePicture} />
        <View style={drawerContent.userInfo}>
          <Text style={drawerContent.userName}>{userData.name}</Text>
          <Text style={drawerContent.userEmail}>{userData.username}</Text>
        </View>
      </View>
      <FlatList
        style={drawerContent.menu}
        data={renderMenu}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate(menuItem[index].split('-')[0])
            }>
            <Text style={drawerContent.menuItem}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => String(index)}
        ItemSeparatorComponent={() => (
          <View style={drawerContent.menuSeparator} />
        )}
      />
      <View style={drawerContent.menu}>
        <TouchableOpacity>
          <Text style={drawerContent.menuItem}>Sign-Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PictureSize = 130;
const drawerContent = StyleSheet.create({
  parent: {
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    flex: 1,
  },
  userName: {
    color: '#fff',
    fontSize: 25,
  },
  userEmail: {
    color: '#fff',
    fontSize: 17,
  },
  userInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  profileInfo: {
    height: 320,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A4029',
  },
  profilePicture: {
    width: PictureSize,
    height: PictureSize,
    backgroundColor: 'white',
    borderRadius: PictureSize / 2,
  },
  menu: {
    margin: 40,
  },
  menuItem: {
    color: '#6A4029',
    fontWeight: '600',
    fontSize: 25,
  },
  menuSeparator: {
    borderBottomWidth: 2,
    marginVertical: 20,
    borderBottomColor: 'grey',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(DrawerContent);
