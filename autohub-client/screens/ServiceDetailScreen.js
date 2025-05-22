import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function ServiceDetailScreen({ route, navigation }) {
    const { title, store, description, image } = route.params;

    const goToBooking = () => {
        navigation.navigate('BookingScreen', { title, store });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Image source={image} style={styles.image} />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.store}>{store}</Text>
                <Text style={styles.description}>{description}</Text>
            </ScrollView>

            <TouchableOpacity style={styles.fixedButton} onPress={goToBooking}>
                <Text style={styles.blackButtonText}>Agendar Serviço</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100, // espaço para o botão fixo
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    store: {
        fontSize: 16,
        color: '#777',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#444',
    },
    fixedButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    blackButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
