import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {navbtn, navbtnout, navbtnin, colors, btn1, hr80} from '../Global/style';
import BottomNav from '../Components/BottomNav';
import HeaderNav from '../Components/HeaderNav';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {onSnapshot} from 'firebase/firestore';

const TrackOrder = ({navigation}) => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const docRef = firestore()
        .collection('UserOrders')
        .where('orderuserid', '==', auth().currentUser.uid);

      console.log('docRef', docRef);
      docRef.onSnapshot(snapshot => {
        setOrders(snapshot.docs.map(doc => doc.data()));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const convertDate = date => {
    let newDate = new Date(date.seconds * 1000);
    return newDate.toDateString();
  };

  const cancelOrder = (orderitem)=> {
    const docRef = firestore()
    .collection('UserOrders')
    .doc(orderitem.orderid);

    docRef.update({
        orderstatus:'cancelled'
    })
    getOrders()

  };

  console.log('Orders', orders);
  return (
    <View style={styles.container}>
      <HeaderNav navigation={navigation} />
      <View style={styles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>

      <ScrollView style={styles.containerin}>
        <Text style={styles.head1}>Track Orders</Text>
        {orders
          .sort((a, b) => b.orderdate.seconds - a.ordersdate.seconds)
          .map((item, index) => {
            return (
              <View style={styles.order} key={index}>
                <Text style={styles.orderindex}>{index + 1}</Text>
                <Text style={styles.ordertxt2}>orderid :{item.orderid}</Text>
                <Text style={styles.ordertxt2}>
                  order date: {convertDate(item.orderdate)}
                </Text>
                {item.orderstatus == 'ontheway' && (
                  <Text style={styles.orderotw}>Your order is on the way</Text>
                )}
                {item.orderstatus == 'delivered' && (
                  <Text style={styles.orderdelivered}>Your order is delivered</Text>
                )}
                {item.orderstatus == 'cancelled' && (
                  <Text style={styles.ordercancelled}>Your order is cancelled</Text>
                )}
                {item.orderstatus == 'pending' && (
                  <Text style={styles.orderpending}>Your order is pending</Text>
                )}

                <View style={styles.row1}>
                  <Text style={styles.ordertxt1}>
                    Delivery Agent name & contact
                  </Text>
                  {item.deliveryboy_name ? (
                    <Text style={styles.ordertxt2}>
                      {item.deliveryboy_name}
                    </Text>
                  ) : (
                    <Text style={styles.ordertxt2}>Not Assigned</Text>
                  )}
                  {item.deliveryboy_phone ? (
                    <Text style={styles.ordertxt2}>
                      {item.deliveryboy_phone}
                    </Text>
                  ) : null}
                </View>

                <FlatList
                  style={styles.c1}
                  data={item.orderdata}
                  renderItem={({item}) => {
                    return (
                      <View style={styles.rowout}>
                        <View style={styles.row}>
                          <View style={styles.left}>
                            <Text style={styles.qty}>{item.FoodQuantity}</Text>
                            <Text style={styles.title}>
                              {item.data.foodName}
                            </Text>
                            <Text style={styles.price1}>
                              Rs {item.data.foodPrice}
                            </Text>
                          </View>
                          <View style={styles.right}>
                            <Text style={styles.totalprice}>
                              Rs 
                              {parseInt(item.FoodQuantity) *
                                parseInt(item.data.foodPrice)}
                            </Text>
                          </View>
                        </View>

                        
                          <View style={styles.row}>
                            <View style={styles.left}>
                              <Text style={styles.qty}>
                                {item.AddOnQuantity}
                              </Text>
                              <Text style={styles.title}>
                                {item.data.foodAddon}
                              </Text>
                              <Text style={styles.price1}>
                                Rs {item.data.foodAddonPrice}
                              </Text>
                            </View>
                            <View style={styles.right}>
                              <Text style={styles.totalprice}>
                                Rs
                                {parseInt(item.AddOnQuantity) *
                                  parseInt(item.data.foodAddonPrice)}
                              </Text>
                            </View>
                          </View>
                        
                      </View>
                    );
                  }}
                />

                <Text style={styles.total}>Total :Rs  {item.ordercost}</Text>
                {item.orderstatus == 'delivered' ? (
                  <Text style={styles.ordertxt3}>
                    Thank You for ordering with us
                  </Text>
                ) : null}

                {item.orderstatus == 'cancelled' ? (
                  <Text style={styles.ordertxt3}>
                    Sorry for the incovenience
                  </Text>
                ) : null}
                {item.orderstatus != 'cancelled' &&
                item.orderstatus != 'delivered' ? (
                  <TouchableOpacity
                    style={styles.cancelbtn}
                    onPress={() => cancelOrder(item)}>
                    <Text style={styles.cencelbtnin}>Cancel Order</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default TrackOrder;

const styles = StyleSheet.create({
  container: {
    // marginTop: 50,
    flex: 1,
    backgroundColor: colors.col1,
    // alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  bottomnav: {
    position: 'absolute',
    bottom: 0,
    zIndex: 20,
    backgroundColor: colors.col1,
    width: '100%',
  },
  containerin: {
    marginTop: 10,
    flex: 1,
    backgroundColor: colors.col1,
    // alignItems: 'center',
    width: '100%',
    height: '100%',
    marginBottom: 100,
  },
  head1: {
    fontSize: 30,
    color: colors.text1,
    textAlign: 'center',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  rowout: {
    flexDirection: 'column',
    margin: 10,
    elevation: 10,
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
  },
  row1: {
    flexDirection: 'column',
    margin: 10,
    elevation: 10,
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qty: {
    fontSize: 20,
    color: colors.text1,
    marginRight: 10,
  },
  title: {
    fontSize: 17,
    color: colors.text1,
    marginRight: 10,
  },
  price1: {
    fontSize: 17,
    color: colors.text1,
    marginRight: 10,
  },
  totalprice: {
    fontSize: 20,
    // color: colors.text1,
    marginRight: 10,
  },
  total: {
    fontSize: 20,
    color: colors.text3,
    textAlign: 'right',
    marginVertical: 10,
    marginRight: 20,
  },
  order: {
    margin: 10,
    elevation: 10,
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
  },
  ordertxt1: {
    fontSize: 20,
    color: colors.text1,
    textAlign: 'center',
    marginVertical: 10,
  },
  ordertxt2: {
    fontSize: 17,
    color: colors.text3,
    textAlign: 'center',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  orderindex: {
    fontSize: 20,
    color: colors.col1,
    backgroundColor: colors.text1,
    textAlign: 'center',
    borderRadius: 30,
    padding: 5,
    width: 30,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  ordertxt3: {
    fontSize: 17,
    color: colors.text3,
    textAlign: 'center',
    marginVertical: 5,
    borderColor: colors.text1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  cancelbtn: {
    backgroundColor: colors.text1,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: 'center',
  },
  cencelbtnin: {
    fontSize: 20,
    color: colors.col1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  orderstatus: {
    // fontSize: 20,
  },
  orderstatusin: {},
  orderotw: {
    fontSize: 20,
    backgroundColor: 'orange',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  orderdelivered: {
    fontSize: 20,
    backgroundColor: 'green',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  ordercancelled: {
    fontSize: 20,
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  orderpending: {
    fontSize: 20,
    backgroundColor: 'yellow',
    color: 'grey',
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
});
