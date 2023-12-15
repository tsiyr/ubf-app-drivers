import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, View, Text, Image, FlatList, TouchableOpacity, Modal, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { fetchUserVehicles, toggle_vh } from '../utils/services';
import NoVehiclesFoundView from '../components/no_vehicle_found';
import { useAuth } from '../auth';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { countryCurrencyMapping, getCountryNameByCode} from '../utils/variables';
import * as Localization from 'expo-localization';

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
    const [vcurrency, setCurrency] = useState(false);

    const [currentTab, setCurrentTab] = useState(1);
    const [formData, setFormData] = useState({
      // Initial form data
      modelName: '',
      vehicleMake: '',
      vehicleMakeOther: '',
      category: '',
      modelYear: '',
      regPlateNumber: '',
      vinNumber: '',
      usageType: '',
      seatingCapacity: '',
      tonnage: 'na',
      fuelType: '',
      hasAirConditioner: false,
      hasSeatBelt: false,
      hasSpareTire: false,
      licenseDocument: '',
      licenseExpiryDate: '',
      insuranceCategory: '',
      overview: '',
      vcountry: '',
      vstate: '',
      vlga: '',
      vcurrency: '',
      vprice:'',
    });

    const [imgData, setImgData] = useState({

      frontView: null,
      sideViewLeft: null,
      sideViewRight: null,
      interiorFront: null,
      interiorBack: null,
      rearView: null,
      tires: null,
    });


    const handleNext = () => {
      setCurrentTab(currentTab + 1);
    };
  
    const handlePrevious = () => {
      setCurrentTab(currentTab - 1);
    };

    useEffect(() => {

      async function getUserLocation() {
        // Get the user's locale
        const userLocale = Localization.locale;
  
        const [userCountry, userCurrency] = userLocale.split('-');
  
        setCurrency(countryCurrencyMapping[userCurrency]); 

        setFormData({ ...formData, vcurrency: countryCurrencyMapping[userCurrency] })
        
        console.log(countryCurrencyMapping[userCurrency])
  
      }
  
      getUserLocation();
  
    }, []);

    const sendImagesAndDataToServer = async (imageObject, formObject) => {

        const emptyFields = [];
    
        for (const key in formObject) {
          if (formObject[key] === '') {
            emptyFields.push(key);
          }
        }
    
        for (const key in imageObject) {
          if (imageObject[key] === null) {
            emptyFields.push(key);
          }
        }
    
        if (emptyFields.length > 0) {
          const errorMessage = `Please provide the following data: ${emptyFields.join(', ')}`;
          Alert.alert('Missing Data', errorMessage)
          
          return;
        }
      
    

      const imageKeys = Object.keys(imageObject);
    
      const formData = new FormData();
    
      formData.append('user_id', user.user_id); //
      formData.append('account_type', user.account_type); //
      formData.append('group_id', user.groupID); //
      
      formData.append('vtitle', formObject.modelName); //

      formData.append('vtype', formObject.category); //
      formData.append('vfuel', formObject.fuelType); //

      formData.append('vyear', formObject.modelYear); //

      formData.append('vseats', formObject.seatingCapacity);  //
      formData.append('vuse', formObject.usageType); //
      formData.append('vtonnage', formObject.tonnage);//

      formData.append('vprice', formObject.vprice);
      formData.append('voverview', formObject.overview); //

      formData.append('vstate', formObject.vstate);//
      formData.append('vcountry', formObject.vcountry);//
      formData.append('vlga', formObject.vlga);//

      formData.append('vprice', parseFloat(formObject.vprice));//

      formData.append('currency_code', vcurrency);//

      formData.append('seatbelt', formObject.hasSeatBelt); //
      formData.append('spareTire', formObject.hasSpareTire); //
      formData.append('ac', formObject.hasAirConditioner); //

      formData.append('vrn', formObject.regPlateNumber); //
      formData.append('vin', formObject.vinNumber); //

      formData.append('brandName', formObject.vehicleMake); //
      formData.append('brandOthers', formObject.vehicleMakeOther); //

      formData.append('license_expiry', formObject.licenseExpiryDate); //

      formData.append('insurance_category', formObject.insuranceCategory); //


      formData.append('licenseDocument', {
          uri: formObject.licenseDocument,
          type: 'image/jpeg', 
          name: 'licenseDocument.jpg',
        });
    
      
      imageKeys.forEach((key) => {
        const fileUri = imageObject[key];
        formData.append(key, {
          uri: fileUri,
          type: 'image/jpeg', 
          name: `${key}.jpg`,
        });
      });


    
      try{  
        
        const response = await fetch('https://urbanfleet.biz/list-vehicle-api.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
    
        const responseText = await response.text(); // Log the raw response text
        console.log('Raw response:', responseText);
    
         const data = JSON.parse(responseText);
         if(data.status && data.status == true){
            
            //
         }

      } catch (error) {
         console.error('Error uploading image:', error);
      }


    };


    
  
    const handleSubmit = () => {
      // Submit the entire form data
     // console.log(imgData)
     // console.log(formData)

      sendImagesAndDataToServer(imgData, formData);

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
  

      const toggleVh = (vh_id) => {

        
        toggle_vh(vh_id).then((res) => {    
    
          if(res){
            
              refresh_vh()
    
          }
    
            console.log(res)
        
          });
      }


      const refresh_vh = () => {

        fetchUserVehicles(user.user_id).then((res) => {    
    
          if(res){
            
            console.log( res)
            setVehicles(res)
    
          }
    
            //console.log(res)
        
          });
      }


      useEffect(() => {

        fetchUserVehicles(user.user_id).then((res) => {    
    
          if(res){
            
            console.log(user.user_id, res)
            setVehicles(res)
    
          }
    
            //console.log(res)
        
          });
    
    
      }, []);


      useEffect(() => {

         //console.log(imgData)
         //console.log(formData)
    
    
      }, [imgData, formData]);


      const getStatusStyle = (status) => {
        return String(status).toLowerCase().includes('online')
          ? styles.onlineStatus
          : styles.offlineStatus;
      };
    
    
   
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
          <TouchableOpacity style={[styles.ctaButton, getStatusStyle(item.status)]} onPress={() => toggleVh(item.id)}>
             <Text style={[styles.ctaButtonText]}>{item.status}</Text>
          </TouchableOpacity>
          
        
        
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

    onlineStatus: {
      backgroundColor: 'red', 
    },

    offlineStatus: {
      backgroundColor: 'green', 
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
  