import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../Global/style';

const BottomNav = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.btncont1}>
        <AntDesign
          name="home"
          size={30}
          style={styles.icon1}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}
        />
      </View>
      <View style={styles.btncont2}>
        <AntDesign name="search1" size={30} style={styles.icon2} />
      </View>
      <View style={styles.btncont1}>
        <AntDesign
          name="shoppingcart"
          size={30}
          style={styles.icon1}
          onPress={() => {
            navigation.navigate('Cart');
          }}
        />
      </View>
      <View style={styles.btncont1}>
        <FontAwesome name="map-marked-alt" size={30} style={styles.icon1} 
        onPress={()=>{
          navigation.navigate('TrackOrder');
        }}
        />
      </View>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'white',
    alignContent: 'center',
    width: '100%',
    borderTopColor: colors.text1,
    borderTopWidth: 0.5,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    elevation: 30,
  },
  icon1: {
    color: colors.text1,
  },
  icon2: {
    color: 'white',
  },
  btncont2: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: -15,
    backgroundColor: colors.text1,
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  btncont1: {
    backgroundColor: colors.col1,
    elevation: 10,
    width: 50,
    height: 50,
    borderRadius:50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
