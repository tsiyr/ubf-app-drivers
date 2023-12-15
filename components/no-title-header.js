// CustomHeader.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NoTitleHeader = ({navigation}) => {


  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.header, { width: screenWidth }]}>

      <TouchableOpacity onPress={() => navigation.goBack()}>
      <View style={styles.back_container} >
      <Icon name="chevron-left" size={20} color="green" />
      </View>
      </TouchableOpacity>
    
      
      <View style={styles.icon_container} >
      <Icon name="user" size={20} color="green" />
      </View>
      
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    width: 'auto',
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
    padding: 7,
    marginVertical: 7,
    backgroundColor: 'white', 
  },
  logo: {
    marginVertical: 2,
    width: 130,
    height: 30, 
  },

  icon_container:{
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#0012',
    borderRadius: 50,
    height:40,
    width:40
  },
  back_container:{
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 12,
    //backgroundColor: '#0012',
    borderRadius: 50,
    height:40,
    width:40
  },
  title_container:{
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 12,
 
  },
});

export default NoTitleHeader;
