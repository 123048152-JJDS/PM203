import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Inicio", href: null }} />
      <Tabs.Screen
        name="alta"
        options={{
          title: "Formulario",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" size={24} color={"red"} />
          ),
        }}
      />
      <Tabs.Screen
        name="consulta"
        options={{
          title: "Listado",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={24} color={"blue"} />
          ),
        }}
      />
    </Tabs>
  );
}