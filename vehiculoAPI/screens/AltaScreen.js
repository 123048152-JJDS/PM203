import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { useRouter } from "expo-router";
import { API_URL, getAuthFetchOptions } from "../utils/config";

export default function AltaScreen() {
  const router = useRouter();
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [año, setAño] = useState("");
  const [color, setColor] = useState("");
  const [cargando, setCargando] = useState(false);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === "web") {
      window.alert(`${titulo}\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const GuardarVehiculo = async () => {
    if (marca.trim() === "" || modelo.trim() === "" || año.trim() === "" || color.trim() === "") {
      mostrarMensaje("Campos vacíos", "Todos los campos son obligatorios");
      return;
    }
    try {
      setCargando(true);
      const respuesta = await fetch(
        API_URL,
        getAuthFetchOptions("POST", {
          marca: marca.trim(),
          modelo: modelo.trim(),
          año: parseInt(año),
          color: color.trim(),
        })
      );
      if (respuesta.ok) {
        mostrarMensaje("Éxito", "Se guardó el vehículo");
        setMarca(""); setModelo(""); setAño(""); setColor("");
        if (router.canGoBack()) router.back();
        else router.replace("/consulta");
      } else {
        const datos = await respuesta.json();
        mostrarMensaje("Error", datos.detail || "No se pudo guardar");
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      mostrarMensaje("Error", "No se pudo guardar. Verifica la conexión o la API.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alta de Vehículo</Text>
      <TextInput style={styles.input} placeholder="Marca (ej. Toyota)" value={marca} onChangeText={setMarca} />
      <TextInput style={styles.input} placeholder="Modelo (ej. Corolla)" value={modelo} onChangeText={setModelo} />
      <TextInput style={styles.input} placeholder="Año (ej. 2024)" keyboardType="numeric" value={año} onChangeText={setAño} />
      <TextInput style={styles.input} placeholder="Color (ej. Rojo)" value={color} onChangeText={setColor} />
      <TouchableOpacity style={styles.btn} onPress={GuardarVehiculo}>
        <Text style={styles.btnText}>Guardar Vehículo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
  btn: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});