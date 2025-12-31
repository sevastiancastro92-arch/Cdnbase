import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDWRVCwGU7aBuxZ-h9Rj0SudCWylIsM7Ak",
    authDomain: "reportes-ed444.firebaseapp.com",
    projectId: "reportes-ed444",
    storageBucket: "reportes-ed444.firebasestorage.app",
    messagingSenderId: "635066198398",
    appId: "1:635066198398:web:b169cbc70e970a48a7eb2f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const container = document.getElementById('posts-container');

async function cargarPublicaciones() {
    try {
        // Obtenemos publicaciones ordenadas por fecha (las más nuevas primero)
        const q = query(collection(db, "publicaciones"), orderBy("fecha", "desc"));
        const querySnapshot = await getDocs(q);

        container.innerHTML = ""; // Limpiar loading

        if (querySnapshot.empty) {
            container.innerHTML = "<h3 style='text-align:center; color:white;'>No hay mods publicados aún.</h3>";
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            // Plantilla HTML de cada publicación
            const cardHTML = `
                <div class="post-card">
                    <h2 class="post-title">${data.titulo} <span class="flag-icon">🇨🇺</span></h2>
                    
                    <div class="post-image-container">
                        <img src="${data.imagen}" alt="${data.titulo}">
                    </div>

                    <div class="button-group">
                        <a href="${data.descarga}" target="_blank" class="btn-neon btn-download">DESCARGAR</a>
                        <a href="${data.whatsapp}" target="_blank" class="btn-neon btn-whatsapp">UNIRSE AL CANAL DE WHATSAPP</a>
                    </div>
                </div>
            `;
            container.innerHTML += cardHTML;
        });

    } catch (error) {
        console.error("Error cargando posts:", error);
        container.innerHTML = "<h3 style='text-align:center; color:red;'>Error al cargar los mods.</h3>";
    }
}

// Cargar al iniciar
cargarPublicaciones();
