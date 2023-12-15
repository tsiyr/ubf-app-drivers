import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const Rating = ({ rating, starColor }) => {
  // Determine the displayed rating based on your rounding rules
  const displayedRating = Math.round(rating * 2) / 2;

  // Render the stars
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Icon
        key={i}
        name={i <= displayedRating ? 'star' : 'star-o'} 
        size={20}
        color={starColor} 
      />
    );
  }

  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
};

export default Rating;
