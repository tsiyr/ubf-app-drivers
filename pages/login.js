// pages/Auth.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, KeyboardAvoidingView, Alert } from 'react-native';
import { useAuth } from '../auth';
import { loginFetch, signupFetch } from '../utils/services';
import { countryCurrencyMapping, getCountryNameByCode} from '../utils/variables';
import * as Localization from 'expo-localization';


const Auth = () => {
    
  const { login} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoginView, setLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [country, setCountry] = useState(null);
  const [country_name, setCountryName] = useState(null);
  const [currency, setCurrency] = useState(null);

  const [gender, setGender] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const [error, setError] = useState('');

  const handleAuth = () => {


        if(isLoginView){

          handleLogin()
        }else{

          handleSignup()
        }

  };

  const handleLogin = async () => {

    setError(false)

    if(email.length < 3 || password.length < 3){

      setError('Invalid Login Credentials')

        return false;
    }

    setIsLoading(true);

    loginFetch(email,password).then((res) => {

      setIsLoading(false);

      if(res.success){

        if(res.user_id){

          login(res, currency)

        }else{

          setError(res.messages)
        }
        
      }else{
       
        setError('Network Error. Please retry')

      }

        //console.log(res)
    
      });

  };

  const handleSignup = async () => {

    setError(false)

      if(email.length < 3 || first_name.length < 3 || last_name.length < 3 || gender.length < 3 || phone.length < 3 || country_name.last_name < 2){

        setError('Invalid Signup Credentials')

        if( gender.length < 3 ){

          setError('Please select Gender')

        }

        //console.log(email, first_name, last_name, gender, phone, country_name)

          return false;
      }

        setIsLoading(true);

        signupFetch(email,first_name, last_name, gender, phone, country_name).then((res) => {

          setIsLoading(false);

          if(res.success){ 

            setLoginView(true)

            Alert.alert("Yay!", `${res.messages}`);

          }else{
          
            setError(res.message)

          }
        
          });

  };

  const toggleView = () => {
    setLoginView((prev) => !prev);
  };


  useEffect(() => {

    async function getUserLocation() {
      // Get the user's locale
      const userLocale = Localization.locale;

      // Extract country and currency information
      const [userCountry, userCurrency] = userLocale.split('-');

      setCountry(userCurrency);
      setCurrency(countryCurrencyMapping[userCurrency]); 
      setCountryName(getCountryNameByCode(userCurrency));

    }

    getUserLocation();

  }, []);



  
const getButtonStyle = (gd) => {

  return {
    padding: 10,
    backgroundColor: gender === gd ? 'green' : 'transparent',
    borderRadius: 10,
    borderColor: gender === gd ? 'green' : 'black',
    borderWidth:1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
  };
};

const getButtonTextStyle = (gd) => {

  return {

    color: gender === gd ? 'white' : 'black',
   
  };
};





  useEffect(() => {
    
     console.log(country, currency, country_name)
    
  }, [country, currency]);


  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}
  >
    <View style={styles.container}>
      <Image
         source={require('../assets/logo.png')} 
        style={styles.logo}
      />

      <Text style={{margin: 12, paddingBottom: 12, fontWeight:800, fontSize: 21, color: 'darkblue'}}>Driver {isLoginView ? 'Login' : 'Signup'} Page</Text>

      {error && (

         <Text style={{margin: 12, color:'red', fontWeight: 800}}>{error}</Text>

         )}

  
{!isLoginView && (       
  <View  style={{alignItems: 'center', width: '100%'}}>

<TextInput
  style={styles.input}
 placeholder="First Name"
  value={first_name}
  onChangeText={(text) => setFirstName(text)}
/>

<TextInput
style={styles.input}
placeholder="Last Name"
value={last_name}
onChangeText={(text) => setLastName(text)}
/> 
</View>

)}

{!isLoginView && (


<View style={{ flexDirection: 'row', marginBottom: 9}}>

       <TouchableOpacity style={getButtonStyle('male')} onPress={() => setGender('male')}>
        <Text style={getButtonTextStyle('male')} >Male</Text>
        </TouchableOpacity>

        <TouchableOpacity style={getButtonStyle('female')} onPress={() =>  setGender('female')}>
        <Text style={getButtonTextStyle('female')}>Female</Text>
        </TouchableOpacity>

        <TouchableOpacity style={getButtonStyle('NonBinary')}  onPress={() =>  setGender('NonBinary')}>
        <Text style={getButtonTextStyle('NonBinary')} >Non-Binary</Text>
        </TouchableOpacity>

</View>

)
  }

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

{!isLoginView && 
      <TextInput
        style={styles.input}
       placeholder="Phone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
  }

  {isLoginView && 
      <TextInput
        style={styles.input}
       placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
  }

  

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isLoading ? 'gray' : 'darkgreen' }]}
        onPress={handleAuth}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>{isLoginView ? 'Login' : 'Signup'}</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.toggleText} onPress={toggleView}>
        {isLoginView ? 'Signup instead' : 'Login instead'}
      </Text>
    </View>
    </KeyboardAvoidingView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    height: 50,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
 
  button: {
    backgroundColor: 'green',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 55,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  toggleText: {
    marginTop: 25,
    color: 'green',
  },
});

export default Auth;
