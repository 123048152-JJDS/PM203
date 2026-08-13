import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useFocusEffect } from "expo-router";
import { API_URL, getAuthFetchOptions } from "../utils/config";

export default function ConsultaScreen() {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const obtenerVehiculos = async () => {
    try {
      setLoading(true);
      const respuesta = await fetch(API_URL, getAuthFetchOptions("GET"));
      const datos = await respuesta.json();
      setVehiculos(Array.isArray(datos) ? datos : datos.vehiculos || []);
    } catch (error) {
      console.log("Error API: ", error);
      Alert.alert("Error", "No se pudieron obtener los vehículos");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      obtenerVehiculos();
    }, [])
  );


  const obtenerAnio = (item) => item.año || item.anio || 'N/A';

  const renderVehiculo = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        router.push({
          pathname: "/consulta/detalle",
          params: {
            id: item.id,
            marca: item.marca,
            modelo: item.modelo,
            año: obtenerAnio(item),
            color: item.color,
          },
        });
      }}
    >
      <Text style={styles.title}>{item.marca || 'Vehículo'} - {item.modelo || item.title}</Text>
      <Text style={styles.subtitle}>Año: {obtenerAnio(item)} | Color: {item.color || 'N/A'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Catálogo de Vehículos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={vehiculos}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={renderVehiculo}
          ListEmptyComponent={<Text style={styles.empty}>No hay vehículos registrados</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, marginTop: 10 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  empty: { textAlign: 'center', marginTop: 20, color: '#888' },
});