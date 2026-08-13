import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { API_URL } from "../utils/config";

export default function ActualizarScreen() {
  const params = useLocalSearchParams();
  const { id, marca: initialMarca, modelo: initialModelo, año: initialAño, color: initialColor } = params;

  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [año, setAño] = useState('');
  const [color, setColor] = useState('');
  const [cargando, setCargando] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(true);

  useEffect(() => {
    if (initialMarca && initialModelo) {
      setMarca(initialMarca);
      setModelo(initialModelo);
      setAño(initialAño?.toString() || '');
      setColor(initialColor || '');
      setCargandoDatos(false);
    } else if (id) {
      const obtenerVehiculo = async () => {
        try {
          setCargandoDatos(true);
          const response = await fetch(`${API_URL}/${id}`);
          if (!response.ok) throw new Error('Error al obtener');
          const data = await response.json();
          setMarca(data.marca || '');
          setModelo(data.modelo || '');
          // Normalizar: priorizar 'año', sino 'anio'
          setAño((data.año || data.anio)?.toString() || '');
          setColor(data.color || '');
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'No se pudo cargar el vehículo');
        } finally {
          setCargandoDatos(false);
        }
      };
      obtenerVehiculo();
    } else {
      setCargandoDatos(false);
    }
  }, [id, initialMarca, initialModelo, initialAño, initialColor]);

  const ActualizarVehiculo = async () => {
    if (marca.trim() === '' || modelo.trim() === '' || año.trim() === '' || color.trim() === '') {
      Alert.alert('Campos vacíos', 'Todos los campos son obligatorios');
      return;
    }

    try {
      setCargando(true);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marca: marca.trim(),
          modelo: modelo.trim(),
          año: parseInt(año, 10), 
          color: color.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error al actualizar');
      }

      const data = await response.json();
      Alert.alert('Éxito', 'Vehículo actualizado');
      router.replace({
        pathname: '/consulta/detalle',
        params: {
          id: data.id,
          marca: data.marca,
          modelo: data.modelo,
          año: data.año || data.anio,
          color: data.color,
        },
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message || 'No se pudo actualizar');
    } finally {
      setCargando(false);
    }
  };

  if (cargandoDatos) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Vehículo #{id}</Text>
      <TextInput style={styles.input} placeholder="Marca" value={marca} onChangeText={setMarca} />
      <TextInput style={styles.input} placeholder="Modelo" value={modelo} onChangeText={setModelo} />
      <TextInput style={styles.input} placeholder="Año" keyboardType="numeric" value={año} onChangeText={setAño} />
      <TextInput style={styles.input} placeholder="Color" value={color} onChangeText={setColor} />
      <TouchableOpacity style={styles.btn} onPress={ActualizarVehiculo} disabled={cargando}>
        <Text style={styles.btnText}>{cargando ? 'Guardando...' : 'Guardar Cambios'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15 },
  btn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
});