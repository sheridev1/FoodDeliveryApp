import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,

} from 'react-native';
import style, {colors, titles, btn1, hr80,error} from '../../Global/style';
import Iconicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import Awesome from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = ({navigation}) => {
  const [emailfocus, setEmailFocus] = useState(false);
  const [passwordfocus, setPasswordFocus] = useState(false);
  const [showpassoword, setShowpassword] = useState(false);


  const [emailData, setEmailData] = useState('');
  const [password, setPassword] = useState('');
  const [customError,setCustomError]=useState('')


  const handleLogin=()=>{

     
    if (!emailData || !password)
    {
     setCustomError("Please Fill the fields");
     return;
    }
    auth().signInWithEmailAndPassword(emailData,password).then((userCredentail)=>{
       var user=userCredentail.user
       console.log("Logged in Successfully");
       navigation.navigate('HomeScreen');
    }).catch((error )=>{
      var errormessage=error.message;
      console.log(errormessage);
      if(errormessage=='[auth/invalid-email] The email address is badly formatted.')
      {setCustomError("The email is invalid");}
      else 
      {setCustomError("Incorrect email or password")}

    }
    )

  }
  return (
    <KeyboardAwareScrollView
    contentContainerStyle={{flexGrow: 1}}
    keyboardShouldPersistTaps="always"
     >
      <View style={styles.container}>
      <Text style={styles.head1}>Sign In</Text>
      {customError !== '' && <Text style={style.error}>{customError}</Text>}

      <View style={styles.inputout}>
        <Icon
          name="user"
          size={24}
          color={emailfocus === true ? colors.text1 : colors.text2}
          style={{marginVertical: 10}}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={emailData}
          onChangeText={(text)=>setEmailData(text)}
          onFocus={() => {
            setEmailFocus(true);
            setPasswordFocus(false);
            setShowpassword(false);
          }}
        />
      </View>
      <View style={styles.inputout}>
        <MaterialCommunityIcons
          name="lock-outline"
          size={24}
          style={{marginVertical: 10}}
          color={passwordfocus == true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text)=>setPassword(text)}
          onFocus={() => {
            setEmailFocus(false);
            setPasswordFocus(true);
          }}
          secureTextEntry={showpassoword === false ? true : false}
        />
        <Iconicons
          name={showpassoword == false ? 'eye-off' : 'eye'}
          size={24}
          style={{marginVertical: 10}}
          onPress={() => {
            setShowpassword(!showpassoword);
          }}
        />
      </View>
      <TouchableOpacity style={btn1} onPress={()=>handleLogin()}>
        <Text
          style={{
            color: colors.col1,
            fontSize: titles.btntxt,
            fontWeight: 'bold',
          }}>
          Sign In
        </Text>
      </TouchableOpacity>

      <Text style={styles.forgot}>Forgot Password?</Text>
      <Text style={styles.or}>OR</Text>
      <Text style={styles.gftxt}>Sign In With</Text>
      <View style={styles.gf}>
        <TouchableOpacity>
          <View style={styles.gficons}>
            <Icon name="google" color="#EA4335" size={24} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.gficons}>
            <Awesome name="facebook" color="#4267B2" size={24} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={hr80}></View>
      <Text onPress={()=>navigation.navigate('SignUp')}>
        Don't have an account?
        <Text style={styles.signup}> Sign Up</Text>
      </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  head1: {
    fontSize: titles.title1,
    color: colors.text1,
    textAlign: 'center',
    marginBottom: 30,
    
  },
  inputout: {
    flexDirection: 'row',
    width: '80%',
    marginVertical: 10,
    backgroundColor: colors.col1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 20,
    borderRadius: 10,
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
  forgot: {
    color: colors.text2,
    marginTop: 20,
    marginBottom: 10,
  },
  or: {
    color: colors.text1,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  gftxt: {
    color: colors.text2,
    marginVertical: 10,
    fontSize: 25,
  },
  gf: {
    flexDirection: 'row',
  },
  gficons: {
    backgroundColor: 'white',
    width: 50,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 20,
  },
  signup:{
    color:colors.text1
  }
});

export default Login;
