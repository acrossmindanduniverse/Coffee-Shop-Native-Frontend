import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import NoOrderBg from '../assets/Group-66.png';

const NoOrder = props => {
  return (
    <View style={styles.parent}>
      <ScrollView style={styles.firstContent}>
        <View style={styles.bgContainer}>
          <Image source={NoOrderBg} style={styles.NoOrderBg} />
          <View>
            <Text style={styles.noOrderText}>No orders yet</Text>
            <Text style={styles.hitBtn}>
              Hit the brown button down below to create an order
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnOrder}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('home')}
          style={styles.btn}>
          <Text style={styles.orderText}>Start ordering</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  firstContent: {
    top: 230,
    height: '100%',
  },
  bgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrderText: {
    fontWeight: 'bold',
    marginTop: 38,
    textAlign: 'center',
    fontSize: 40,
  },
  hitBtn: {
    fontSize: 25,
    textAlign: 'center',
  },
  btn: {
    height: 70,
    backgroundColor: '#6A4029',
    borderRadius: 20,
    marginHorizontal: 50,
    justifyContent: 'center',
    marginBottom: 41,
  },
  orderText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NoOrder;
