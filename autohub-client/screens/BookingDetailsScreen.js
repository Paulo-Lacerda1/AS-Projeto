import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookingDetailsScreen({ route, navigation }) {
  const { booking, index } = route.params;

  const parsedDate = new Date(booking.date);

  const handleCancel = async () => {
    try {
      const stored = await AsyncStorage.getItem('bookings');
      let bookings = stored ? JSON.parse(stored) : [];

      bookings.splice(index, 1); // remove o agendamento da lista

      await AsyncStorage.setItem('bookings', JSON.stringify(bookings));

      Alert.alert('Cancelado', 'O agendamento foi cancelado com sucesso.');
      navigation.navigate('Home'); // volta para a Home
    } catch (error) {
      console.error('Erro ao cancelar o agendamento:', error);
      Alert.alert('Erro', 'Não foi possível cancelar o agendamento.');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Detalhes do Agendamento</Text>

      <Text style={styles.item}>📅 Data: {parsedDate.toLocaleDateString()}</Text>
      <Text style={styles.item}>⏰ Hora: {parsedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      <Text style={styles.item}>🚗 Veículo: {booking.vehicleType || 'Não especificado'}</Text>
      <Text style={styles.item}>🛠️ Extras: {booking.selectedExtras?.length > 0 ? booking.selectedExtras.join(', ') : 'Nenhum'}</Text>
      <Text style={styles.item}>🏬 Oficina: {booking.store}</Text>
      <Text style={styles.item}>🔧 Serviço: {booking.title}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleBack}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancelar Serviço</Text>
        </TouchableOpacity>
      </View>
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
  item: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  cancelButton: {
    backgroundColor: '#666',
    flex: 1,
    padding: 15,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#000',
    flex: 1,
    padding: 15,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
