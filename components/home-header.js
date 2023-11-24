// CustomHeader.js
import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../auth';


const HomeHeader = ({title, navigation}) => { 
  
  const handleDpPress = () => {
      navigation.navigate('Profile');
  };

  const { user } = useAuth();


  const screenWidth = Dimensions.get('window').width;

  return (
    <TouchableOpacity onPress={() => handleDpPress()}>

    <View style={[styles.header, { width: screenWidth }]}>
       
          <Image
          source={require('../assets/logo.png')} // Replace with your app logo
          style={styles.logo}
          />
      
      {user && 4> 5 && (
              <View style={{flex:1, justifyContent:'row', padding:12, backgroundColor_: 'blue'}}>
              <Text style={{textAlign:'right'}}>{(user.groupName.length > 3 ? user.groupName : user.fname)}</Text>
                </View>

                )}


      {user && (
 
          <View style={styles.notif_container}>
          <Icon name="bell" size={30} color="green" />
          {1 == 1 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>{12}</Text>
            </View>
          )}
          
          </View>

          )}


 
    </View>
    
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  header: {
    width: 'auto',
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    marginVertical: 7,
    backgroundColor: 'white', // Customize the background color
  },
  logo: {
    marginVertical: 2,
    width: 130, // Set the desired width for your logo
    height: 30, // Set the desired height for your logo
  },
  dp: {
    marginVertical: 2,
    width: 40, // Set the desired width for your logo
    height: 40, // Set the desired height for your logo
    resizeMode: 'contain', 
    borderRadius: 50
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon_container:{
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#0012',
    borderRadius: 50,
    height:40,
    width:40
  },

  notif_container: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HomeHeader;
