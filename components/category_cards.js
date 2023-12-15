import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity,  ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the necessary navigation hook



const CategoryCards = () => {

  const navigation = useNavigation(); // Get the navigation prop using useNavigation

  const handleCardPress = (category) => {
    navigation.navigate('Category', { category });
  };

  
const Card = ({ imageUrl, text, title, cat }) => (
    
  <TouchableOpacity style={styles.card}
  key={title}
  onPress={() => handleCardPress(cat)}
>
  <View >
    <Image source={imageUrl} style={styles.cardImage} resizeMode="contain" />
    <Text style={styles.cardText}>{text}</Text>
  </View>

  </TouchableOpacity>
);


  const cardData = [
    { imageSource: require('../assets/categories/car.png'), text: 'Cars', cat: 'Car' }, 
    { imageSource: require('../assets/categories/suv.png'), text: 'SUVs', cat: 'SUV' },
    { imageSource: require('../assets/categories/van.png'), text: 'Vans', cat: 'VAN' },
    { imageSource: require('../assets/categories/bus.png'), text: 'Buses', cat: 'BUS' },
    { imageSource: require('../assets/categories/truck.png'), text: 'Trucks', cat: 'TRUCK' },
    { imageSource: require('../assets/categories/tractor.png'), text: 'Earth Movers', cat: 'EARTH' },
  ];
  

  return (
    
    <View contentContainerStyle={styles.container}>
      <View style={styles.row}>
        {cardData.slice(0, 3).map((data, index) => (
          <Card key={index} title={index} imageUrl={data.imageSource} text={data.text} cat={data.cat} />
        ))}
      </View> 
      <View style={styles.row}>
        {cardData.slice(3, 6).map((data, index) => ( 
          <Card key={index} title={index} imageUrl={data.imageSource} text={data.text} cat={data.cat} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
   
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
    marginBottom: 8,
  },
  card: {
    width: '31%', // 3 cards in a row, with some spacing
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 100, 
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardText: {
    padding: 2,
    textAlign: 'center',
  },
});

export default CategoryCards;
