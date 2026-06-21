/*Zona 1: Importaciones de componentes y archivos */
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

/*Zona 2: Main - Hogar de los componentes */
export default function ActivityIndicatorScreen() {
  const [cargando, setCargando] = useState(false);

  const handleSubmit = () => {
    Keyboard.dismiss();
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled={true}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>Header</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
          />
          {cargando && (
            <ActivityIndicator
              animating={true}
              size="large"
              color="green"
              style={styles.spinner}
            />
          )}
          <View style={styles.buttonWrapper}>
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

/*Zona 3: Estilos y Posicionamiento */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },

  header: {
    fontSize: 36,
    marginBottom: 48,
  },

  input: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },

  spinner: {
    marginVertical: 12,
  },

  buttonWrapper: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});