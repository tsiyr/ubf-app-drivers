import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Modal, StyleSheet, ActivityIndicator, Alert } from 'react-native';
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

    const [total, setTotalEarned] = useState(false);


      useEffect(() => {

        fetchRentals(user.user_id).then((res) => {   
    
          if(res){

            console.log(res)

            const total = res.reduce((sum, trip) => {
              if (trip.dispute_status.length < 4) {
                return sum + trip.fee;
              }
              return sum;
            }, 0);
            
            setTotalEarned(total);
            setRentals(res)
    
          }
    
          
        
          });
    
    
      }, []);
    
   
    const renderRentalItem = ({ item }) => (
      <View style={styles.rentalItemContainer}>
        <Image source={{ uri: url+item.image }} style={styles.vehicleImage} />
        <Text style={{marginBottom:12}}>From {item.from_loc} to {item.to_loc} </Text>
        <Text>Booking ID: {item.bookingid}</Text>
        <Text style={{marginBottom:12, fontWeight:800, fontSize: 28}}>NGN: {parseInt(item.fee).toLocaleString()}</Text>
        {item.dispute_status.length < 4 && <Text>Status: {item.phase}</Text>}
        {item.dispute_status.length > 4 && <Text style={{fontWeight:800, color:'red'}}>Status: Disputed</Text>}
        <ScrollView
          horizontal
          style={styles.ctaButtonsContainer}
          contentContainerStyle={styles.ctaButtonsContent}
        >
        
        {item.phase !== 'completed' &&

          <TouchableOpacity style={styles.ctaButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.ctaButtonText}>Trip Info</Text>
          </TouchableOpacity>}

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
         {rentals.length > 0 && total > 0 &&
          
          ( 
          <View style={{marginBottom: 18}}>
          <Text >My Earnings</Text>
          <Text style={{fontSize:28, fontWeight:800}}>NGN {parseInt(total).toLocaleString()}</Text>
          </View>

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
      borderRadius: 20
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
  