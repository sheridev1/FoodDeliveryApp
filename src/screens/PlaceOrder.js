import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
  
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {navbtn, navbtnout, navbtnin, colors, btn1, hr80} from '../Global/style';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const PlaceOrder = ({navigation, route}) => {
  const {cartData} = route.params;
  const [orderdata, setOrderData] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  
  

  useEffect(() => {
   // console.log(cartData)
   setOrderData(JSON.parse(cartData));
    
  }, [cartData]);



  // userdata -------------------------------------------------------
  const [userloggeduid, setUserloggeduid] = useState(null);
  const [userData, setUserdata] = useState(null);
  useEffect(() => {
      const checklogin = () => {
          auth().onAuthStateChanged((user) => {
              // console.log(user);
              if (user) {
                  // navigation.navigate('home');
                  setUserloggeduid(user.uid);
              } else {
                  // No user is signed in.
                  console.log('no user');
              }
          });
      }
      checklogin();
  }, [])


  useEffect(() => {
    const getuserdata = async () => {
        const docRef = firestore().collection('UserData').where('uid', '==', userloggeduid)
        const doc = await docRef.get();
        if (!doc.empty) {
            doc.forEach((doc) => {
                setUserdata(doc.data());
            })
        }
        else {
            console.log('no user data');
        }
    }
    getuserdata();
}, [userloggeduid]);


  useEffect(() => {
    if (cartData != null) {
      const food = JSON.parse(cartData).cart;

      let totalFoodPrice = 0;
      food.map(item => {
        totalFoodPrice =
          parseInt(item.data.foodPrice) * parseInt(item.FoodQuantity) +
          parseInt(item.data.foodAddonPrice) * parseInt(item.AddOnQuantity) +
          parseInt(totalFoodPrice);
      });

      setTotalCost(JSON.stringify(totalFoodPrice));
    }
  }, [cartData]);

  const clearCart = () => {
    const docRef = firestore()
      .collection('UserCart')
      .doc(auth().currentUser.uid);

    docRef
      .update({
        cart: firestore.FieldValue.delete(), // Delete the 'cart' field
      })
      .then(() => {
        console.log('Cart cleared');
        setCartData(null); // Update local state to reflect cart cleared
      })
      .catch(error => {
        console.log('Error clearing cart', error);
      });
  };

  const placeNow = () => {

    const docRef=firestore().collection("UserOrders").doc(new Date().getTime().toString());
    console.log("OrderData",orderdata.cart);
    docRef.set({
      orderid:docRef.id,
      orderdata:orderdata.cart,
      ordercost:totalCost,
      orderdate:firestore.FieldValue.serverTimestamp(),
      orderaddress:userData.addressData,
      orderphone:userData.PhoneNumber,
      ordername:userData.FullName,
      orderuserid:userData.uid,
      orderstatus:'pending',
      orderpayment:'online',
      paymentstatus:'paid'

    }).then(()=>{
      //clearCart();
      alert('Order Placed')
      
      
     
    })
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity
        style={navbtnout}
        onPress={() => navigation.navigate('HomeScreen')}>
        <View style={navbtn}>
          <AntDesign name="back" size={24} color="black" style={navbtnin} />
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.orderh1}>Your Order Summary</Text>
        <FlatList
          style={styles.c1}
          data={orderdata.cart}
          renderItem={({item}) => {
            return (
              <View style={styles.rowout}>
                <View style={styles.row}>
                  <View style={styles.left}>
                    <Text style={styles.qtn}>{item.FoodQuantity}</Text>
                    <Text style={styles.title}>{item.data.foodName}</Text>
                    <Text style={styles.prices}>Rs {item.data.foodPrice}</Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.totalPrice}>
                      Rs{' '}
                      {parseInt(item.FoodQuantity) *
                        parseInt(item.data.foodPrice)}
                    </Text>
                  </View>
                </View>

                {item.AddOnQuantity > 0 && (
                  <View style={styles.row}>
                    <View style={styles.left}>
                      <Text style={styles.qtn}>{item.AddOnQuantity}</Text>
                      <Text style={styles.title}>{item.data.foodAddon}</Text>
                      <Text style={styles.prices}>
                        Rs {item.data.foodAddonPrice}
                      </Text>
                    </View>
                    <View style={styles.right}>
                      <Text style={styles.totalPrice}>
                        Rs{' '}
                        {parseInt(item.AddOnQuantity) *
                          parseInt(item.data.foodAddonPrice)}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            );
          }}
        />
        <View style={hr80}></View>

        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.title}>Order Total</Text>
          </View>
          <View style={styles.left}>
            <View style={styles.left}>
              <Text style={styles.totalPrice}>{totalCost}</Text>
            </View>
          </View>
        </View>

        <View style={hr80}></View>
        <View style={styles.userDataout}>
          <Text style={styles.orderh1}>Your Details</Text>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Name:</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userData?.FullName}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Email:</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userData?.emailData}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Phone:</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userData?.PhoneNumber}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Address:</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userData?.addressData}</Text>
            </View>
          </View>
          <View style={hr80}></View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={btn1} onPress={() => placeNow()}>
              <Text style={styles.btntext}>Proceed To Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerout: {
    flex: 1,

    backgroundColor: colors.col1,
  },

  contentContainer: {
    minHeight: '100%',
  },
  bottomnav: {
    position: 'absolute',
    bottom: 0,
    zIndex: 20,
    backgroundColor: colors.col1,
    width: '100%',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 45,
  },
  orderh1: {
    textAlign: 'center',
    color: colors.text1,
    fontSize: 30,
    fontWeight: '200',
    margin: 10,
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
    elevation: 5,
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 20,
  },
  qtn: {
    width: 40,
    height: 30,
    backgroundColor: colors.text1,
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 10,
    color: colors.col1,
    fontSize: 17,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 10,
    color: 'black',
  },
  prices: {
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 17,
    color: colors.text1,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    marginLeft: 30,
  },
  totalPrice: {
    fontSize: 17,
    borderColor: colors.text1,
    fontWeight: 'bold',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  btntext:{
    fontSize:20,
    fontWeight:'bold',
    color:colors.col1,
    margin:10
  }
});

export default PlaceOrder;
