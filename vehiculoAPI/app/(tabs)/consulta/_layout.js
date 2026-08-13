import { Stack } from "expo-router";

export default function ConsultaLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Lista de Vehículos", headerShown: true }}
      />
      <Stack.Screen
        name="detalle"
        options={{ title: "Detalle del Vehículo", headerShown: true }}
      />
      <Stack.Screen
        name="actualizar"
        options={{ title: "Actualizar Vehículo", headerShown: true }}
      />
    </Stack>
  );
}