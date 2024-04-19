import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Evillcons from 'react-native-vector-icons/EvilIcons';
import logo from '../../assets/icon.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../Global/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
const HeaderNav = ({navigation}) => {

  
  return (
    <View style={styles.container}>
      <Evillcons
        name="navicon"
        size={24}
        color={colors.text2}
        style={styles.myicon}
      />
      <View style={styles.containerin}>
        <Text style={styles.mytext}>Foodie</Text>
        <Ionicons
          name="fast-food-outline"
          size={26}
          color={colors.text2}
          style={styles.myicon}
        />
      </View>
      <FontAwesome
        name="user-circle"
        color={colors.text2}
        style={styles.myicon}
        size={24}
        onPress={()=>{
          navigation.navigate("UserProfile")
        }}      />
    </View>
  );
};

export default HeaderNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 5,
    padding: 10,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: colors.col1,
    alignItems: 'center',
    elevation: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  containerin: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  myicon: {
    color: colors.text1,
  },
  mytext: {
    color: colors.text1,
    fontSize: 24,
  },
});
