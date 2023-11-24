// sections/Section3.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const Section3 = ({ formData, setFormData }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    // Any additional setup or permissions can go here
  }, []);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf', // Adjust the MIME type based on the allowed document types
    });

    if (result.type === 'success') {
      // Update the selected document URI in the state
      setSelectedDocument(result.uri);
      // You can also handle the file in other ways, such as uploading it to a server
      // Be sure to add error handling and additional logic as needed
    }
  };

  return (
    <View style={styles.container}>
      <Text>Upload Documents</Text>

      {/* File Upload for License Document */}
      <TouchableOpacity onPress={pickDocument}>
        <Text style={styles.input}>Select License Document</Text>
      </TouchableOpacity>
      {selectedDocument && <Text>Selected Document: {selectedDocument}</Text>}

      {/* Date Picker and Picker components go here... */}
    </View>
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

export default Section3;
