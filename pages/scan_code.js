import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useAuth } from '../auth';
import { fetchTicketData } from '../utils/services';

const QRCodeScanner = () => {

     
  const { user, currency } = useAuth();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [tk_id, setData] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  
  useEffect(() => {

      if(tk_id.length > 3){
           
        console.log(tk_id);

            fetchTicketData(user.user_id, tk_id).then((res) => {   
    
                if(res){

                    //console.log(res[0].msg, "jgjgj")

                    //return
                        
                        if(res[0].msg.length > 4){

                            Alert.alert (
                                'STATUS',
                                res[0].msg
                            )
                        }else{
                            Alert.alert (
                                'TICKET INFO',
                                `Date: ${res[0].start_date}\nTicket used: ${res[0].used} of ${res[0].bought}`
                            )

                        }
                
                    }
        
          });
     
      }else{

          //
      }

  }, [tk_id]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    if (!data.startsWith("tk_id")) {

        Alert.alert(
            'Invalid Ticket ID!',
            `${data}`,
            [{ text: 'OK', onPress: () => setScanned(false) }]
          );

    }else{
        Alert.alert(
            'QR Code Scanned!',
            `Fetching Ticket Data`,
            [{ text: 'OK', onPress: () => setScanned(false) }]
          );

          setData(data)
    }

  
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (

        <View style={styles.container}>

            {!scanned &&
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            }

            {scanned && (
                <Text style={styles.scanText}>Scanned successfully! Tap to scan again.</Text>
            )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  scanText: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default QRCodeScanner;
