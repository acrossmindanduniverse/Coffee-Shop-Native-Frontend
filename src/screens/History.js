/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvillCons from 'react-native-vector-icons/EvilIcons';
import {deleteTransactionHistory} from '../redux/actions/cart';
import {connect} from 'react-redux';
import {getAllTransactions} from '../redux/actions/items';
const History = props => {
  const {refreshToken, info} = props.auth;
  const [modal, setModal] = useState(false);
  const [saveItemToDelete, setSaveItemToDelete] = useState();
  const {allTransactions} = props.items;

  const showModal = visible => {
    setModal(visible);
  };

  const handleDelete = () => {
    props
      .deleteTransactionHistory(refreshToken.token, saveItemToDelete)
      .then(() => {
        setModal(false);
        props.getAllTransactions(refreshToken.token, info.id);
      });
  };

  useEffect(() => {
    props.getAllTransactions(refreshToken.token, info.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.parent}>
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
                Are you sure want to delete?
              </Text>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={handleDelete}
                activeOpacity={0.5}>
                <Text style={styles.primaryText}>Ok</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => showModal(false)}
                activeOpacity={0.5}>
                <Text style={styles.primaryText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {allTransactions.length > 0 ? (
        <ScrollView>
          <Text style={styles.orderHistory}>Order History</Text>
          <View>
            <View style={styles.itemHistoryContent}>
              <View style={styles.swipeContainer}>
                <MaterialIcons style={styles.icon} name="gesture-swipe-left" />
                <Text style={styles.swipeText}>swipe item to delete</Text>
              </View>
              <SwipeListView
                data={allTransactions}
                renderItem={(data, _rowMap) => {
                  return (
                    <View
                      onTouchMove={() => setSaveItemToDelete(data.item.id)}
                      style={styles.history}>
                      <View style={styles.itemImageContainer}>
                        <Image style={styles.itemImage} />
                      </View>
                      <View style={{width: '50%'}}>
                        <Text style={styles.itemName}>{data.item.code}</Text>
                        <Text style={styles.itemInfo}>
                          IDR {Number(data.item.total).toLocaleString('ind')}
                        </Text>
                        <Text style={styles.deliveryInfo}>
                          {String(data.item.payment_method).toUpperCase()}
                        </Text>
                      </View>
                    </View>
                  );
                }}
                renderHiddenItem={() => (
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      padding: 40,
                    }}>
                    <TouchableOpacity
                      onPress={() => showModal(true)}
                      style={styles.trashCan}>
                      <EvillCons style={styles.trashIcon} name="trash" />
                    </TouchableOpacity>
                  </View>
                )}
                rightOpenValue={-120}
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.noTransactionsContainer}>
          <Text style={styles.noTransactions}>No transactions yet</Text>
          <TouchableOpacity
            style={styles.buySomethingBtn}
            onPress={() => props.navigation.navigate('home')}>
            <Text style={styles.buySomethingText}>Buy something</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // parent: {
  //   flex: 1,
  // },
  modalParent: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#000000a0',
    padding: 65,
    paddingVertical: 100,
    height: '100%',
  },
  modal: {
    position: 'absolute',
    backgroundColor: 'grey',
  },
  modalContainer: {
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 20,
  },
  customTextContainer: {
    backgroundColor: 'rgba(106, 64, 41, 1)',
    justifyContent: 'center',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    padding: 20,
  },
  customText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  btnContainer: {
    flexDirection: 'row',
    paddingVertical: 70,
    paddingHorizontal: 4,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  primaryBtn: {
    width: 100,
    alignItems: 'center',
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
  },
  primaryText: {
    color: 'rgba(106, 64, 41, 1)',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  orderHistory: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: 34,
  },
  itemHistoryContent: {
    margin: 50,
  },
  swipeContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    fontSize: 25,
    marginHorizontal: 4,
  },
  swipeText: {
    fontSize: 20,
  },
  // itemHistoryContainer: {
  //   marginVertical: 20,
  // },
  history: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 17,
  },
  itemImageContainer: {
    marginHorizontal: 20,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: 'grey',
  },
  itemName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  itemInfo: {
    fontSize: 15,
    color: 'rgba(106, 64, 41, 1)',
  },
  deliveryInfo: {
    fontSize: 13,
    color: 'rgba(106, 64, 41, 1)',
  },
  noTransactionsContainer: {
    marginVertical: 170,
  },
  noTransactions: {
    fontSize: 50,
    marginVertical: 120,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.4)',
    fontFamily: 'Poppins-Bold',
  },
  buySomethingBtn: {
    height: 70,
    marginHorizontal: 50,
    borderRadius: 15,
    backgroundColor: 'rgba(106, 64, 41, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buySomethingText: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Poppins-Medium',
  },
  trashCan: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45 / 2,
    backgroundColor: '#6A4029',
  },
  trashIcon: {
    color: '#fff',
    fontSize: 30,
  },
});

const mapStateToProps = state => ({
  items: state.items,
  auth: state.auth,
});

const mapDispatchToProps = {deleteTransactionHistory, getAllTransactions};

export default connect(mapStateToProps, mapDispatchToProps)(History);
