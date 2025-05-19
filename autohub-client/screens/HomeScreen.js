// screens/HomeScreen.js
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
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
          <View style ={styles.servicesContainer}>
            <Text style={styles.noServices}>You have no upcoming services.</Text>
            <View style={styles.searchContainer}>
              <Image source={require('../assets/Search_grey.png')} style={styles.icon} />
              <Text style={styles.searchText}>Search service</Text>
            </View>
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
          <View style ={styles.sectionContent}>
            <View style={styles.offersContainer}>
              <View style={styles.offerCard}>
                <Image source = {require('../assets/store_logos/Northside.png')} style={styles.offerLogo} />
                <View style={styles.offerTextContainer}>
                  <Text style={styles.offerText}>20% OFF on inspections until April 20!</Text>
                  <Text style={styles.offerStore}>Northside Auto Repair</Text>
                </View>
              </View>
              <View style={styles.offerCard}>
                <Image source = {require('../assets/store_logos/RiverStone.png')} style={styles.offerLogo} />
                <View style={styles.offerTextContainer}>
                  <Text style={styles.offerText}>15% OFF on oil changes until April 25!</Text>
                  <Text style={styles.offerStore}>Riverstone Automotive</Text>
                </View>
              </View>
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
          <View style ={styles.sectionContent}>
            <View style={styles.recommendedContainer}>
              <View style={styles.recommendedCard}>
                <Image source = {require('../assets/store_logos/thompson.png')} style={styles.offerLogo} />
                <View style={styles.recommendedTextContainer}>
                  <Text style={styles.recommendedText}>Northside Auto Repair</Text>
                  <View style={styles.recommendedTextLine}>
                    <Image source={require('../assets/map_pin.png')} style={styles.icon} />
                    <Text style={styles.distanceText}>2.1 km away</Text>
                  </View>
                  <View style={styles.recommendedTextLine}>
                    <Image source={require('../assets/star.png')} style={styles.icon} />
                    <Text style={styles.distanceText}>4.5</Text>
                  </View>
                </View>
              </View>
              <View style={styles.recommendedCard}>
                <Image source = {require('../assets/store_logos/RiverStone.png')} style={styles.offerLogo} />
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
    width: '100%'
    
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
  section:{
    width: '100%',
  },
  sectionHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
  },
  servicesContainer:{
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 20,
  },
  sectionContent: {
  backgroundColor: '#fff',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: 20,
},
recommendedContainer: {
  width: '100%',
},

  offersContainer:{
    justifyContent: 'space-between',
    width: '100%',
  }, 
  offerCard:{
    marginBottom: 5,
    bottomBorderWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerTextContainer:{
    marginLeft: 10,
    flex: 1,
  },
  offerLogo:{
    borderRadius: 25
  },
  chevronIcon:{
    width: 20,
    height: 20,
    marginTop: 10,
    alignSelf: 'center',
  },
  searchContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  recommendedCard:{
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
  recommendedTextLine:{
    flexDirection: 'row',
    marginTop: 5,
    marginRight: 5
  },
  distanceText:{
    marginRight: 10
  }
});
