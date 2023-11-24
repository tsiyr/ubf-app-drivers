import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose another icon library if desired

const Rating = ({ rating, starColor }) => {
  // Determine the displayed rating based on your rounding rules
  const displayedRating = Math.round(rating * 2) / 2;

  // Render the stars
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Icon
        key={i}
        name={i <= displayedRating ? 'star' : 'star-o'} // You can choose different FontAwesome icons
        size={20}
        color={starColor} // Pass the star color as a prop
      />
    );
  }

  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
};

export default Rating;
