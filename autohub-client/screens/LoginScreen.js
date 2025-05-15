import { StatusBar } from 'expo-status-bar';
import {  View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';

const MOCK_USER = {
  email: 'ana@autohub.com',
  password: '123456'
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Erro', 'Email or password is incorrect');
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo_transparente.png')} style={styles.logo} />
      
      <View style = {styles.form}>
        <TextInput
          style = {styles.input}
          placeholder = "Email"
          value = {email}
          onChangeText = {setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
        />

        <TextInput
          style = {styles.input}
          placeholder = "Senha"
          value = {password}
          onChangeText = {setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.link}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>

      </View>
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
  }
});