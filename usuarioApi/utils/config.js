// Config central de la URL base de la API.
//
// Por defecto apunta a producción (Railway). Si quieres probar contra tu
// backend local, define la variable de entorno EXPO_PUBLIC_API_URL antes
// de correr Expo, por ejemplo:
//   EXPO_PUBLIC_API_URL=http://127.0.0.1:5000 npx expo start
//
// Expo expone al bundle cualquier variable que empiece con EXPO_PUBLIC_.

export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://miapi-production-056b.up.railway.app";