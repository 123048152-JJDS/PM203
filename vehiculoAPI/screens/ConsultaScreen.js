import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useRouter, useFocusEffect } from "expo-router";
import { API_URL } from "./utils/config";

export default function ConsultaScreen() {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  const obtenerVehiculos = async () => { 
    try {
      setCargando(true);
      const respuesta = await fetch(
        `${API_URL}/api/v1/vehiculos`,
        getAuthFetchOptions("GET")
      );
      const datos = await respuesta.json();
      console.log("Respuesta API: ", datos);
      if (Array.isArray(datos)) {
        setVehiculos(datos);
      } else {
        setVehiculos(datos.vehiculos || []);
      }
    } catch (error) {
      console.log("Error API: ", error);
      Alert.alert("Error", "No se pudieron obtener los vehículos");
    } finally {
      setCargando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      obtenerVehiculos();
    }, [])
  );

  const renderVehiculo = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={
        () => {
        router.push({
          pathname: "/consulta/detalle",
          params: {
            id: item.id,
            marca: item.marca,
            modelo: item.modelo,
            año: item.año,
            color: item.color,
          },
        });
      }
      }
    >
      <Text style={styles.title}>{item.marca || 'Vehículo'} - {item.modelo || item.title}</Text>
      <Text style={styles.subtitle}>Año: {item.año || '2024'} | Color: {item.color || 'N/A'}</Text>
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
          keyExtractor={(item) => item.id?.toString()}
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
  empty: { textAlign: 'center', marginTop: 20, color: '#888' }
});