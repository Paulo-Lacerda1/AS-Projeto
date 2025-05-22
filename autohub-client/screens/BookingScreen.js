import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Button, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function BookingScreen({ route, navigation }) {
    const { title, store } = route.params;

    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [vehicleType, setVehicleType] = useState('');
    const [selectedExtras, setSelectedExtras] = useState([]);
    const [confirmed, setConfirmed] = useState(false);

    const extrasList = [
        'Limpeza interior',
        'Mudança de pneus',
        'Check-up completo',
        'Alinhamento de direção',
        'Revisão de travões',
    ];

    const toggleExtra = (extra) => {
        setSelectedExtras((prev) =>
            prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra]
        );
    };

    const handleConfirm = () => {

        if (!vehicleType.trim()) {
            Alert.alert('Erro', 'Por favor, indica o tipo de veículo.');
            return;
        }

        navigation.navigate('BookingSummaryScreen', {
            title,
            store,
            date: date.toISOString(),
            vehicleType,
            selectedExtras,
        });
    };


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Agendar Serviço</Text>
            <Text style={styles.label}>Serviço: {title}</Text>
            <Text style={styles.label}>Oficina: {store}</Text>

            {/* Seletor de Data */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
                <Text>📅 {date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) setDate(new Date(selectedDate.setHours(date.getHours(), date.getMinutes())));
                    }}
                />
            )}

            {/* Seletor de Hora */}
            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateInput}>
                <Text>⏰ {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
            {showTimePicker && (
                <DateTimePicker
                    value={date}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                        setShowTimePicker(false);
                        if (selectedTime) {
                            const updated = new Date(date);
                            updated.setHours(selectedTime.getHours());
                            updated.setMinutes(selectedTime.getMinutes());
                            setDate(updated);
                        }
                    }}
                />
            )}

            {/* Tipo de Veículo */}
            <TextInput
                placeholder="Tipo de veículo (ex: SUV, Sedan, etc)"
                style={styles.input}
                value={vehicleType}
                onChangeText={setVehicleType}
            />

            {/* Extras */}
            <Text style={[styles.label, { marginTop: 10 }]}>Extras:</Text>
            <FlatList
                data={extrasList}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.extraOption,
                            selectedExtras.includes(item) && styles.extraOptionSelected,
                        ]}
                        onPress={() => toggleExtra(item)}
                    >
                        <Ionicons
                            name={selectedExtras.includes(item) ? 'checkbox' : 'square-outline'}
                            size={24}
                            color={selectedExtras.includes(item) ? 'black' : '#aaa'}
                        />
                        <Text style={styles.extraText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity style={styles.blackButton} onPress={handleConfirm}>
                <Text style={styles.blackButtonText}>Ver Resumo</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    dateInput: {
        padding: 10,
        fontSize: 16,
        backgroundColor: '#eee',
        borderRadius: 5,
        marginBottom: 10,
    },
    input: {
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    blackButton: {
        backgroundColor: '#000',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    blackButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    extraOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    extraOptionSelected: {
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        padding: 5,
    },
    extraText: {
        marginLeft: 10,
        fontSize: 16,
    },
    summary: {
        marginTop: 30,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
