import React from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvillCons from 'react-native-vector-icons/EvilIcons';
// trash #6A4029;
const History = () => {
  return (
    <View style={styles.parent}>
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
              data={Array(10)
                .fill('')
                .map((_, i) => ({key: `${i}`, text: `item #${i}`}))}
              renderItem={(data, rowMap) => (
                <View style={styles.history}>
                  <View style={styles.itemImageContainer}>
                    <Image style={styles.itemImage} />
                  </View>
                  <View>
                    <Text style={styles.itemName}>Veggie Tomato Mix</Text>
                    <Text style={styles.itemInfo}>IDR 000</Text>
                    <Text style={styles.deliveryInfo}>Delivery info</Text>
                  </View>
                </View>
              )}
              renderHiddenItem={(data, rowMap) => (
                <View style={styles.trashCan}>
                  <EvillCons style={styles.trashIcon} name="trash" />
                </View>
              )}
              rightOpenValue={-120}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    marginVertical: 90,
  },
  orderHistory: {
    fontWeight: 'bold',
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

export default History;
