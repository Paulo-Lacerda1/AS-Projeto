import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterUserScreen({ navigation }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
    nif: '',
    phone: '',
    address: ''
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    const { email, password } = form;

    if (!email || !password) {
      alert('Email and password are required');
      return;
    }

    try {
      const userData = JSON.stringify({ email, password });
      await AsyncStorage.setItem('user', userData);
      console.log('User data saved successfully:', userData);
      navigation.navigate('EmailConfirmation');
    } catch (error) {
      console.error('Failed to save data.', error);
      alert('Failed to save data'); 
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo_transparente.png')} style={styles.logo} />
      <Text style={styles.title}>Create account</Text>

      {['firstName','lastName','email','password','confirm','nif','phone','address'].map(field => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          secureTextEntry={field.includes('password')}
          onChangeText={text => handleChange(field, text)}
        />
      ))}

     
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  logo: {
    width: 180,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20
  },
  form: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 2
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 12,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  link: {
    color: '#000',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 10
  },
   button: {
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});