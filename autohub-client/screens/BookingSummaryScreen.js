import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function BookingSummaryScreen({ route, navigation }) {
  const { title, store, date, vehicleType, selectedExtras } = route.params;

  const parsedDate = new Date(date);

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirm = async () => {
    const booking = {
        title,
        store,
        date,
        vehicleType,
        selectedExtras,
        completed: false, 
    };

    try {
        const existing = await AsyncStorage.getItem('bookings');
        const bookings = existing ? JSON.parse(existing) : [];

        bookings.push(booking);
        await AsyncStorage.setItem('bookings', JSON.stringify(bookings));

        Alert.alert('Sucesso', 'O seu serviço foi agendado com sucesso!');
        navigation.navigate('Home'); // ou para onde fizer sentido voltar
    } catch (error) {
        console.error('Erro ao salvar agendamento:', error);
        Alert.alert('Erro', 'Não foi possível guardar o agendamento.');
    }
};


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Resumo do Agendamento</Text>

      <Text style={styles.item}>📅 Data: {parsedDate.toLocaleDateString()}</Text>
      <Text style={styles.item}>⏰ Hora: {parsedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      <Text style={styles.item}>🚗 Veículo: {vehicleType}</Text>
      <Text style={styles.item}>🛠️ Extras: {selectedExtras.length > 0 ? selectedExtras.join(', ') : 'Nenhum'}</Text>
      <Text style={styles.item}>🏬 Oficina: {store}</Text>
      <Text style={styles.item}>🔧 Serviço: {title}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirmar</Text>
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
