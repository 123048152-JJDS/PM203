import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function ConsultaUsuariosScreen() {
  const [usuarios, setUsuarios] = useState([]);
  const router = useRouter();

  const obtenerUsuarios = async () => {
    try {
      const respuesta = await fetch("http://127.0.0.1:5000/v1/usuarios/");
      const datos = await respuesta.json();
      console.log("Respuesta API: ", datos);
      setUsuarios(datos.usuarios || []);
    } catch (error) {
      console.log("Error API: ", error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const renderTarjeta = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { opacity: pressed ? 0.7 : 1 },
      ]}
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
      <FlatList
        data={usuarios}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
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