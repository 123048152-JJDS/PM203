import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Image,
} from 'react-native';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar barStyle="light-content" />
        <Image
          source={require('./assets/Logo.png')}
          style={styles.splashImage}
          resizeMode="contain"
        />

        {/* <Image
          source={{ uri: 'https://img.icons8.com/fluency/200/book-stack.png' }}
          style={styles.splashImage}
          resizeMode="contain"
        /> */}

        <Text style={styles.splashTitle}>Bienvenido</Text>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.splashSubtitle}>Cargando aplicacion...</Text>
      </View>
    );
  }

  return <HomeScreen />;
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  splashTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  splashSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
  },
});