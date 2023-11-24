import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, View, Text, Image, FlatList, TouchableOpacity, Modal, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { fetchUserVehicles } from '../utils/services';
import NoVehiclesFoundView from '../components/no_vehicle_found';
import { useAuth } from '../auth';
import Icon from 'react-native-vector-icons/FontAwesome'; // replace with the correct library

import Section1 from '../list_vh_sections/section_1';
import Section2 from '../list_vh_sections/section_2';
import Section3 from '../list_vh_sections/section_3';
import Section4 from '../list_vh_sections/section_4';


const url="https://urbanfleet.biz/";
  

  const VehiclesPage = () => {

    
    const { user, currency } = useAuth();

    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('List Vehicle');
    //const [isLoading, setIsLoading] = useState(true);
    const [vehicles, setVehicles] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [currentTab, setCurrentTab] = useState(1);
    const [formData, setFormData] = useState({
      // Initial form data
      vehicleMake: '',
      vehicleModel: '',
      category: '',
      modelYear: '',
      regPlateNumber: '',
      vinNumber: '',
      usageType: '',
      seatingCapacity: '',
      tonnage: '',
      fuelType: '',
      hasAirConditioner: false,
      hasSeatBelt: false,
      hasSpareTire: false,
      licenseCategory: '',
      licenseExpiryDate: '',
      frontView: '',
      sideViewLeft: '',
      sideViewRight: '',
      interiorFront: '',
      interiorBack: '',
      rearView: '',
      tires: '',
      // ... add other fields as needed
    });

    const [imgData, setImgData] = useState({
      name: '',
      description: '',
      frontView: null,
      sideViewLeft: null,
      sideViewRight: null,
      interiorFront: null,
      interiorBack: null,
      rearView: null,
      tires: null,
      // Add more views as needed
    });


    const handleNext = () => {
      // Validate and save data
      // Move to the next tab
      setCurrentTab(currentTab + 1);
    };
  
    const handlePrevious = () => {
      // Move to the previous tab
      setCurrentTab(currentTab - 1);
    };
  
    const handleSubmit = () => {
      // Submit the entire form data
      console.log(formData);
      // You can send this data to your server or perform other actions
    };

    const toggleForm = () => {

      setShowForm(!showForm);

    };
  
    const renderCurrentSection = () => {
      switch (currentTab) {
        case 1:
          return <Section1 formData={formData} setFormData={setFormData} />;
        case 2:
          return <Section2 formData={imgData} setFormData={setImgData} />;
        case 3:
          return <Section3 formData={formData} setFormData={setFormData} />;
        case 4:
          return <Section4 formData={formData} setFormData={setFormData} />;
        default:
          return null;
      }
    };
  


      useEffect(() => {

        fetchUserVehicles(user.user_id).then((res) => {    
    
          if(res){
            
            //console.log(user.user_id, res)
            setVehicles(res)
    
          }
    
            //console.log(res)
        
          });
    
    
      }, []);
    
   
    const renderRentalItem = ({ item }) => (
      <View style={styles.rentalItemContainer}>
        <Image source={{ uri: item.image }} style={styles.vehicleImage} />
        <Text style={{marginBottom:12, fontWeight:800, fontSize: 24}}>{(item.name)} ({item.reg_number})</Text>
        <Text style={{marginBottom:12}}>Driver: {item.driver}</Text>

        <ScrollView
          horizontal
          style={styles.ctaButtonsContainer}
          contentContainerStyle={styles.ctaButtonsContent}
        >
          <TouchableOpacity style={styles.ctaButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.ctaButtonText}>{item.status}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Driver Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Update Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Maintenance history</Text>
          </TouchableOpacity>
          {/* Add more CTAs as needed */}
        </ScrollView>
      </View>
    );
  
    return (
      <View style={styles.container}>
         
         <View style={{  alignItems: 'center', padding: 4, marginBottom: 12, backgroundColor: 'green', borderWidth: 1,
            borderRadius: 30, borderColor: 'green'}}>
           <TouchableOpacity  onPress={toggleForm} >
          <Text style={{ 
            textAlign:'center', 
            width: '80%', 
            padding: 7, 
            color: 'white',
            fontSize: 16,
            fontWeight: 800
           
            }}>List vehicle</Text>
            </TouchableOpacity>
         </View>
            
      {!vehicles &&
          
          (
            <ActivityIndicator style={{padding:100}} size="large" color="#0000ff" />
          )
          }

      {vehicles.length < 1 &&
          
          (
            <NoVehiclesFoundView />
          )
          }

        {vehicles.length > 0 &&
          
          ( 
        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.id}
          renderItem={renderRentalItem}
        />

        )
      }
  
        {/* Driver Info Modal */}
        
        <Modal
                            //transparent={true}
                            visible={showForm}
                            animationType="slide"
                            onRequestClose={toggleForm}
                        >
                            <View style={styles.modalContainer}>
      
                            <View style={styles.modalHeader}>

                            <Text style={{padding:12, fontWeight: 800, fontSize: 20}}>List Vehicle</Text>

                                <TouchableOpacity onPress={toggleForm} style={{padding:12}}>
                                <Icon name="times" size={20} color="black" />
                                </TouchableOpacity>

                            </View>

                            <View style={styles.modalContent}>
         
    
      {renderCurrentSection()}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 34 }}>
        {currentTab > 1 && (

          <TouchableOpacity onPress={handlePrevious}>
          <Icon name="chevron-left" size={30} color="black" />
        </TouchableOpacity>

        )}

        {currentTab < 2 && (

        <TouchableOpacity >
        <Icon name="chevron-left" size={30} color="black" />
        </TouchableOpacity>

        )}
        {currentTab < 3 ? (

         <TouchableOpacity onPress={handleNext}>
          <Icon name="chevron-right" size={30} color="black" />
        </TouchableOpacity>

        ) : (
          <TouchableOpacity onPress={handleSubmit} style={{backgroundColor: 'green', padding: 12, paddingHorizontal: 24, borderRadius: 23}} >
          <Text style={{color:'white'}}>Submit</Text>
        </TouchableOpacity>
        )}
      </View>
   
  


                            </View>

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
      borderRadius: 14
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
      flexDirection:'col',
      justifyContent:'flex-start',
      backgroundColor: 'rgba(255, 255, 255, 0.98)', // Background color of the modal
      paddingVertical: 24,
      zIndex: 1000,
      
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 3,
    },
    modalContent: {
      flex: 1,
      flexDirection:'col',
      justifyContent: 'flex-start',
      alignContent:'flex-start'
    },
    input: {
      width: '80%',
      padding: 10,
      margin: 10,
      borderWidth: 1,
      backgroundColor: 'white',
      borderRadius: 5,
    },
    nav:{
       
      margin: 23,
      color: 'red'
    }
  });
  
  export default VehiclesPage;
  