import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {
  navbtnout,
  navbtn,
  navbtnin,
  colors,
  veg,
  nonveg,
  btn2,
  hr80,
  incdecbtn,
  incdecinput,
  incdecount,
} from '../Global/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ProductPage = ({navigation, route}) => {
  const data = route.params;
  console.log('Product data', data);
  if (route.params === undefined) {
    navigation.navigate('HomeScreen');
  }

  const [quantity, setQuantity] = useState('1');
  const [addOnQuantity, setAddonQuantity] = useState('0');

  //add to cart functionality
  const addToCart = () => {
    const docRef = firestore()
      .collection('UserCart')
      .doc(auth().currentUser.uid);

    const data1 = {data, FoodQuantity: quantity, AddOnQuantity: addOnQuantity};

    docRef.get().then(doc => {
      if (doc.exists) {
        docRef.update({
          cart: firestore.FieldValue.arrayUnion(data1),
        });
        alert('Added To Cart');
      } else {
        docRef.set({
          cart: [data1],
        });
        alert('Added To Cart');
      }
    });
    //console.log(data1);
  };

  const increaseQunatity = () => {
    setQuantity((parseInt(quantity) + 1).toString());
  };

  const decreaseQunatity = () => {
    if (parseInt(quantity) > 1) {
      setQuantity((parseInt(quantity) - 1).toString());
    }
  };

  const increaseAddonQunatity = () => {
    setAddonQuantity((parseInt(addOnQuantity) + 1).toString());
  };

  const decreaseAddonQunatity = () => {
    if (parseInt(addOnQuantity) > 0) {
      setAddonQuantity((parseInt(addOnQuantity) - 1).toString());
    }
  };

  const cartData = JSON.stringify({ cart: [{data, FoodQuantity: quantity, AddOnQuantity: addOnQuantity}]});
  console.log({cart:[{data, FoodQuantity: quantity, AddOnQuantity: addOnQuantity}] })

 //  console.log(data.foodAddonPrice);

  return (
    <ScrollView style={styles.containerout}>
      <TouchableOpacity
        style={navbtnout}
        onPress={() => navigation.navigate('HomeScreen')}>
        <View style={navbtn}>
          <AntDesign name="back" size={24} color="black" style={navbtnin} />
        </View>
      </TouchableOpacity>

      <View style={styles.container1}>
        <View style={styles.s1}>
          <Image source={{uri: data.foodImageUrl}} style={styles.cardImgin} />
        </View>
      </View>
      <View style={styles.s2}>
        <View style={styles.s2in}>
          <Text style={styles.head1}>{data.foodName}</Text>
          <Text style={styles.head2}>Rs {data.foodPrice}</Text>
        </View>

        <View style={styles.s3}>
          <Text style={styles.head3}> About Food</Text>
          <Text style={styles.head4}>{data.foodDescription}</Text>

          <View style={styles.s3in}>
            {data.foodType == 'veg' ? (
              <Text style={veg}></Text>
            ) : (
              <Text style={nonveg}></Text>
            )}
            <Text style={styles.head5}>{data.foodType}</Text>
          </View>
        </View>

        <View style={styles.container2}>
          <Text style={styles.txt1}>Location</Text>
          <Text style={styles.txt2}>{data.resturantName}</Text>
          <View style={styles.container2in}>
            <Text style={styles.txt3}>{data.resturantAddressStreet}</Text>
            <View style={styles.dash}></View>
            <Text style={styles.txt3}>{data.resturantAddressBuilding}</Text>
          </View>
        </View>

        <View style={styles.container3}>
          <View style={hr80}></View>
          <Text style={styles.txt3}>Food Quantity</Text>
          <View style={incdecount}>
            <Text style={incdecbtn} onPress={() => increaseQunatity()}>
              +
            </Text>
            <TextInput
              style={incdecinput}
              value={quantity}
              onChangeText={text => setQuantity(text)}
            />
            <Text style={incdecbtn} onPress={() => decreaseQunatity()}>
              -
            </Text>
          </View>
          <View style={hr80}></View>
        </View>

        {data.foodAddonPrice != '' && (
          <View style={styles.container3}>
            <Text style={styles.txt5}>Add On Extra</Text>
            <View style={styles.c3in}>
              <Text style={styles.text4}>{data.foodAddon}</Text>
              <Text style={styles.text4}> Rs {data.foodAddonPrice}/-</Text>
            </View>

            <View style={incdecount}>
              <Text style={incdecbtn} onPress={() => increaseAddonQunatity()}>
                +
              </Text>
              <TextInput
                style={incdecinput}
                value={addOnQuantity}
                onChangeText={text => setAddonQuantity(text)}
              />
              <Text style={incdecbtn} onPress={() => decreaseAddonQunatity()}>
                -
              </Text>
            </View>
            <View style={hr80}></View>
          </View>
        )}
      </View>

      <View style={styles.container4}>
        <View style={styles.c4in}>
          <Text style={styles.txt2}>Total Price</Text>

          {data.foodAddonPrice == '' ? (
            <Text style={styles.txt5}>
              Rs {(parseInt(data.foodPrice) * parseInt(quantity)).toString()}/-
            </Text>
          ) : (
            <Text style={styles.txt6}>
              Rs{' '}
              {(
                parseInt(data.foodPrice) * parseInt(quantity) +
                parseInt(addOnQuantity) * parseInt(data.foodAddonPrice)
              ).toString()}
              /-
            </Text>
          )}
        </View>
      </View>

      <View style={styles.btncont}>
        <TouchableOpacity style={btn2} onPress={() => addToCart()}>
          <Text style={styles.btntxt}>Add To Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={btn2} onPress={()=>{
          navigation.navigate('PlaceOrder',{cartData})
        }}>
          <Text style={styles.btntxt}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerout: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  container1: {
    flex: 1,
    backgroundColor: '#fff',
  },
  s1: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImgin: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  s2: {
    width: '100%',
    padding: 20,
  },
  s2in: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 1,
  },
  head1: {
    fontSize: 30,
    fontWeight: '500',
    color: colors.text1,
    width: 220,
  },
  head2: {
    fontSize: 40,
    fontWeight: '200',
    color: colors.text2,
  },
  s3: {
    backgroundColor: colors.text1,
    margin: 10,
    padding: 20,
    borderRadius: 20,
  },
  head3: {
    fontSize: 30,
    fontWeight: '200',
    color: colors.col1,
  },
  head4: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: '400',
    color: colors.col1,
  },
  head4: {
    marginLeft: 10,
    marginVertical: 10,
    fontSize: 20,
    fontWeight: '400',
    color: colors.col1,
  },
  s3in: {
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
    width: 130,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  head5: {
    color: colors.text1,
    fontSize: 20,
    fontWeight: '200',
    marginLeft: 10,
  },
  btncont: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
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
  container2: {
    width: '95%',
    backgroundColor: colors.col1,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
    elevation: 10,
    alignItems: 'center',
    paddingBottom: 10,
  },
  txt1: {
    color: colors.text1,
    fontSize: 20,
    fontWeight: '200',
  },
  txt2: {
    color: colors.text1,
    fontSize: 30,
    fontWeight: '200',
    marginVertical: 10,
  },
  container2in: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  txt3: {
    color: colors.text1,
    fontSize: 16,
    textAlign: 'center',
  },
  dash: {
    width: 1,
    height: 20,
    backgroundColor: colors.text1,
    marginHorizontal: 10,
  },
  container3: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
  },
  txt5: {
    color: colors.text1,
    fontSize: 16,
    textAlign: 'center',
  },
  c3in: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  text4: {
    color: colors.text3,
    fontSize: 20,
    marginHorizontal: 6,
  },
  container4:{
    width:'90%',
    alignItems:'center',
    alignSelf:'center'
  },

  c4in:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    width:'100%',
    alignItems:'center'
  },
  txt6:{
    color:colors.text1,
    fontSize:35,
    textAlign:'center'
  }
  
});

export default ProductPage;
