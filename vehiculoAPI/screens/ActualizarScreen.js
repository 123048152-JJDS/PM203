import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { API_URL } from "./utils/config";


export default function ActualizarScreen() {
  const { id } = useLocalSearchParams();
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [año, setAño] = useState('');
  const [color, setColor] = useState('');


  const ActualizarVehiculo = async () => { };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Vehículo #{id}</Text>

      <TextInput style={styles.input} placeholder="Marca" value={marca} onChangeText={setMarca} />
      <TextInput style={styles.input} placeholder="Modelo" value={modelo} onChangeText={setModelo} />
      <TextInput style={styles.input} placeholder="Año" keyboardType="numeric" value={año} onChangeText={setAño} />
      <TextInput style={styles.input} placeholder="Color" value={color} onChangeText={setColor} />


      <TouchableOpacity style={styles.btn} onPress={ActualizarVehiculo}>
        <Text style={styles.btnText}>Guardar Cambios</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15 },
  btn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});