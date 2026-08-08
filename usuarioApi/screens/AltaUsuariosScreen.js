import React, { useState } from "react";
import {  View,  SafeAreaView,  Text,  TextInput,  Pressable,  StyleSheet,  Alert,  Platform, } from "react-native";
import { useRouter } from "expo-router";
import { getAuthFetchOptions } from "../utils/auth";

export default function AltaUsuariosScreen() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [cargando, setCargando] = useState(false);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === "web") {
      window.alert(`${titulo}\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const guardarUsuarios = async () => {
    if (nombre.trim() === "" || edad.trim() === "") {
      mostrarMensaje("Campos vacíos", "Todos los campos son obligatorios");
      return;
    }

    try {
      setCargando(true);
      const respuesta = await fetch(
        "http://127.0.0.1:5000/v1/usuarios/",
        getAuthFetchOptions("POST", {
          nombre: nombre.trim(),
          edad: parseInt(edad),
        })
      );

      if (respuesta.ok) {
        mostrarMensaje("Éxito", "Se guardó el usuario");
        setNombre("");
        setEdad("");
        router.back();
      } else {
        const datos = await respuesta.json();
        mostrarMensaje("Error", datos.detail || "No se pudo guardar");
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      mostrarMensaje(
        "Error",
        "No se pudo guardar. Verifica la conexión o la API."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Registro de Usuarios</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del usuario"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Edad del usuario"
          keyboardType="numeric"
          value={edad}
          onChangeText={setEdad}
        />

        <Pressable
          style={[styles.boton, cargando && styles.botonDeshabilitado]}
          onPress={guardarUsuarios}
          disabled={cargando}
        >
          <Text style={styles.textoBoton}>
            {cargando ? "Guardando..." : "Agregar Usuario"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#1F2937",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 18,
    backgroundColor: "#F9FAFB",
    fontSize: 16,
  },
  boton: {
    backgroundColor: "#29bb0c",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  botonDeshabilitado: {
    opacity: 0.6,
  },
  textoBoton: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});