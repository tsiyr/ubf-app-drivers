import React, { useState } from 'react';
import { View, TextInput, Button, Image, ScrollView, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Section2 = ({formData, setFormData}) => {



  const sample_photos = {
    frontView: 'https://urbanfleet.biz/assets/images/vfront.jpg',
    sideViewLeft: 'https://urbanfleet.biz/assets/images/vside_b.jpg',
    sideViewRight: 'https://urbanfleet.biz/assets/images/vside.jpg',
    interiorFront: 'https://urbanfleet.biz/assets/images/vinterior.jpg',
    interiorBack: 'https://urbanfleet.biz/assets/images/vinterior_back.jpg',
    rearView: 'https://urbanfleet.biz/assets/images/vrear.jpg',
    tires: 'https://urbanfleet.biz/assets/images/vtires.jpg',
    // Add more views as needed
  };


  const handleImagePicker = async (view) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, [view]: result });
      console.log(formData)
    }
  };

  const isViewUploaded = (view) => formData[view] !== null;

  const handleSubmit = () => {
    // Handle form submission, including formData.frontView, formData.sideViewLeft, etc.
    console.log(formData);
  };


  return (
    <ScrollView>
      <View>
     
        <Text style={{textAlign: 'center'}}> Upload Vehicle Images</Text>


        {/* Display uploaded images */}
        {Object.keys(formData).map((view, index) => (
          formData[view] && (
            <View key={index} style={styles.photo_container}>
              <Image
                source={{ uri: formData[view].uri }}
                style={{ width: 200, height: 200, borderRadius: 34  }}
              />
              
                <Button title={`Update ${view} Photo`} onPress={() => handleImagePicker(view)} />
             
            </View>
          )
        ))}

        {/* Buttons to pick images for each view */}
      
        {Object.keys(formData).map((view, index) => (
          !isViewUploaded(view) && (
            <View key={index} style={styles.photo_container}>
              <Image
                source={{ uri: sample_photos[view] }} 
                style={{ width: 200, height: 200, borderRadius: 34 }}
              />
              <Button title={`Upload ${view} Photo`} onPress={() => handleImagePicker(view)} />
            </View>
          )
        ))}

        {/* Add more buttons for additional views as needed */}

        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  photo_container: {
    flex: 1,
    flexDirection:'col',
    width: '100%',
    marginVertical: 23,
    alignItems:'center',
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
    width: '100%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});


export default Section2;
