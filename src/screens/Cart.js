import React, {useEffect, useState,useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {navbtn, navbtnout, navbtnin, colors, btn2} from '../Global/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BottomNav from '../Components/BottomNav';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import PlaceOrder from './PlaceOrder';
import {MyContext} from '../Global/Context';


const Cart = ({navigation}) => {
  const [cartData, setCartData] = useState(null);
  const [totalCost, setTotalCost] = useState('0');
  const {userData, setUserData} = useContext(MyContext);

  const getCartData = async () => {
    const docRef = firestore()
      .collection('UserCart')
      .doc(auth().currentUser.uid);

    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = JSON.stringify(doc.data());
          //  console.log(data);
          setCartData(data);
        } else {
          console.log('No such Document');
        }
      })
      .catch(error => {
        console.log('Error getting document', error);
      });
  };

  useEffect(() => {
    getCartData();
  }, []);

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
      //console.log(totalFoodPrice)
    }
  }, [cartData]);

  const deleteItem = item => {
    console.log(item);
    const docRef = firestore()
      .collection('UserCart')
      .doc(auth().currentUser.uid);

    docRef
      .update({
        cart: firestore.FieldValue.arrayRemove(item),
      })
      .then(() => {
        console.log('deleted');
        getCartData();
      }).catch((error)=>{
        console.log(error)

      })
  };

  return (
    <View style={styles.containerout}>
      <TouchableOpacity
        style={navbtnout}
        onPress={() => navigation.navigate('HomeScreen')}>
        <View style={navbtn}>
          <AntDesign name="back" size={24} color="black" style={navbtnin} />
        </View>
      </TouchableOpacity>
      <View style={styles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>

      <View style={styles.container}>
        <Text style={styles.head1}> Your Cart</Text>
        {cartData == null || JSON.parse(cartData).cart.length == 0 ? (
          <Text style={styles.head2}> Your Cart Is Empty</Text>
        ) : (
          <FlatList
            style={styles.cardList}
            data={JSON.parse(cartData).cart}
            renderItem={({item}) => {
              return (
                <View style={styles.cartcard}>
                  <Image
                    style={styles.cartimg}
                    source={{uri: item.data.foodImageUrl}}
                  />
                  <View style={styles.cartcardin}>
                    <View style={styles.c1}>
                      <Text style={styles.txt1}>
                        {item.FoodQuantity} &nbsp; {item.data.foodName}
                      </Text>
                      <Text style={styles.txt2}>
                        Rs {item.data.foodPrice}/each
                      </Text>
                    </View>
                    {item.AddOnQuantity > 0 && (
                      <View style={styles.c2}>
                        <Text style={styles.txt3}>
                          {item.AddOnQuantity}&nbsp;{item.data.foodAddon}
                        </Text>
                        <Text style={styles.txt3}>
                          Rs {item.data.foodAddonPrice}/each
                        </Text>
                      </View>
                    )}
                    <TouchableOpacity
                      style={styles.c4}
                      onPress={() => deleteItem(item)}>
                      <Text style={styles.txt1}>Delete</Text>
                      <AntDesign
                        name="delete"
                        size={22}
                        color="black"
                        style={styles.del}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        )}
        <View style={styles.btncont}>
          <View style={styles.c3}>
            <Text style={styles.txt5}>Total</Text>
            <Text style={styles.txt6}>Rs {totalCost}</Text>
          </View>
          <TouchableOpacity style={btn2} onPress={()=>navigation.navigate('PlaceOrder',{cartData,setCartData,userData,setUserData})}>
            <Text style={styles.btntxt}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  containerout: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.col1,
  },
  bottomnav: {
    position: 'absolute',
    bottom: 0,
    zIndex: 20,
    backgroundColor: colors.col1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    alignItems: 'center',
    width: '100%',
  },
  head1: {
    fontSize: 40,
    textAlign: 'center',
    color: colors.text1,
  },
  head2: {
    fontSize: 30,
    backgroundColor: colors.col1,
    elevation: 10,
    marginVertical: 20,
    width: '90%',
    height: '50%',
    alignSelf: 'center',
    paddingVertical: '25%',
    borderRadius: 10,
    textAlign: 'center',
  },
  cartcard: {
    width: '90%',
    border: 1,
    borderColor: 'red',
    backgroundColor: colors.col1,
    flexDirection: 'row',
    marginVertical: 10,
    alignSelf: 'center',
    elevation: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  cartimg: {
    width: 140,
    height: 100,
    borderRadius: 10,
  },
  cardList: {
    width: '100%',
  },
  cartcardin: {
    flexDirection: 'column',
    margin: 5,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  c1: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colors.col1,
  },
  c2: {
    backgroundColor: colors.text1,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    flexDirection: 'row',
  },
  txt1: {
    fontSize: 16,
    color: colors.text1,
    width: '55%',
    fontWeight: 'bold',
  },
  txt2: {
    fontSize: 13,
    color: colors.text2,
    fontWeight: 'bold',
  },
  txt3: {
    fontSize: 15,
    color: colors.col1,
  },
  del: {
    color: colors.text1,
  },
  c4: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 10,
    borderColor: colors.text1,
    borderWidth: 1,
    marginVertical: 10,
    padding: 5,
  },
  btncont: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    flexDirection: 'row',
    marginBottom: 80,
    borderTopColor: colors.text3,
    borderTopWidth: 0.2,
  },
  btntxt: {
    backgroundColor: colors.text1,
    color: colors.col1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    borderRadius: 10,
    width: '90%',
    textAlign: 'center',
  },
  c3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt5: {
    fontSize: 20,
    color: colors.text1,
    marginHorizontal: 5,
  },
  txt6: {
    fontSize: 25,
    color: colors.text2,
    marginHorizontal: 5,
    fontWeight: 'bold',
  },
});
export default Cart;
