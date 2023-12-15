import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Modal, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { fetchDSTrips } from '../utils/services';
import DSTrip from './ds_trip';
import { useAuth } from '../auth';

import NoVehiclesFoundView from '../components/no_rentals_found';

const url="https://urbanfleet.biz/";
  


  const DSTrips = () => {

    
    const { user, currency } = useAuth();

    const [modalVisible, setModalVisible] = useState(false);
    ;
    const [rentals, setRentals] = useState(false);

    const [total, setTotalEarned] = useState(false);


      useEffect(() => {

        fetchDSTrips(user.user_id).then((res) => {   
    
          if(res){

           //console.log(res)

            const total = res.reduce((sum, trip) => {
             
                return sum + trip.sold_num;
              
            }, 0);
            
            setTotalEarned(total);
            setRentals(res)
    
          }
    
          
        
          });
    
    
      }, []);
    
   
    const renderRentalItem = ({ item }) => (

      <View style={styles.rentalItemContainer}>

        <Text style={{marginBottom:12}}>Trip Date: {item.trip_date}</Text>
        <Text style={{marginBottom:12}}>Route: {item.route}</Text>

        <Text style={{fontWeight: 800, fontSize: 18}}>Financials: {item.bookingid}</Text>
        <ScrollView
          horizontal
          style={styles.ctaButtonsContainer}
          contentContainerStyle={styles.ctaButtonsContent}
        >
        
           <Text style={styles.ctaButtonText}>Sales Status: {item.sales_status}</Text>
   
            <Text style={styles.ctaButtonText}>Sold: {item.sold}</Text>

            <Text style={styles.ctaButtonText}>Platform fee: {item.platform_fee}</Text>

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
         
          <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{marginVertical: 7, width: 120, fontSize:15, color: 'green', borderColor: 'green',borderRadius: 12, borderWidth: 2, padding:4, textAlign:'center'}}>New DS Trip</Text>
          </TouchableOpacity>

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


          <DSTrip showModal={modalVisible} setModal ={setModalVisible} />  
  
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
      padding: 20,
      backgroundColor:'#ccffcc',
      borderRadius: 14
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
      padding: 12
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
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: 23
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
  
  export default DSTrips;
  