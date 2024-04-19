import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {colors} from '../Global/style';
import images from '../../assets/OfferSliderImages/img1.png';
const carousalData = [
  {
    id: 1,
    image: require('../../assets/OfferSliderImages/img1.png'),
  },
  {
    id: 2,
    image: require('../../assets/OfferSliderImages/img2.png'),
  },
  {
    id: 3,
    image: require('../../assets/OfferSliderImages/img3.png'),
  },
];

const OfferSlider = () => {
  return (
    <View style={styles.offerSlider}>
      <Swiper
        autoplay={true}
        dotColor={colors.text2}
        activeDotColor={colors.text1}
        >
        {carousalData.map(item => {
          return (
            <View style={styles.slide} key={item.id}>
              <Image source={item.image} style={styles.image} />
            </View>
          );
        })}
      </Swiper>
    </View>
  );
};

export default OfferSlider;

const styles = StyleSheet.create({
  offerSlider: {
    width: '100%',
    height: 200,
    marginTop: 10,
    backgroundColor: colors.col1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  slide: {
    width: '100%',
    height: 200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.col1,
  
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  
});
