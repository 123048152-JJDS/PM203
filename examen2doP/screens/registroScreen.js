/*import*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Alert, Switch, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';

/*Cuerpo */
export default function registroScreen() {
    const [nombre, setNombre] = useState("");
    const [carrera, setCarrera] = useState("");
    const [semestre, setSemestre] = useState("");
    const [taller, setTaller] = useState(false);
    const [constancia, setConstancia] = useState(false);
    const [deportes, setDeportes] = useState(false);

    const enviarRegistro = () => {
        if (!nombre.trim() || !carrera.trim() || !semestre.trim()) {
            Alert.alert("Campos incompletos", "Debes llenar todos los campos.");
            return;
        }
        if (!/^[0-9]+$/.test(semestre)) {
            Alert.alert("Error", "El semestre debe ser un número.");
            setSemestre("");
            return;
        }
        Alert.alert(
            "Registro enviado",
            `Nombre: ${nombre}\nCarrera: ${carrera}\nSemestre: ${semestre}\n\n` +
            `Taller: ${taller ? "Sí" : "No"}\n` +
            `Constancia: ${constancia ? "Sí" : "No"}\n` +
            `Deportes: ${deportes ? "Sí" : "No"}`
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titulo}>Registro de Evento Universitario</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                placeholderTextColor="#aaa"
                autoCapitalize="words"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Carrera"
                placeholderTextColor="#aaa"
                autoCapitalize="words"
                value={carrera}
                onChangeText={setCarrera}
            />
            <TextInput
                style={styles.input}
                placeholder="Semestre"
                placeholderTextColor="#aaa"
                keyboardType="number-pad"
                maxLength={2}
                value={semestre}
                onChangeText={setSemestre}
            />

            <Text style={styles.seccion}>Opciones</Text>

            <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>¿Asistirá al taller?</Text>
                <Switch
                    value={taller}
                    onValueChange={setTaller}
                    trackColor={{ false: '#ccc', true: '#1a9e75' }}
                    thumbColor="#fff"
                />
            </View>
            <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>¿Requiere constancia?</Text>
                <Switch
                    value={constancia}
                    onValueChange={setConstancia}
                    trackColor={{ false: '#ccc', true: '#1a9e75' }}
                    thumbColor="#fff"
                />
            </View>
            <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>¿Participará en deportes?</Text>
                <Switch
                    value={deportes}
                    onValueChange={setDeportes}
                    trackColor={{ false: '#ccc', true: '#1a9e75' }}
                    thumbColor="#fff"
                />
            </View>

            <TouchableOpacity style={styles.boton} onPress={enviarRegistro}>
                <Text style={styles.botonTexto}>Enviar Registro</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </ScrollView>
    );
}

/*styles */
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 24,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
        color: '#111',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 11,
        fontSize: 14,
        color: '#111',
        marginBottom: 14,
    },
    seccion: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 12,
        color: '#111',
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
    },
    switchLabel: {
        fontSize: 14,
        color: '#333',
        flex: 1,
        marginRight: 10,
    },
    boton: {
        backgroundColor: '#2196F3',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 28,
    },
    botonTexto: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
});