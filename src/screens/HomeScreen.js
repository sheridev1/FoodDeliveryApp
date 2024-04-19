import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import HeaderNav from '../Components/HeaderNav';
import Categories from '../Components/Categories';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../Global/style';
import OfferSlider from '../Components/OfferSlider';
import firestore from '@react-native-firebase/firestore';
import {doc} from 'firebase/firestore';
import CardSlider from '../Components/CardSlider';
import { MyContext } from '../Global/Context';
import auth from '@react-native-firebase/auth';

import BottomNav from '../Components/BottomNav';
export const HomeScreen = ({navigation}) => {
  const [foodData, setFoodData] = useState([]);
  const [foodVegData, setfoodVegData] = useState([]);
  const [foodNonVegData, setfoodNonVegData] = useState([]);
  const [Search, setSearch] = useState([]);
  const foodRef = firestore().collection('FoodData');

  useEffect(() => {
    foodRef.onSnapshot(snapshot => {
      setFoodData(snapshot.docs.map(doc => doc.data()));
    });
  }, []);

  useEffect(() => {
    setfoodNonVegData(foodData.filter(item => item.foodType == 'non-veg'));
    setfoodVegData(foodData.filter(item => item.foodType == 'veg'));
  }, [foodData]);

   const {setUserLogged} = useContext(MyContext); // Initialize userLogged state

  useEffect(() => {
    const checkLogin = () => {
      auth().onAuthStateChanged(user => {
        if (user) {
          setUserLogged(user);
        } else {
          setUserLogged(null);
          console.log('No User Logged');
        }
      });
    };
    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <HeaderNav navigation={navigation} />
      <View style={styles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.searchbox}>
          <AntDesign name="search1" size={24} style={styles.searchicon} />
          <TextInput
            style={styles.input}
            placeholder="Search"
            onChangeText={text => {
              setSearch(text);
            }}
          />
        </View>
        {Search != '' && (
          <View style={styles.searchresultrouter}>
            <FlatList
              style={styles.searchresultinner}
              data={foodData}
              renderItem={({item}) => {
                const lowercaseSearch = Search.toLowerCase();
                if (item.foodName.toLowerCase().includes(lowercaseSearch))
                  return (
                    <View style={styles.searchresult}>
                      <AntDesign
                        name="arrowright"
                        size={24}
                        style={styles.searchicon}
                      />
                      <Text style={styles.searchresultext}>
                        {item.foodName}
                      </Text>
                    </View>
                  );
              }}
            />
          </View>
        )}
        <Categories />
        <OfferSlider />
        <CardSlider
          title={"Today's Special"}
          data={foodData}
          navigation={navigation}
        />
        <CardSlider
          title={'NonVeg Love '}
          data={foodNonVegData}
          navigation={navigation}
        />
        <CardSlider
          title={'Veg Hunger '}
          data={foodVegData}
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  scrollViewContent: {
    // alignItems:"center",
  },
  searchbox: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.col1,
    borderRadius: 30,
    padding: 10,
    margin: 20,
    elevation: 10,
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    color: colors.text1,
    width: '90%',
  },
  searchicon: {
    color: colors.text1,
  },
  searchresultrouter: {
    width: '100%',
    marginHorizontal: 30,
    height: '100%',
    backgroundColor: colors.col1,
  },
  searchresultinner: {
    width: '100%',
  },
  searchresult: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  searchresultext: {
    marginLeft: 10,
    fontSize: 18,
    color: colors.text1,
  },
  bottomnav: {
    position: 'absolute',
    bottom: 0,
    zIndex: 20,
    backgroundColor: colors.col1,
    width: '100%',
  },
});
