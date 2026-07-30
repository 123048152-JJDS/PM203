import { Stack } from "expo-router";

export default function ConsultaLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Lista de Usuarios", headerShown: true }}
      />
      <Stack.Screen
        name="detalle"
        options={{ title: "Detalle del Usuario", headerShown: true }}
      />
      <Stack.Screen
        name="editar"
        options={{ title: "Editar Usuario", headerShown: true }}
      />
    </Stack>
  );
}