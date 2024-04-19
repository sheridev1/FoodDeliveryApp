import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../Global/style';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
const Categories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.box}>
          <FontAwesome
            name="hamburger"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.text}>Burger</Text>
        </View>
        <View style={styles.box}>
          <FontAwesome
            name="pizza-slice"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.text}>Pizza</Text>
        </View>
        <View style={styles.box}>
          <Material
            name="noodles"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.text}>Noodles</Text>
        </View>
        <View style={styles.box}>
          <FontAwesome
            name="hamburger"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.text}>Burger</Text>
        </View>
        <View style={styles.box}>
          <FontAwesome
            name="hamburger"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.text}>Burger</Text>
        </View>
        <View style={styles.box}>
          <FontAwesome
            name="hamburger"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.text}>Burger</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.col1,
    width: '100%',
    padding: 5,
    elevation: 10,
    borderRadius: 10,
  },
  head: {
    color: colors.text1,
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '300',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.text1,
    margin: 10,
  },
  box: {
    backgroundColor: colors.col1,
    elevation: 10,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon:{
    marginRight:10,
    color:colors.text3
  }
});
