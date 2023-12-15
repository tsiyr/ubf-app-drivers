// CustomHeader.js
import React from 'react';
import { View, TextInput, StyleSheet, Text, Dimensions } from 'react-native';


const VRBtns = () => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.header, { width: screenWidth }]}>

      <Text style={styles.btns}>FAQS</Text> 

      <Text style={styles.btns}>Rent Calculator</Text>

      <Text style={styles.btns}>Rent a Vehicle</Text>
     
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:28 ,
    marginBottom: 0,
  },
 
 
  btns: {
    borderWidth: 1,
    borderColor: 'green',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
  }
});

export default VRBtns;
