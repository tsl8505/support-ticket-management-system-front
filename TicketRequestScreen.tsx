// TicketRequestScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import ImagePicker, { ImagePickerResponse,  launchImageLibrary } from 'react-native-image-picker';

const TicketRequestScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);



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
  

  const handleSubmit = () => {
    // Implement logic to submit the support ticket request
    // You can use an API service or any other method to handle the submission
    console.log('Submitting ticket request...');
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
      <Button title="Pick Image" onPress={handleImagePicker} />
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
