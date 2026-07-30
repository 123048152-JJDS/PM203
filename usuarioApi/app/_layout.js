/*_layout.js es una palabra reservada en Expo Router que sirve para definir la estructura de la aplicación */

import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}