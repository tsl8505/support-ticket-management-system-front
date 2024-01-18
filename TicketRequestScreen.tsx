// TicketRequestScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet } from 'react-native';

import { useAuth } from './src/context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

import { ImagePickerResponse,  launchImageLibrary } from 'react-native-image-picker';
import { submitRequest } from './apiService'; 
type TicketRequestScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'TicketRequest'>;
  };

const TicketRequestScreen: React.FC<TicketRequestScreenProps> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const { email } = useAuth();

  const handleImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false, // Set to true if you want to include base64 data
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error Code: ', response.errorCode);
          console.log('ImagePicker Error Message: ', response.errorMessage);
        } else {
            if (response.assets && response.assets.length > 0) {
                setImageUri(response.assets?.[0]?.uri ?? null);
            } else {
                console.warn('No assets found in the response');
            }
        }
      }
    );
  };
  

  const handleSubmit = async() =>  {
    if (!title || !description) {
        Alert.alert('Error', 'Please fill in title and description fields before submitting.');
        return;
    }
    try {
        const result = await submitRequest( email, title, description, imageUri);
        console.log('Request submitted successfully:', result);
        navigation.navigate('TicketStatus'); // Use navigation prop to navigate
        navigation.reset({
            index: 0,
            routes: [{ name: 'TicketStatus' }],
          });
      } catch (error) {
        // Handle login error, show error message, etc.
        console.error('Error submitting request:', error);
      }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit a Support Ticket</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <Button title="Upload an Image" onPress={handleImagePicker} />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    borderRadius: 5,
    width: '100%',
  },
});

export default TicketRequestScreen;
