// sections/Section3.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as DocumentPicker from 'expo-document-picker';

const Section3 = ({ formData, setFormData }) => {

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState("");

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setFormData({ ...formData, licenseExpiryDate: date.toISOString() });
    hideDatePicker();
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf', 
    });

     //console.log(result)

     if (!result.canceled) {

      delete result.cancelled;

      setSelectedDocument(result.assets[0].name);
      setFormData({ ...formData, licenseDocument: result.assets[0].uri });

    }
  };

  useEffect(() => {

    console.log(formData)

  }, [formData]);

  return (
    <View style={styles.container}>
      <Text>Upload Documents</Text>

      {/* File Upload for License Document */}
      <TouchableOpacity  style={{alignItems:'center'}} onPress={pickDocument}>

      {selectedDocument.length > 3 && <Text style={styles.input}>{selectedDocument}</Text>}
      {selectedDocument.length <= 3 && <Text style={styles.input}>Select License Document</Text>}

      </TouchableOpacity>


      {/* Date Picker for License Expiry Date */}
      <Text>Licence expiry date</Text>
      <TouchableOpacity style={{alignItems:'center'}} onPress={showDatePicker}>
        <Text style={styles.input}>{formData.licenseExpiryDate.length > 5 ?formData.licenseExpiryDate : 'select Licence expiry date'}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      <Text>License Category:</Text>
      <Picker
        selectedValue={formData && formData?.insuranceCategory ? formData?.insuranceCategory : ''}
        onValueChange={(itemValue) =>
          setFormData({
            ...(formData || {}),
            insuranceCategory: itemValue,
          })
        }
      >
        <Picker.Item label="Select Category" value="" />
        <Picker.Item label="Third-Party" value="third-party insurance" />
        <Picker.Item label="Vehicle-Comprehensive" value="vehicle-comprehensive insurance" />
        <Picker.Item label="Goods-in-Transit" value="Goods-in-Transit" />
      </Picker>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
    marginBottom: 200
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

export default Section3;
