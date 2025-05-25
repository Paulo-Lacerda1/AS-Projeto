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
      image,w
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
          <Image source={require('../assets/chevron_down.png')} style={styles.chevronIcon} />
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
          <Image source={require('../assets/chevron_down.png')} style={styles.chevronIcon} />
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
              <TouchableOpacity style={styles.recommendedCard} onPress={() => navigation.navigate('ProviderProfile')}>
                <Image source={require('../assets/store_logos/thompson.png')} style={styles.offerLogo} />
                <View style={styles.recommendedTextContainer}>
                  <Text style={styles.recommendedText}>Thompson Car Service</Text>
                  <View style={styles.recommendedTextLine}>
                    <Image source={require('../assets/map_pin.png')} style={styles.icon} />
                    <Text style={styles.distanceText}>2.1 km away</Text>
                  </View>
                  <View style={styles.recommendedTextLine}>
                    <Image source={require('../assets/star.png')} style={styles.icon} />
                    <Text style={styles.distanceText}>4.5</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.recommendedCard}>
                <Image source={require('../assets/store_logos/RiverStone.png')} style={styles.offerLogo} />
                <View style={styles.recommendedTextContainer}>
                  <Text style={styles.recommendedText}>Riverstone Automotive</Text>
                  <View style={styles.recommendedTextLine}>
                    <Image source={require('../assets/map_pin.png')} style={styles.icon} />
                    <Text style={styles.distanceText}>1.6 km away</Text>
                  </View>
                  <View style={styles.recommendedTextLine}>
                    <Image source={require('../assets/star.png')} style={styles.icon} />
                    <Text style={styles.distanceText}>4.2</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Image source={require('../assets/chevron_down.png')} style={styles.chevronIcon} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    width: '100%',
  },
  logo: {
    width: 180,
    height: 100,
    resizeMode: 'contain',
    marginTop: 30,
    marginBottom: 20,
    alignSelf: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
    width: '100%',
  },
  section: {
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
    alignItems: 'flex-start',
    padding: 20,
  },
  servicesContainer: {
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  offerLogo: {
    borderRadius: 25,
  },
  chevronIcon: {
    width: 20,
    height: 20,
    marginTop: 10,
    alignSelf: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  searchText: {
    marginLeft: 5,
    color: '#888',
  },
  recommendedContainer: {
    width: '100%',
  },
  recommendedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  recommendedTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  recommendedTextLine: {
    flexDirection: 'row',
    marginTop: 5,
    marginRight: 5,
  },
  recommendedText: {
    fontWeight: 'bold',
  },
  distanceText: {
    marginRight: 10,
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
  bookingTitle: {
    fontWeight: 'bold',
  },
  bookingDate: {
    color: '#666',
  },
  checkButton: {
    marginLeft: 10,
  },
});
