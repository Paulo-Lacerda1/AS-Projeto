import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ServiceDetailScreen({ route, navigation }) {
    const { title, store, description, image } = route.params;

    const [reviews, setReviews] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const stored = await AsyncStorage.getItem('reviews');
                const allReviews = stored ? JSON.parse(stored) : [];
                const relevant = allReviews.filter(r => r.store === store);
                setReviews(relevant);
            } catch (error) {
                console.error('Erro ao carregar avaliações:', error);
            }
        };
        loadReviews();
    }, [store]);

    // calcula média
    const average =
        reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : null;

    // decide quantas mostrar
    const displayed = showAll ? reviews : reviews.slice(0, 3);

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

                <View style={{ marginTop: 30 }}>
                    <Text style={styles.sectionHeading}>Avaliações</Text>

                    {average !== null && (
                        <Text style={styles.average}>⭐ {average} de {reviews.length} avaliações</Text>
                    )}

                    {reviews.length === 0 ? (
                        <Text>Nenhuma avaliação ainda.</Text>
                    ) : (
                        displayed.map((review, i) => (
                            <View key={i} style={styles.reviewCard}>
                                <Text>⭐ {review.rating}/5</Text>
                                {review.comment ? <Text style={styles.comment}>{review.comment}</Text> : null}
                                <Text style={styles.reviewDate}>
                                    {new Date(review.date).toLocaleDateString()}
                                </Text>
                            </View>
                        ))
                    )}

                    {reviews.length > 3 && (
                        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
                            <Text style={styles.toggleText}>
                                {showAll ? 'Ver menos avaliações' : `Ver todas (${reviews.length}) avaliações`}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.fixedButton} onPress={goToBooking}>
                <Text style={styles.blackButtonText}>Agendar Serviço</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollContent: { padding: 20, paddingBottom: 100 },
    image: {
        width: '100%', height: 180, borderRadius: 10, marginBottom: 20, resizeMode: 'contain'
    },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
    store: { fontSize: 16, color: '#777', marginBottom: 10 },
    description: { fontSize: 16, color: '#444' },

    sectionHeading: {
        fontSize: 18, fontWeight: 'bold', marginBottom: 8
    },
    average: {
        fontSize: 16, fontWeight: '600', marginBottom: 12
    },

    reviewCard: {
        backgroundColor: '#f5f5f5', padding: 10, borderRadius: 8, marginBottom: 10
    },
    comment: {
        marginVertical: 5
    },
    reviewDate: {
        fontSize: 12, color: '#888'
    },

    toggleText: {
        color: '#007BFF', textAlign: 'center', marginTop: 5, marginBottom: 15
    },

    fixedButton: {
        position: 'absolute', bottom: 20, left: 20, right: 20,
        backgroundColor: '#000', padding: 15, borderRadius: 5, alignItems: 'center'
    },
    blackButtonText: {
        color: '#fff', fontSize: 16
    },
});
