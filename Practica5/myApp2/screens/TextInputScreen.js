/*Zona 1: Importaciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, ScrollView, Text, TextInput, Alert, Button, StyleSheet, Platform, } from 'react-native';



/*Zona 2: Main - Hogar de los componentes */
Platform
if (Platform.OS === "web"){
  Alert.alert = (titular, mensaje, boton) => {
    const list = Array.isArray(mensaje) ? mensaje : boton;
    if (list) {
      if (window.confirm(titular)) list.find((b) => b.onPress)?.onPress();
    } else {
      window.alert(titular + (mensaje ? "\n" + mensaje : ""));
    }
  };
}

export default function TextInputScreen() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [numero, setNumero] = useState("");
  const [bio, setBio] = useState("");

  const registro = () =>{
    if (!nombre || !correo || !contraseña || !numero){
      Alert.alert("Faltam datos", "Complete los datos faltantes");
      return;
    }
    if (!correo.includes("@") || !correo.includes(".com")){
      Alert.alert("Correo invalido", "El correo debe tener @ y .com");
      return;
    }
    if (!numero.match(/^[0-9]+/)){
      Alert.alert("Numero Invalido", "El numero solo debe contener numeros del 0 al 9");
      setNumero("");
      return;
    }

    Alert.alert(`Registrar ${nombre}`), [
      {
        text: "No",
        styles:"cancel",
      },
      {
        text: "Si",
        onPress:() => Alert.alert("Exito", "Usuario registrado correctamente")
      },
    ]
  };  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View styles={styles.input}>
        <Text style={styles.Titulo}>Formulario de registro de usuario</Text>
        <TextInput
          style={styles.input}
          placeholder='Ingrese su nombre'
          placeholderTextColor="black"
          autoCapitalize='words'
          value={nombre}
          onChangeText={(texto) => setNombre(texto)}
        />
        <TextInput
          style={styles.input}
          placeholder='Ingrese su correo electronico'
          placeholderTextColor="black"
          keyboardType='email-address'
          autoCapitalize='none'
          value={correo}
          onChangeText={(texto) => setCorreo(texto)}
        />
        <TextInput
          style={styles.input}
          placeholder='Ingrese su contraseña'
          placeholderTextColor="black"
          secureTextEntry="true"
          autoCapitalize='none'
          value={contraseña}
          onChangeText={(texto) => setContraseña(texto)}
        />
        <TextInput
          style={styles.input}
          placeholder='Ingrese su numero de telefono'
          placeholderTextColor="black"
          keyboardType='number-pad'
          maxLength={12}
          value={numero}
          onChangeText={(texto) => setNumero(texto)}
        />

        <TextInput
          style={styles.input}
          placeholder='Cuentanos sobre ti (Opcional)'
          placeholderTextColor="black"
          multiline="true"
          numberOfLines={4}
          maxLength={20}
          value={bio}
          onChangeText={(texto) => setNumero(texto)}
        />

        <Button title='Registrar' color="red" onPress={registro}/>
      </View>
    </ScrollView>
  );
}

/*Zona 3: Estilos y Posicionamiento */
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "z#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 24,
    gap: 12,
  },
  Titulo: {
    padding: 30,
    fontSize: 20,
    alignContent: "stretch",
  },
  input: {
    borderWidth: 3,
    borderColor: "#e6e6e6",
    borderRadius: 3,
    padding: 10,
    fontSize: 15,
    backgroundColor: "#ffffff",
  },
});