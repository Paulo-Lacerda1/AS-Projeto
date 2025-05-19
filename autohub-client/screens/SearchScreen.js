// screens/SearchScreen.js
import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function SearchScreen( {navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Image source={require('../assets/logo_transparente.png')} style={styles.logo} />

      {/* Campo de busca */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="What are you looking for?"
          style={styles.searchInput}
        />
        <Image source={require('../assets/filter.png')} style={styles.filterIcon} />
      </View>

      {/* Recently Searched */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recently Searched</Text>
        <Text style={styles.secondaryText}>
          You haven't searched for anything yet.{"\n"}Start exploring services or workshops now!
        </Text>
      </View>

      {/* Popular Services */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Services</Text>
        <View style={styles.grid}>
          <Text style={styles.gridItem}>Car Wash</Text>
          <Text style={styles.gridItem}>Brake Replacement</Text>
          <Text style={styles.gridItem}>Oil Change</Text>
          <Text style={styles.gridItem}>Battery Change</Text>
          <Text style={styles.gridItem}>Full Inspection</Text>
          <Text style={styles.gridItem}>Tire Rotation</Text>
        </View>
      </View>

      {/* Recommended for you */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended for you</Text>
        
        <Text style={styles.subSectionTitle}>Services</Text>
        <View style={styles.row}>
          <Text style={styles.serviceItem}>Wheel Alignment</Text>
          <Text style={styles.serviceItem}>Battery Check</Text>
        </View>

        <Text style={styles.subSectionTitle}>Workshops</Text>
        <View style={styles.recommendCard}>
          <TouchableOpacity style={styles.recommendCard} onPress={() => navigation.navigate('ProviderProfile')}>
            <Image source={require('../assets/store_logos/thompson.png')} style={styles.storeLogo} />
            <Text style={styles.recommendText}>Thompson Car Service</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.recommendCard}>
          <Image source={require('../assets/store_logos/RiverStone.png')} style={styles.storeLogo} />
          <Text style={styles.recommendText}>Riverstone Automotive</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  logo: {
    width: 180,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  subSectionTitle: {
    fontStyle: 'italic',
    fontSize: 14,
    color: '#555',
    marginTop: 12,
  },
  secondaryText: {
    color: '#555',
    textAlign: 'center',
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 10,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  serviceItem: {
    fontSize: 15,
    fontWeight: '500',
  },
  recommendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  storeLogo: {
    width: 32,
    height: 32,
    marginRight: 10,
    resizeMode: 'contain',
  },
  recommendText: {
    fontSize: 16,
  },
});
