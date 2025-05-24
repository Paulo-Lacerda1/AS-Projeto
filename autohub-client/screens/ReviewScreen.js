// screens/ReviewScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReviewScreen({ route, navigation }) {
  // Agora recebemos title e date também
  const { store, title, date } = route.params;
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    // Validação da nota
    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      Alert.alert('Erro', 'A avaliação deve ser um número entre 1 e 5.');
      return;
    }

    // Monta o objeto de review
    const newReview = {
      store,
      title,
      rating: Number(rating),
      comment,
      date: new Date().toISOString(),
    };

    try {
      // 1) Salvar a review
      const storedReviews = await AsyncStorage.getItem('reviews');
      const reviews = storedReviews ? JSON.parse(storedReviews) : [];
      reviews.push(newReview);
      await AsyncStorage.setItem('reviews', JSON.stringify(reviews));

      // 2) Marcar o booking como completed
      const storedBookings = await AsyncStorage.getItem('bookings');
      let bookings = storedBookings ? JSON.parse(storedBookings) : [];

      const targetTime = new Date(date).getTime();
      bookings = bookings.map(b => {
        if (
          b.store === store &&
          b.title === title &&
          new Date(b.date).getTime() === targetTime
        ) {
          return { ...b, completed: true };
        }
        return b;
      });

      await AsyncStorage.setItem('bookings', JSON.stringify(bookings));

      // Feedback e volta à Home
      Alert.alert('Avaliação enviada!', 'Obrigado pela sua avaliação.');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
      Alert.alert('Erro', 'Não foi possível salvar a avaliação.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Avalie o serviço em {store}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nota (1 a 5)"
        keyboardType="numeric"
        value={rating}
        onChangeText={setRating}
      />
      <TextInput
        style={[styles.input, styles.comment]}
        placeholder="Deixe um comentário (opcional)"
        multiline
        numberOfLines={4}
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar Avaliação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  comment: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
