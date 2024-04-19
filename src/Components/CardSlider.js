import {View, Text, FlatList, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {colors, veg, nonveg} from '../Global/style';
const CardSlider = ({title, data,navigation}) => {

  const openProductPage=(item)=>{
    console.log(item)
   navigation.navigate("ProductPage",item);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.cardouthead}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cardsout}
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity key={item.index} onPress={()=>{openProductPage(item)}}>
            <View style={styles.card}>
            <View style={styles.s1}>
              <Image
                source={{
                  uri: item.foodImageUrl,
                }}
                style={styles.cardimg}
              />
            </View>
            <View style={styles.s2}>
              <Text style={styles.txt1}>{item.foodName}</Text>
              <View style={styles.s2in}>
                <Text style={styles.txt2}>Rs. {item.foodPrice}</Text>
                {/* */}
                {item.foodType == 'veg' ? (
                  <Text style={veg}></Text>
                ) : (
                  <Text style={nonveg}></Text>
                )}
              </View>
            </View>
            <View style={styles.s3}>
                <Text style={styles.buybtn}>
                    Buy
                </Text>
            </View>
          </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CardSlider;

const styles = StyleSheet.create({
    container:{
      marginVertical:20
    },
    cardouthead:{
        color:colors.text2,
        width:'90%',
        fontSize:25,
        fontWeight:'400',
        borderRadius:10,
        marginHorizontal:10

    },
    cardsout:{
        width:'100%'
    },
    card:{
        width:300,
        height:300,
        margin:10,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#e8e8e8',
        backgroundColor: colors.col1
    },
    cardimg:{
        width:'100%',
        height:200,
        borderRadius:10,

    },
    s2:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    txt1:{
        fontSize:18,
        color:colors.text2,
        marginHorizontal:5,
        width:150
    },
    txt2:{
        fontSize:20,
        color:colors.text2,
        marginRight:10
    },
    s2in:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:10
    },
    s3:{
        alignItems:'center',
        position:"absolute",
        bottom:1,
        width:'100%'
    },
    buybtn:{
        backgroundColor:colors.text1,
        color:colors.col1,
        paddingHorizontal:10,
        paddingVertical:5,
        fontSize:20,
        borderRadius:10,
        width:'90%',
        textAlign:'center'
    }
});

