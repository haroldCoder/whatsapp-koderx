import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { API_URL } from '../config';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native'
import AddNumber from './AddNumber';

interface propsUserAndImage{
  userexist: boolean,
  handleImageUpload: () => Promise<void>,
  imageUri: any,
  LoginStart: () => void,
  name: string,
  setName: Dispatch<SetStateAction<string>>
}

const UserAndImage = ({userexist, handleImageUpload, imageUri, LoginStart, name, setName} : propsUserAndImage) =>{
  

  return(
    <View style={{padding: 25}}>
      <Text style={{color: "#FFF", fontSize: 17}}>Name</Text>
      <TextInput
            style={{
              borderBottomColor: '#FFF',
              borderBottomWidth: 1,
              color: '#FFF',
              height: 40,
              fontSize: 18,
              marginBottom: 16,
            }}
            placeholder='...Paco'
            placeholderTextColor='#BBB'
            value={name}
            onChange={(value : NativeSyntheticEvent<TextInputChangeEventData>)=>{setName(value.nativeEvent.text);
            }} 
          />
      {
        !userexist ?
        <TouchableOpacity
        style={styles.imageContainer}
        onPress={handleImageUpload}
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Text style={styles.placeholderText}>Select an Image</Text>
          )}
        </TouchableOpacity>
        : null
      }
      
    <Button style={{backgroundColor: "#222", padding: 5}} mode="contained" onPress={LoginStart}>
      Save
    </Button>
    </View>
  )
}

export default function LoginWap() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLogin, setLogin] = useState<boolean>(false);
  const [userexist, setUserexist] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [imageUri, setImageUri] = useState(null);
  const navigation = useNavigation<any>();

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Se necesita acceso a la galería de imágenes.');
      return;
    }

    const image : any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!image.cancelled) {
      const formData : any = new FormData();
      formData.append('file', {
        uri: image.uri,
        type: 'image/jpeg',
        name: 'profile_image.jpg',
        folder: "whatsApp-koderx"
      });

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/coderx/image/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.secure_url;
          setImageUri(imageUrl);
          console.log('URL de imagen subida:', imageUrl);
        } else {
          console.error('Error al subir la imagen a Cloudinary:', response.status);
        }
      } catch (error) {
        console.error('Error al subir la imagen a Cloudinary:', error);
      }
    }
  };

  const handlePhoneNumberChange = (value : any) => {
    setPhoneNumber(value);
  };


  const LoginStart = () =>{
    SecureStore.setItemAsync('phoneNumber', phoneNumber);
    SecureStore.setItemAsync('isLogin', String(isLogin));
    axios.patch(`${API_URL}server/api/user/${phoneNumber}`,{
      "Name": name
    })
    navigation.navigate("Home")
  }

  const handleSubmit = async() => {
    try {
      const response = await fetch(`${API_URL}server/api/user/${phoneNumber}`);
      if (response.status === 200) {
        setUserexist(true);
        setLogin(true);
        const data = await response.json();
        console.log(data);
      } else {
        setLogin(true);
        
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <View id='login' style={{ flex: 1, backgroundColor: '#075e54' }}>
      {
        !isLogin ?
          <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
            id='title'
          >
            <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>
              WhatsApp
            </Text>
            <View style={{ width: 24 }} />
          </View>
          <View style={{ paddingHorizontal: 16, paddingTop: 24 }}>
            <Text style={{ color: '#FFF', fontSize: 16, marginBottom: 16 }}>
              Enter your phone number
            </Text>
            <TextInput
              style={{
                borderBottomColor: '#FFF',
                borderBottomWidth: 1,
                color: '#FFF',
                height: 40,
                fontSize: 18,
                marginBottom: 16,
              }}
              placeholder='+1 123456789'
              placeholderTextColor='#BBB'
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType='phone-pad'
            />
            <Button
              mode='contained'
              onPress={handleSubmit}
              style={{ marginTop: 8, backgroundColor: '#128C7E' }}
              labelStyle={{ fontSize: 16, padding: 4 }}
            >
              Next
            </Button>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 16,
              alignSelf: 'center',
              flexDirection: 'row',
            }}
          >
            <Text style={{ color: '#BBB', fontSize: 14 }}>
              {'© '}
              {new Date().getFullYear()}
              {' WhatsApp Inc.'}
            </Text>
          </View>
        
      </>
      : <UserAndImage userexist={userexist} handleImageUpload={handleImageUpload} imageUri={imageUri} LoginStart={LoginStart} name={name} setName={setName} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 60,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  placeholderText: {
    fontSize: 16,
    color: '#BBB',
  },
});
