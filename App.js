import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, StyleSheet, View, Text, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetail from './src/screens/ProductDetail';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icons from 'react-native-vector-icons/FontAwesome';
import Cart from './src/screens/Cart';
import {Header} from './components/GoBack';
import AllMenu from './src/screens/AllMenu';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import Security from './src/screens/Security';
import DeliveryMethod from './src/screens/DeliveryMethod';
import Payment from './src/screens/Payment';
import Welcome from './src/screens/Welcome';
import History from './src/screens/History';
import HomeItemsGrid from './components/HomeItemsGrid';
import SearchItems from './components/SearchItems';
import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';
import Profile from './src/screens/Profile';
import EditProfile from './src/screens/EditProfile';
import {connect} from 'react-redux';
import UserHome from './components/UserHome';
import SignOut from './components/SignOut';
import Promo from './src/screens/Promo';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DashboardHeader = props => {
  return (
    <TouchableOpacity style={styles.barsContainer}>
      <Icons name="bars" style={styles.bars} />
      <TouchableOpacity onPress={() => props.navigation.navigaste('cart')}>
        <AntDesign name="shoppingcart" style={styles.bars} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const PictureSize = 130;

const ProfileStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        component={Profile}
        name="profile"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

const CartStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        component={Cart}
        name="cart"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={HomeScreen}
        name="home"
        options={{
          header: DashboardHeader,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

const AllMenuStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        component={AllMenu}
        name="allMenu"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

const PrivacyPolicyStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        component={PrivacyPolicy}
        name="privacyAndPolicy"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

const SecurityStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        component={Security}
        name="security"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

const PromoStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        component={Promo}
        name="promo"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};
const MainStack = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        component={HomeScreen}
        name="home"
        options={{
          header: DashboardHeader,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={Promo}
        name="promo"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={ProductDetail}
        name="detail"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={Payment}
        name="payment"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={EditProfile}
        name="editProfile"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={History}
        name="history"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={DeliveryMethod}
        name="deliveryMethod"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={HomeItemsGrid}
        name="items"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        component={SearchItems}
        name="searchItems"
        options={{
          header: Header,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Welcome}
        name="welcome"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={SignIn}
        name="signIn"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={SignUp}
        name="signUp"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerContent = props => {
  const menuItem = Object.keys(props.descriptors);
  const renderMenu = menuItem.map(
    item => props.descriptors[item].options.title,
  );
  console.log(props);
  return (
    <View style={drawerContent.parent}>
      <View style={styles.content}>
        <UserHome />
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
        <SignOut />
      </View>
    </View>
  );
};

const App = props => {
  const {info} = props.auth;
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{backgroundColor: 'transparent', width: 380}}
        drawerContent={DrawerContent}>
        {info !== null ? (
          <>
            <Drawer.Screen
              options={{title: 'Home'}}
              name="root"
              component={MainStack}
            />
            <Drawer.Screen
              options={{
                title: 'Profile',
                drawerIcon: () => (
                  <IonIcons
                    name="md-person-circle-outline"
                    size={20}
                    color={'#6A4029'}
                  />
                ),
              }}
              name="profile"
              component={ProfileStack}
            />
            <Drawer.Screen
              options={{
                title: 'Orders',
                drawerIcon: () => (
                  <AntDesign
                    name="shoppingcart"
                    size={30}
                    style={{width: 24}}
                    color={'#6A4029'}
                  />
                ),
              }}
              name="cart"
              component={CartStack}
            />
            <Drawer.Screen
              options={{title: 'Promo'}}
              name="promo"
              component={PromoStack}
            />
            <Drawer.Screen
              options={{
                title: 'All Menu',
                drawerIcon: () => (
                  <MaterialIcons
                    name="restaurant-menu"
                    size={20}
                    color={'#6A4029'}
                  />
                ),
              }}
              name="allMenu"
              component={AllMenuStack}
            />
            <Drawer.Screen
              options={{
                title: 'Privacy Policy',
                drawerIcon: () => (
                  <IonIcons
                    name="newspaper-outline privacy"
                    size={20}
                    color={'#6A4029'}
                  />
                ),
              }}
              name="privacyAndPolicy"
              component={PrivacyPolicyStack}
            />
            <Drawer.Screen
              options={{
                title: 'Security',
                drawerIcon: () => (
                  <MaterialIcons name="security" size={20} color={'#6A4029'} />
                ),
              }}
              name="security"
              component={SecurityStack}
            />
          </>
        ) : (
          <Drawer.Screen
            options={{title: 'Auth'}}
            name="auth"
            component={AuthStack}
          />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  barsContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bars: {
    color: '#6A4029',
    fontSize: 30,
  },
});

const drawerContent = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
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

export default connect(mapStateToProps)(App, DrawerContent);
