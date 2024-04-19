import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Modal,
} from 'react-native';
import style, {colors, titles, btn1, hr80, error} from '../../Global/style';
import Iconicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import Awesome from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Entypo from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUp = ({navigation}) => {
  const [namefocus, setnameFocus] = useState(false);
  const [emailfocus, setEmailFocus] = useState(false);
  const [phonefocus, setphonefocus] = useState(false);
  const [passwordfocus, setPasswordFocus] = useState(false);
  const [cpasswordfocus, setcPasswordFocus] = useState(false);
  const [showpassoword, setShowpassword] = useState(false);
  const [showcpassoword, setShowcpassword] = useState(false);
  const [addressfocus, setaddressfocus] = useState(false);

  //Taking Data
  const [emailData, setEmailData] = useState('');
  const [FullName, setFullName] = useState('');
  const [PhoneNumber, setphoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rpassword, setrPasssword] = useState('');
  const [addressData, setAddressData] = useState('');

  //Errors
  const [customError, setCustomError] = useState('');
  const [successmsg, setSucessmsg] = useState(null);

  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (successmsg) {
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        setSucessmsg('');
        navigation.navigate('SignIn');
      }, 3000); // Hide modal after 3 seconds
    }
  }, [successmsg]);

  //FormData
  const handleSignUp = () => {
    if (
      !emailData ||
      !FullName ||
      !PhoneNumber ||
      !password ||
      !rpassword ||
      !addressData
    ) {
      setCustomError('Please fill out all fields');
      return;
    }
    if (password != rpassword) {
      //Alert("password is not matched")
      setCustomError('Password does not match!');
      return;
    }

    try {
      auth()
        .createUserWithEmailAndPassword(emailData, password)
        .then(userCredentails => {
         // console.log(userCredentails?.user.uid);
          //console.log('user Created');
          setCustomError('User created Succesfully');

          
            const userRef = firestore().collection('UserData');
            userRef
              .add({
                emailData: emailData,
                password: password,
                PhoneNumber: PhoneNumber,
                FullName: FullName,
                addressData: addressData,
                uid: userCredentails?.user.uid,
              })
              .then(() => {
               // console.log('Data added to firebase');
                setSucessmsg('User Successfully created');
                //Reset Form
                setEmailData('');
                setAddressData('');
                setFullName('');
                setphoneNumber('');
                setPassword('');
                setrPasssword('');

                setModalVisible(true);

                //clear error
                setCustomError('');
              })
              .catch(error => console.log('Error while uploading Data', error));
          }
        )
        .catch(error => {
          console.log('Sign Up Error', error.message);
          if (
            error.message ==
            '[auth/email-already-in-use] The email address is already in use by another account.'
          ) {
            setCustomError('Email already exist');
          } else if (
            error.message ==
            '[auth/invalid-email] The email address is badly formatted.'
          ) {
            setCustomError('Invalid Email');
          } else if (
            error.message ==
            '[auth/weak-password] The given password is invalid. [ Password should be at least 6 characters ]'
          ) {
            setCustomError('Password should be at least 6 characters');
          } else {
            setCustomError(error.message);
          }
        });
    } catch (error) {
      console.log('Sign Up system error', error);
    }
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="always">
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.head1}>Sign Up</Text>
        {customError !== '' && <Text style={style.error}>{customError}</Text>}

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{successmsg}</Text>
            </View>
          </View>
        </Modal>

        <View style={styles.inputout}>
          <Icon
            name="user"
            size={24}
            color={namefocus === true ? colors.text1 : colors.text2}
            style={{marginVertical: 10}}
          />
          <TextInput
            style={styles.input}
            placeholder="Full name"
            value={FullName}
            onFocus={() => {
              setnameFocus(true);
              setEmailFocus(false);
              setphonefocus(false);
              setPasswordFocus(false);
              setShowpassword(false);
              setcPasswordFocus(false);
              setaddressfocus(false);
            }}
            onChangeText={text => setFullName(text)}
          />
        </View>

        <View style={styles.inputout}>
          <Entypo
            name="email"
            size={24}
            color={emailfocus === true ? colors.text1 : colors.text2}
            style={{marginVertical: 10}}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={emailData}
            onFocus={() => {
              setEmailFocus(true);
              setnameFocus(false);
              setphonefocus(false);
              setaddressfocus(false);
              setPasswordFocus(false);
              setShowpassword(false);
              setcPasswordFocus(false);
            }}
            onChangeText={text => setEmailData(text)}
          />
        </View>

        <View style={styles.inputout}>
          <Awesome
            name="phone"
            size={24}
            color={phonefocus === true ? colors.text1 : colors.text2}
            style={{marginVertical: 10}}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={PhoneNumber}
            onFocus={() => {
              setphonefocus(true);
              setEmailFocus(false);
              setPasswordFocus(false);
              setShowcpassword(false);
              setShowpassword(false);
              setcPasswordFocus(false);
              setaddressfocus(false);
              setnameFocus(false);
            }}
            onChangeText={text => setphoneNumber(text)}
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
            onFocus={() => {
              setEmailFocus(false);
              setPasswordFocus(true);
              setcPasswordFocus(false);
            }}
            secureTextEntry={showpassoword === false ? true : false}
            onChangeText={text => setPassword(text)}
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
        <View style={styles.inputout}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={24}
            style={{marginVertical: 10}}
            color={cpasswordfocus == true ? colors.text1 : colors.text2}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={rpassword}
            onFocus={() => {
              setEmailFocus(false);
              setPasswordFocus(false);
              setcPasswordFocus(true);
            }}
            secureTextEntry={showcpassoword === false ? true : false}
            onChangeText={text => setrPasssword(text)}
          />
          <Iconicons
            name={showcpassoword == false ? 'eye-off' : 'eye'}
            size={24}
            style={{marginVertical: 10}}
            onPress={() => {
              setShowcpassword(!showcpassoword);
            }}
          />
        </View>

        <View style={styles.inputout}>
          <Entypo
            name="location-pin"
            size={24}
            color={addressfocus === true ? colors.text1 : colors.text2}
            style={{marginVertical: 10}}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Address"
            value={addressData}
            onFocus={() => {
              setnameFocus(false);
              setaddressfocus(true);
              setEmailFocus(false);
              setShowcpassword(false);
              setShowpassword(false);
              setPasswordFocus(false);
              setcPasswordFocus(false);
            }}
            onChangeText={text => setAddressData(text)}
          />
        </View>

        <TouchableOpacity style={btn1} onPress={() => handleSignUp()}>
          <Text
            style={{
              color: colors.col1,
              fontSize: titles.btntxt,
              fontWeight: 'bold',
            }}>
            Sign Up
          </Text>
        </TouchableOpacity>

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
        <Text style={{marginTop: -10}}>
          Already have an Account?
          <Text style={styles.signup}> Sign In</Text>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingTop: 10,
  },
  head1: {
    fontSize: titles.title1,
    color: colors.text1,
    textAlign: 'center',
    marginBottom: 15,
  },
  inputout: {
    flexDirection: 'row',
    width: '80%',
    marginVertical: 10,
    backgroundColor: colors.col1,
    paddingHorizontal: 10,
    paddingVertical: 4,
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
    marginVertical: 5,
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
  signup: {
    color: colors.text1,
  },
  txt: {
    color: colors.text2,
    marginVertical: 10,
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    color: 'red',
    textAlign: 'center',
  },
});

export default SignUp;
