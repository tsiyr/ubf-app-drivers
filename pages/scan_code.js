import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Modal, TouchableOpacity, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useAuth } from '../auth';
import { fetchTicketData} from '../utils/services';

const QRCodeScanner = () => {

     
  const { user, currency } = useAuth();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [used, setUsed] = useState(0);
  const [bought, setBought] = useState(0)
  const [tk_date, setTripDate] = useState(null);
  const [tk_id, setTicketID] = useState(0);
  const [max, setMax] = useState(0);

  const [to_use, setToUse] = useState(1);

  const [ticket_modal, showTicketModal] = useState(false);


  useEffect(() => {

    (async () => {

      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');

    })();

  }, []);


  useEffect(() => {

    if(bought > 0){
    
        showTicketModal(true)

    }

  }, [bought]);

  const handleCloseModal = () => {

        showTicketModal(false)
  }


  const admit_ticket = async (tk_mn, max_m=0) => {

       const formData = new FormData();

        const matches = tk_mn.match(/\d+/);

        const tk_mn_ = matches ? parseInt(matches[0], 10) : 0;


       if(tk_mn_ > 0){

        formData.append('tk_id', tk_mn_); //

       }else{

        return

       }

       let _max = max_m > 0 ? max_m : max

        if(to_use > _max){

          Alert.alert(`You cannot admit more than the ${_max} ticket(s) available`)
          return;

        }
 
       
       formData.append('tk_num', to_use); //
  
     
       try{  
         
         const response = await fetch('https://urbanfleet.biz/includes/admit_ticket.php', {
           method: 'POST',
           headers: {
             'Content-Type': 'multipart/form-data',
           },
           body: formData,
         });
     
              const responseText = await response.text(); 

              console.log('Raw response:', responseText);
          
                const data = JSON.parse(responseText);

                console.log('js response:', data)

                if(data.success && data.success == true){
                    
                    Alert.alert('Done!', 'Your Ticket has been succesfully admitted.' )

                    showTicketModal(false);
                }
 
       } catch (error) {
          console.error('Error uploading image:', error);
       }
 
 

    
};



  
  useEffect(() => {

      if(tk_id.length > 3){
           
        //console.log(tk_id);

            fetchTicketData(user.user_id, tk_id).then((res) => {   
    
                if(res){

                    console.log(res[0])

                    //return
                        
                        if(res[0].msg.length > 4){

                            Alert.alert (
                                'STATUS',
                                res[0].msg
                            )
                        }else{

                          if(res[0].bought < 2 && res[0].used < 1 ){

                                  Alert.alert(
                                    'Ticket Info', 
                                    `Trip Date: ${res[0].start_date} \nTicket Status: ${res[0].used} of ${res[0].bought} \n`,
                            
                                    [
                                     
                                      {
                                        text: `Admit this Ticket`,
                                        onPress: () => {
                                            admit_ticket(res[0].tk_id, res[0].max)
                                        },
                                      },
                                      
                                    ],
                                    { cancelable: true }
                                  );


                          }else if(( parseInt(res[0].bought) === parseInt(res[0].used) ) || parseInt(res[0].max) < 0){

                            Alert.alert(

                              'Ticket Info', 
                              `Trip Date: ${res[0].start_date} \nTicket Status: USED \n`,
                            );


                    }else{

                                setMax(res[0].max)
                                setUsed(res[0].used)
                                setBought(res[0].bought),
                                setTripDate(res[0].start_date)
                                setTicketID(res[0].tk_id)

                          }

                       


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

          setTicketID(data)
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

<Modal visible={ticket_modal} animationType="slide">

<TouchableOpacity onPress={() => handleCloseModal()}  style={{marginTop: 45, padding: 12}}>
    <Text>Save & Close</Text>
  </TouchableOpacity>
   
   <View style={{marginHorizontal: 14, marginVertical: 14}}>
      
      <Text>Enter number of ticket to admit out of the available {max} ticket(s):</Text>
      <TextInput style={{borderWidth:1, borderRadius:14, borderColor:'green', height:40, marginTop: 12 }}
        value={to_use}
        onChangeText={(text) => setToUse(text)}
        placeholder="1"
        keyboardType="numeric"
      />

     <TouchableOpacity onPress={() => admit_ticket(tk_id)}  style={{marginTop: 15, padding: 12, backgroundColor: 'green', borderRadius: 14, width: 120 }}>
        <Text style={{color: 'white', fontWeight: 800}}>Admit Ticket</Text>
      </TouchableOpacity>
      
   </View>

</Modal>

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
