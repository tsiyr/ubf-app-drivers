import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { fetchRentals } from '../utils/services';
import { useAuth } from '../auth';

import NoVehiclesFoundView from '../components/no_rentals_found';

const url="https://urbanfleet.biz/";
  



  const RentalsPage = () => {

    
    const { user, currency } = useAuth();

    const [modalVisible, setModalVisible] = useState(false);
    //const [isLoading, setIsLoading] = useState(true);
    const [rentals, setRentals] = useState(false);


      useEffect(() => {

        fetchRentals(user.login).then((res) => {    
    
          if(res){
            
           // console.log(res)
            setRentals(res)
    
          }
    
            //console.log(res)
        
          });
    
    
      }, []);
    
   
    const renderRentalItem = ({ item }) => (
      <View style={styles.rentalItemContainer}>
        <Image source={{ uri: url+item.image }} style={styles.vehicleImage} />
        <Text style={{marginBottom:12}}>From {item.from_loc} to {item.to_loc} </Text>
        <Text>Booking ID: {item.bookingid}</Text>
        <Text style={{marginBottom:12, fontWeight:800, fontSize: 24}}>NGN: {parseInt(item.fee).toLocaleString()}</Text>
        <Text>Status: not started</Text>
        <ScrollView
          horizontal
          style={styles.ctaButtonsContainer}
          contentContainerStyle={styles.ctaButtonsContent}
        >
          <TouchableOpacity style={styles.ctaButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.ctaButtonText}>Driver Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Rate Trip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>View Receipt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Dispute</Text>
          </TouchableOpacity>
          {/* Add more CTAs as needed */}
        </ScrollView>
      </View>
    );
  
    return (
      <View style={styles.container}>

            
      {!rentals &&
          
          (
            <ActivityIndicator style={{padding:100}} size="large" color="#0000ff" />
          )
          }

      
{rentals.length < 1 &&
          
          (
            <NoVehiclesFoundView />
          )
          }
        {rentals.length > 0 &&
          
          ( 
        <FlatList
          data={rentals}
          keyExtractor={(item) => item.id}
          renderItem={renderRentalItem}
        />

        )
      }
  
        {/* Driver Info Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text>Driver Information Modal</Text>
            {/* Add driver information content here */}
            <TextInput
              placeholder="Additional Driver Information"
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    rentalItemContainer: {
      marginBottom: 20,
    },
    vehicleImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      marginBottom: 10,
    },
    ctaButtonsContainer: {
      flexDirection: 'row',
    },
    ctaButtonsContent: {
      alignItems: 'flex-start',
    },
    ctaButton: {
      backgroundColor: 'green',
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginVertical: 10,
      borderRadius: 10,
      marginRight: 10,
    },
    ctaButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    input: {
      width: '80%',
      padding: 10,
      margin: 10,
      borderWidth: 1,
      backgroundColor: 'white',
      borderRadius: 5,
    },
  });
  
  export default RentalsPage;
  