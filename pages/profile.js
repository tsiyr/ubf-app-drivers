import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { useAuth } from '../auth';
import { useRoute, useNavigation } from '@react-navigation/native';

const UserProfile = () => {

    const navigation = useNavigation()

    const { user, setUser } = useAuth();

    //console.log(user)

    const handleMyRentalsPress = () => {

        navigation.navigate('Rentals');

      };

      const handleLogout = () => {

        console.log('logout')
        
        //navigation.navigate('Login');
        setUser(null)

        return 

      };
    
      const handleDeleteAccountPress = () => {

        console.log('Delete Account');
      };


  return (

 (user && 

    <ScrollView >
      <View style={styles.container}>
      <Image source={{ uri: user.passport && user.passport.length > 4 ? `https://urbanfleet.biz/docs/${user.passport}` : 'https://placehold.co/400x400.png' }}
 style={styles.profilePicture} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{(user.groupName.length > 3 ? user.groupName : user.fname)}</Text>
        <Text style={styles.userEmail}>{user.login}</Text>
        <Text style={styles.userPhoneNumber}>{user.phone}</Text>

      </View>

      <View style={styles.menuContainer}>
    

        <TouchableOpacity style={styles.menuItem} onPress={()=> navigation.navigate('Rentals')}>
          <Text style={styles.menuItemText}>Rentals</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={()=> navigation.navigate('DSTrips')}>
          <Text style={styles.menuItemText}>Destination Trips</Text>
        </TouchableOpacity>
        
      </View>

      <View style={styles.menuContainer}>

      <TouchableOpacity style={styles.menuItem} onPress={()=> navigation.navigate('Vehicles')}>
          <Text style={styles.menuItemText}>Vehicles</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleMyRentalsPress}>
          <Text style={styles.menuItemText}>Earnings</Text>
        </TouchableOpacity>
        
      </View>

      <View style={styles.menuContainer}>

         <TouchableOpacity style={styles.menuItem} onPress={()=> navigation.navigate('QRCodeScanner')}>
          <Text style={styles.menuItemText}>Scan QRCode</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleMyRentalsPress}>
          <Text style={styles.menuItemText}>Update Profile</Text>
        </TouchableOpacity>
        
      </View>

      <View style={{alignItems: 'center'}}>

      <TouchableOpacity style={{marginTop:15}} onPress={handleLogout}>
              <Text style_={styles.menuItemText}>Logout</Text>
            </TouchableOpacity>

          <TouchableOpacity style={{marginTop:30}} onPress={handleDeleteAccountPress}>
              <Text style_={styles.menuItemText}>Delete Account</Text>
            </TouchableOpacity>
        </View>

        </View>
    </ScrollView>
  )

  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50
    },
    profilePicture: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 20,
    },
    userInfo: {
      alignItems: 'center',
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    userEmail: {
      fontSize: 16,
      marginBottom: 5,
    },
    userPhoneNumber: {
      fontSize: 16,
      marginBottom: 20,
    },
    menuContainer: {
      width: '90%',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    menuItem: {
      //backgroundColor: 'white',
      borderColor: 'green',
      borderWidth: 1,

      paddingVertical: 10,
      paddingHorizontal: 10,

      marginVertical: 10,
      borderRadius: 10,
      width: '48%',
      marginHorizontal: 14,
      alignItems: 'center',
    },
    menuItemText: {
      color: 'green',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  

export default UserProfile;
