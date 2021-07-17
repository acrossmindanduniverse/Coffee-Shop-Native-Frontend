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
  const {refreshToken, userData} = props.auth.info;
  const [modal, setModal] = useState(false);
  const {allTransactions} = props.items;

  const showModal = visible => {
    setModal(visible);
  };

  console.log(allTransactions.length, 'items');

  const handleDelete = () => {
    props
      .deleteTransactionHistory(refreshToken, allTransactions[0].id)
      .then(() => {
        setModal(false);
        props.getAllTransactions(refreshToken, userData.id);
      });
  };

  useEffect(() => {
    props.getAllTransactions(refreshToken, userData.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.parent}>
      <Modal
        visible={modal}
        style={styles.modal}
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => {
          setModal(true);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.customTextContainer}>
            <Text style={styles.customText}>Are you sure want to delete?</Text>
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
      </Modal>
      {allTransactions.length > 0 ? (
        <View>
          <Text style={styles.orderHistory}>Order History</Text>
          <View>
            <View style={styles.itemHistoryContent}>
              <View style={styles.swipeContainer}>
                <MaterialIcons style={styles.icon} name="gesture-swipe-left" />
                <Text style={styles.swipeText}>swipe item to delete</Text>
              </View>
              <ScrollView style={styles.itemHistoryContainer}>
                <SwipeListView
                  style={styles.historyWrapper}
                  data={allTransactions}
                  renderItem={(data, rowMap) => {
                    console.log(data.item.code);
                    return (
                      <View style={styles.history}>
                        <View style={styles.itemImageContainer}>
                          <Image style={styles.itemImage} />
                        </View>
                        <View>
                          <Text style={styles.itemName}>{data.item.code}</Text>
                          <Text style={styles.itemInfo}>
                            IDR {data.item.total}
                          </Text>
                          <Text style={styles.deliveryInfo}>
                            {data.item.payment_method}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                  renderHiddenItem={(data, rowMap) => (
                    <TouchableOpacity
                      onPress={() => showModal(true)}
                      style={styles.trashCan}>
                      <EvillCons style={styles.trashIcon} name="trash" />
                    </TouchableOpacity>
                  )}
                  rightOpenValue={-120}
                />
              </ScrollView>
            </View>
          </View>
        </View>
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
  parent: {
    marginVertical: 90,
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
    fontSize: 34,
    marginLeft: 50,
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
  itemHistoryContainer: {
    marginVertical: 20,
  },
  history: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 110,
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
    marginLeft: 400,
    marginTop: 50,
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
