import React, { useState, useCallback } from "react";
import {  View,  Text,  FlatList,  Pressable,  StyleSheet,  Alert, ActivityIndicator, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useFocusEffect } from "expo-router";
import { getAuthFetchOptions } from "../utils/auth";
import { API_URL } from "../utils/config";

export default function ConsultaUsuariosScreen() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const router = useRouter();

  const obtenerUsuarios = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch(
        `${API_URL}/v1/usuarios/`,
        getAuthFetchOptions("GET")
      );
      const datos = await respuesta.json();
      console.log("Respuesta API: ", datos);
      if (Array.isArray(datos)) {
        setUsuarios(datos);
      } else {
        setUsuarios(datos.usuarios || []);
      }
    } catch (error) {
      console.log("Error API: ", error);
      Alert.alert("Error", "No se pudieron obtener los usuarios");
    } finally {
      setCargando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      obtenerUsuarios();
    }, [])
  );

  const renderTarjeta = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.7 : 1 }]}
      onPress={() => {
        router.push({
          pathname: "/consulta/detalle",
          params: {
            id: item.id,
            nombre: item.nombre,
            edad: item.edad.toString(),
          },
        });
      }}
      android_ripple={{ color: "#e0e0e0" }}
    >
      <View>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <View style={styles.linea} />
        <Text style={styles.info}>Edad: {item.edad} años</Text>
        <Text style={styles.verDetalle}>Ver detalle →</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Lista de Usuarios</Text>

      {cargando ? (
        <ActivityIndicator size="large" color="#2563EB" style={styles.loader} />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderTarjeta}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay usuarios registrados</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1F2937",
    marginBottom: 20,
  },
  loader: {
    marginTop: 50,
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 16,
    marginTop: 50,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563EB",
  },
  linea: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },
  info: {
    fontSize: 16,
    color: "#4B5563",
  },
  verDetalle: {
    marginTop: 8,
    fontSize: 14,
    color: "#1f6feb",
    fontWeight: "600",
    textAlign: "right",
  },
});