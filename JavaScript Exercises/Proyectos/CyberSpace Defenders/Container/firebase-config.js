// === CONFIGURACIÓN DE FIREBASE PARA LEADERBOARD COMPARTIDO ===
//
// PASOS PARA ACTIVAR:
// 1. Ve a https://console.firebase.google.com/
// 2. Crea un nuevo proyecto (o usa uno existente)
// 3. En el proyecto, ve a "Firestore Database" y crea una base de datos
//    - Selecciona modo "producción"
//    - Elige la región más cercana a tus usuarios
// 4. Ve a Configuración del proyecto > General > "Tu app" > Web (</>)
// 5. Registra la app y copia los valores de firebaseConfig aquí abajo
// 6. En Firestore > Reglas, usa estas reglas:
//
//    rules_version = '2';
//    service cloud.firestore {
//      match /databases/{database}/documents {
//        match /leaderboard/{entry} {
//          allow read: if true;
//          allow create: if true;
//          allow update: if false;
//          allow delete: if true;
//        }
//      }
//    }
//
// Si no se configura, el leaderboard funcionará en modo local (localStorage).

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

// Inicializar Firebase solo si hay configuración válida
let db = null;
if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log('Firebase conectado - Leaderboard compartido activo');
    } catch (e) {
        console.warn('Error al inicializar Firebase:', e);
        db = null;
    }
} else {
    console.log('Firebase no configurado - Leaderboard en modo local');
}
