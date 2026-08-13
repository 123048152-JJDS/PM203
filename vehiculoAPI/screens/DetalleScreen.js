import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { API_URL } from "../utils/config";

export default function DetalleScreen() {
  const params = useLocalSearchParams();
  const { id, marca: paramMarca, modelo: paramModelo, año: paramAño, color: paramColor } = params;
  const [vehiculo, setVehiculo] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (paramMarca && paramModelo) {
      setVehiculo({
        id,
        marca: paramMarca,
        modelo: paramModelo,
        año: paramAño || 'N/A',
        color: paramColor || 'N/A',
      });
    } else if (id) {
      const obtenerVehiculo = async () => {
        try {
          setCargando(true);
          const response = await fetch(`${API_URL}/${id}`);
          if (!response.ok) throw new Error('Error al obtener');
          const data = await response.json();
          setVehiculo(data);
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'No se pudo cargar el vehículo');
        } finally {
          setCargando(false);
        }
      };
      obtenerVehiculo();
    }
  }, [id, paramMarca, paramModelo, paramAño, paramColor]);

  const eliminarVehiculo = async () => {
    Alert.alert(
      'Confirmar',
      '¿Eliminar este vehículo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
              if (!response.ok) throw new Error('Error al eliminar');
              Alert.alert('Éxito', 'Vehículo eliminado');
              router.replace('/consulta');
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'No se pudo eliminar');
            }
          },
        },
      ]
    );
  };

  const editarVehiculo = () => {
    router.push({
      pathname: '/consulta/actualizar',
      params: {
        id: vehiculo.id,
        marca: vehiculo.marca,
        modelo: vehiculo.modelo,
        año: vehiculo.año,
        color: vehiculo.color,
      },
    });
  };

  if (cargando) return <View style={styles.centered}><ActivityIndicator size="large" /></View>;
  if (!vehiculo) return <View style={styles.centered}><Text>No se encontró el vehículo</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID: <Text style={styles.value}>{vehiculo.id}</Text></Text>
      <Text style={styles.label}>Marca: <Text style={styles.value}>{vehiculo.marca}</Text></Text>
      <Text style={styles.label}>Modelo: <Text style={styles.value}>{vehiculo.modelo}</Text></Text>
      <Text style={styles.label}>Año: <Text style={styles.value}>{vehiculo.año}</Text></Text>
      <Text style={styles.label}>Color: <Text style={styles.value}>{vehiculo.color}</Text></Text>
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.btn, styles.btnEdit]} onPress={editarVehiculo}>
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnDelete]} onPress={eliminarVehiculo}>
          <Text style={styles.btnText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  label: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  value: { fontWeight: 'normal', color: '#555' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  btn: { flex: 0.48, padding: 15, borderRadius: 8, alignItems: 'center' },
  btnEdit: { backgroundColor: '#ffc107' },
  btnDelete: { backgroundColor: '#dc3545' },
  btnText: { color: '#fff', fontWeight: 'bold' },
});