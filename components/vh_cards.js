import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the necessary navigation hook



const VhCards = () => {

  const navigation = useNavigation(); // Get the navigation prop using useNavigation

  const handleCardPress = (category) => {
    navigation.navigate('Category', { category });
  };

  
const Card = ({ imageUrl, text, title }) => (
    
  <TouchableOpacity style={styles.card}
  key={title}
  onPress={() => handleCardPress(text)}
>
  <View >
    <Image source={imageUrl} style={styles.cardImage} resizeMode="contain" />
    <Text style={styles.cardText}>{text}</Text>
  </View>

  </TouchableOpacity>
);


  const cardData = [
    { imageSource: require('../assets/categories/car.png'), text: 'Cars' }, 
    { imageSource: require('../assets/categories/suv.png'), text: 'SUVs' },
    { imageSource: require('../assets/categories/van.png'), text: 'Vans' },
    { imageSource: require('../assets/categories/bus.png'), text: 'Buses' },
    { imageSource: require('../assets/categories/truck.png'), text: 'Trucks' },
    { imageSource: require('../assets/categories/tractor.png'), text: 'Earth Movers' },
  ];
  

  return (
    
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        {cardData.slice(0, 2).map((data, index) => (
          <Card key={index} title={index} imageUrl={data.imageSource} text={data.text} />
        ))}
      </View> 
      <View style={styles.row}>
        {cardData.slice(2, 4).map((data, index) => ( 
          <Card key={index} title={index} imageUrl={data.imageSource} text={data.text} />
        ))}
      </View>

      <View style={styles.row}>
        {cardData.slice(4, 6).map((data, index) => ( 
          <Card key={index} title={index} imageUrl={data.imageSource} text={data.text} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: '49%', // 3 cards in a row, with some spacing
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
    height: 100, // Adjust the image height as needed
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardText: {
    padding: 2,
    textAlign: 'center',
  },
});

export default VhCards;
