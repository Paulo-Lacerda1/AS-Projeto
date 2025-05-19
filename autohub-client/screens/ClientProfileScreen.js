// screens/ClientProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ClientProfileScreen({ navigation }) {
  const profile = {
    initials: 'MS',
    firstName: 'Maria',
    lastName: 'Santos',
    nif: '123456789',
    email: 'mariasantos@gmail.com',
    address: 'Rua Direita, 123, Aveiro',
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo_transparente.png')} style={styles.logo} />

      <View style={styles.header}>
        <TouchableOpacity onPress = { () => navigation.goBack()} style = {styles.navIcon}>
          <Image source={require('../assets/arrowleft.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/menu_icons/edit.png')} style={styles.navIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.profile}>
        <View style={styles.initialsCircle}>
          <Text style={styles.initials}>{profile.initials}</Text>
        </View>
        <Text style={styles.label}>First Name</Text>
        <Text style={styles.value}>{profile.firstName}</Text>

        <Text style={styles.label}>Last Name</Text>
        <Text style={styles.value}>{profile.lastName}</Text>

        <Text style={styles.label}>NIF</Text>
        <Text style={styles.value}>{profile.nif}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{profile.email}</Text>

        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{profile.address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    paddingTop: 30,
  },
  logo: {
    width: 180,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  navIcon: {
    width: 20,
    height: 20,
  },
  profile: {
    paddingHorizontal: 30,
  },
  initialsCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  initials: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
