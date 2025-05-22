// screens/HomeScreen.js
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


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
            <Text style={styles.noServices}>You have no upcoming services.</Text>
            <View style={styles.searchContainer}>
              <Image source={require('../assets/Search_grey.png')} style={styles.icon} />
              <Text style={styles.searchText}>Search service</Text>
            </View>
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
  }
});
