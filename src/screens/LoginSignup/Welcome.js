import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Logo from '../../../assets/logo.png';
import {View, Text} from 'react-native';
import {colors, hr80} from '../../Global/style';



const Welcome = ({navigation}) => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome To Foodie</Text>
      <View style={styles.logoout}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={hr80} />
      <Text style={styles.text}>
        Find the best food around you at lowest price
      </Text>
      <View style={hr80} />

      <View style={styles.btnout}>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.btn}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.btn}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff4242',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 55,
    color: colors.col1,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: '200',
  },
  logoout: {
    width: '80%',
    height: '30%',
    alignItems: 'baseline',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 18,
    width: '80%',
    color: colors.col1,
    textAlign: 'center',
  },
  btnout: {
    flexDirection: 'row',
  },
  btn: {
    fontSize: 17,
    color: colors.text1,
    textAlign: 'center',
    marginVertical: 30,
    marginHorizontal: 10,
    fontWeight: '700',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
});
export default Welcome;
