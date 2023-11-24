import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

const ImageCarousel = ({ images }) => {
  return (
    <View>
      <Carousel
        data={images}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: screenWidth, height: 200 }}
          />
        )}
        
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        autoplay={true} // Enable auto-playing
        autoplayInterval={3000} // Set the interval (in milliseconds) between auto slides
      />
    </View>
  );
};

export default ImageCarousel;
