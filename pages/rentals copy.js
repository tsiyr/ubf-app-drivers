import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const dummyRentals = [
    {
      id: '1',
      vehicleImage: 'https://picsum.photos/300/200?random=1',
      transactionId: '12345',
      amountPaid: '$50.00',
      status: 'Not Started',
    },
    {
      id: '2',
      vehicleImage: 'https://picsum.photos/300/200?random=2',
      transactionId: '67890',
      amountPaid: '$75.00',
      status: 'Ongoing',
    },
    {
      id: '3',
      vehicleImage: 'https://picsum.photos/300/200?random=3',
      transactionId: '98765',
      amountPaid: '$60.00',
      status: 'Completed',
    },
    {
      id: '4',
      vehicleImage: 'https://picsum.photos/300/200?random=4',
      transactionId: '54321',
      amountPaid: '$80.00',
      status: 'Ongoing',
    },
    {
      id: '5',
      vehicleImage: 'https://picsum.photos/300/200?random=5',
      transactionId: '13579',
      amountPaid: '$70.00',
      status: 'Not Started',
    },
    {
      id: '6',
      vehicleImage: 'https://picsum.photos/300/200?random=6',
      transactionId: '24680',
      amountPaid: '$55.00',
      status: 'Completed',
    },
    {
      id: '7',
      vehicleImage: 'https://picsum.photos/300/200?random=7',
      transactionId: '11223',
      amountPaid: '$90.00',
      status: 'Not Started',
    },
    {
      id: '8',
      vehicleImage: 'https://picsum.photos/300/200?random=8',
      transactionId: '99887',
      amountPaid: '$65.00',
      status: 'Ongoing',
    },
    {
      id: '9',
      vehicleImage: 'https://picsum.photos/300/200?random=9',
      transactionId: '45678',
      amountPaid: '$85.00',
      status: 'Completed',
    },
    {
      id: '10',
      vehicleImage: 'https://picsum.photos/300/200?random=10',
      transactionId: '76543',
      amountPaid: '$95.00',
      status: 'Ongoing',
    },
  ];
  

const RentalsPage = () => {


  const [modalVisible, setModalVisible] = useState(false);

  const renderRentalItem = ({ item }) => (
    <View style={styles.rentalItemContainer}>
      <Image source={{ uri: item.vehicleImage }} style={styles.vehicleImage} />
      <Text>Transaction ID: {item.transactionId}</Text>
      <Text>Amount Paid: {item.amountPaid}</Text>
      <Text>Status: {item.status}</Text>
      <TouchableOpacity
        style={styles.ctaButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.ctaButtonText}>Driver Info</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.ctaButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.ctaButtonText}>Rate</Text>
      </TouchableOpacity>
      {/* Add other CTAs here with their respective modals */}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyRentals}
        keyExtractor={(item) => item.id}
        renderItem={renderRentalItem}
      />

      {/* Driver Info Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text>Driver Information Modal</Text>
          {/* Add driver information content here */}
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  rentalItemContainer: {
    marginBottom: 20,
  },
  vehicleImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  ctaButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  ctaButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default RentalsPage;
