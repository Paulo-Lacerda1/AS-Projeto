// screens/HomeScreen.js
import React, { useState, useCallback } from 'react';
import { ScrollView, Image, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const navigation = useNavigation();

  const goToDetail = (title, store, description, image) => {
    navigation.navigate('ServiceDetail', {
      title,
      store,
      description,
      image,
    });
  };

  const [bookings, setBookings] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadBookings = async () => {
        try {
          const stored = await AsyncStorage.getItem('bookings');
          if (stored) {
            const allBookings = JSON.parse(stored);
            // filtrar só os não concluídos
            const activeBookings = allBookings.filter(b => !b.completed);
            setBookings(activeBookings);
          } else {
            setBookings([]);
          }
        } catch (e) {
          console.error('Erro ao carregar agendamentos', e);
        }
      };


      loadBookings();
    }, [])
  );

  const renderBooking = ({ item, index }) => (
    <View style={styles.bookingCardRow}>
      <TouchableOpacity
        style={styles.bookingCard}
        onPress={() =>
          navigation.navigate('BookingDetailsScreen', { booking: item, index })
        }
      >
        <Text style={styles.bookingTitle}>{item.title} - {item.store}</Text>
        <Text style={styles.bookingDate}>
          {new Date(item.date).toLocaleDateString()} às{' '}
          {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.checkButton}
        onPress={() => navigation.navigate('ReviewScreen', { store: item.store })}
      >
        <Ionicons name="checkmark-circle" size={28} color="#4CAF50" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Logotipo */}
      <Image source={require('../assets/logo_transparente.png')} style={styles.logo} />
      <ScrollView contentContainerStyle={styles.scrollContent}>


        {/* Scheduled services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image source={require('../assets/Calendar.png')} style={styles.icon} />
            <Text style={styles.sectionTitle}>Scheduled services</Text>
            <Text style={styles.dots}>•••</Text>
          </View>

          <View style={styles.sectionContent}>
            {bookings.length === 0 ? (
              <>
                <Text style={styles.noServices}>You have no upcoming services.</Text>
                <View style={styles.searchContainer}>
                  <Image source={require('../assets/Search_grey.png')} style={styles.icon} />
                  <Text style={styles.searchText}>Search service</Text>
                </View>
              </>
            ) : (
              <FlatList
                data={bookings}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderBooking}
              />
            )}
          </View>
        </View>


        {/* Offers and deals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image source={require('../assets/Tag.png')} style={styles.icon} />
            <Text style={styles.sectionTitle}>Offers & Deals</Text>
            <Text style={styles.dots}>•••</Text>
          </View>
          <View style={styles.sectionContent}>
            <View style={styles.offersContainer}>
              <TouchableOpacity
                onPress={() =>
                  goToDetail(
                    "20% OFF on inspections",
                    "Northside Auto Repair",
                    "Get your vehicle inspected by certified mechanics with a 20% discount. Ensure your car is in top condition before your next trip.",
                    require('../assets/store_logos/Northside.png')
                  )
                }
              >
                <View style={styles.offerCard}>
                  <Image source={require('../assets/store_logos/Northside.png')} style={styles.offerLogo} />
                  <View style={styles.offerTextContainer}>
                    <Text style={styles.offerText}>20% OFF on inspections until April 20!</Text>
                    <Text style={styles.offerStore}>Northside Auto Repair</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  goToDetail(
                    "15% OFF on oil changes",
                    "Riverstone Automotive",
                    "Take advantage of 15% off on premium oil changes. Keep your engine healthy and running smoothly with expert service.",
                    require('../assets/store_logos/RiverStone.png')
                  )
                }
              >
                <View style={styles.offerCard}>
                  <Image source={require('../assets/store_logos/RiverStone.png')} style={styles.offerLogo} />
                  <View style={styles.offerTextContainer}>
                    <Text style={styles.offerText}>15% OFF on oil changes until April 25!</Text>
                    <Text style={styles.offerStore}>Riverstone Automotive</Text>
                  </View>
                </View>
              </TouchableOpacity>

            </View>
          </View>
        </View>

        {/* Recommended near you */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image source={require('../assets/Calendar.png')} style={styles.icon} />
            <Text style={styles.sectionTitle}>Recommended Near You</Text>
            <Text style={styles.dots}>•••</Text>
          </View>
          <View style={styles.sectionContent}>
            <View style={styles.recommendedContainer}>
              <View style={styles.recommendedCard}>
                <Image source={require('../assets/store_logos/thompson.png')} style={styles.offerLogo} />
                <Text style={styles.recommendedText}>Northside Auto Repair</Text>
              </View>
              <View style={styles.recommendedCard}>
                <Image source={require('../assets/store_logos/RiverStone.png')} style={styles.offerLogo} />
                <Text style={styles.recommendedText}>Riverstone Automotive</Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    width: '100%',

  },
  logo: {
    width: 180,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
    width: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
  },
  sectionContent: {
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  offersContainer: {
    justifyContent: 'space-between',
    width: '100%',
  },
  offerCard: {
    marginBottom: 5,
    bottomBorderWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  offerLogo: {
    borderRadius: 25
  },

  bookingCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 5,
    marginBottom: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  bookingCard: {
    flex: 1,
  },

  checkButton: {
    marginLeft: 10,
  },

});
