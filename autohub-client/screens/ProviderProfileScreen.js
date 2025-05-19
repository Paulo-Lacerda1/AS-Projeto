// screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';

export default function ProviderProfileScreen( { navigation}) {
  const provider = [
    {name: 'Thompson Car Service', rating: 4.5, reviews: 87, address: 'Avenida Exemplo, 123', openHours: 'Mon-Fri 08:00–18:00 | Sat 10:00–14:00'},
  ];
  const services = [
    { id: 1, name: 'Oil Change', price: '50€', description: 'Complete engine oil replacement', image: require('../assets/profile/oil_change.png') },
    { id: 2, name: 'Premium Exterior Clean', price: '70€', description: 'A detailed hand wash', image: require('../assets/profile/exterior_clean.png') },
  ];

  const reviews = [
    {
      id: 1,
      rating: 5,
      title: 'Amazing service',
      text: 'I tried the Premium Exterior Clean and loved it! Customer service was 10/10. Highly recommend!',
      user: 'Sofia R.',
      date: 'March 2025',
    },
    {
      id: 2,
      rating: 5,
      title: 'Fast oil change and fair price',
      text: 'Booked an appointment and was out in 30 minutes. Good value. Will book again.',
      user: 'Miguel T.',
      date: 'March 2025',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Image source={require('../assets/logo_transparente.png')} style={styles.logo} />
      
      <TouchableOpacity onPress = { () => navigation.goBack()} style = {styles.navIcon}>
        <Image source={require('../assets/arrowleft.png')} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Oficina Info */}
      <View style={styles.headerSection}>
        <Image source={require('../assets/store_logos/thompson.png')} style={styles.storeLogo} />
        <View style={styles.headerText}>
          <Text style={styles.storeName}>{provider[0].name}</Text>
          <Text style={styles.rating}>⭐ {provider[0].rating} ({provider[0].reviews} reviews)</Text>
          <Text style={styles.details}>Address: {provider[0].address}</Text>
          <Text style={styles.details}>Open: {provider[0].openHours}</Text>
        </View>
      </View>

      {/* Popular */}
      <Text style={styles.sectionTitle}>Most popular</Text>
      <Image source={require('../assets/profile/exterior_clean.png')} style={styles.popularImage} />
      <Text style={styles.serviceName}>Premium Exterior Clean</Text>

      {/* Services */}
      <Text style={styles.sectionTitle}>Services</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesScroll}>
        {services.map(service => (
          <View key={service.id} style={styles.serviceCard}>
            <Image source={service.image} style={styles.serviceImage} />
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.servicePrice}>{service.price}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Reviews */}
      <Text style={styles.sectionTitle}>Latest reviews</Text>
      {reviews.map(review => (
        <View key={review.id} style={styles.reviewCard}>
          <Text style={styles.reviewRating}>⭐ {review.rating}</Text>
          <Text style={styles.reviewTitle}>{review.title}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
          <Text style={styles.reviewMeta}>{review.user} · {review.date}</Text>
        </View>
      ))}

      <TouchableOpacity>
        <Text style={styles.seeMore}>See more</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    paddingHorizontal: 20,
  },
  logo: {
    width: 180,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 10,
  },
  headerSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  storeLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 10,
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rating: {
    color: '#333',
    marginVertical: 2,
  },
  details: {
    fontSize: 13,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  popularImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  serviceName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 5,
  },
  servicesScroll: {
    marginBottom: 20,
  },
  serviceCard: {
    width: 140,
    marginRight: 15,
  },
  serviceImage: {
    width: '100%',
    height: 100,
    borderRadius: 6,
  },
  servicePrice: {
    fontWeight: 'bold',
    marginTop: 2,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#555',
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  reviewRating: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  reviewTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginVertical: 4,
  },
  reviewText: {
    fontSize: 13,
    color: '#333',
  },
  reviewMeta: {
    marginTop: 6,
    fontSize: 12,
    color: '#666',
  },
  seeMore: {
    textAlign: 'center',
    color: '#000',
    textDecorationLine: 'underline',
    marginBottom: 30,
  },
  navIcon:{
    marginBottom: 20,
  }
});
