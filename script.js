// Editá esta lista para elegir las 10 fotos del álbum.
// Para fotos propias, copiá los archivos junto a index.html y escribí sus nombres aquí.
const FOTOS = [
  {
    src: "https://github.com/montenegrojesu/misXVBrenda/blob/main/img/_MG_3400.JPG?raw=true",
    titulo: "La protagonista",
    alt: "Brenda con su vestido celeste"
  },
  {
    src: "https://github.com/montenegrojesu/misXVBrenda/blob/main/img/_MG_3689_.JPG?raw=true",
    titulo: "Una noche especial",
    alt: "Celebración al aire libre"
  },
  {
    src: "https://github.com/montenegrojesu/misXVBrenda/blob/main/img/_MG_3312.JPG?raw=true",
    titulo: "Un gran recuerdo",
    alt: "Momento de celebración"
  },
  {
    src: "https://github.com/montenegrojesu/misXVBrenda/blob/main/img/_MG_3501.JPG?raw=true",
    titulo: "Detalles que brillan",
    alt: "Decoración de una fiesta"
  },
  {
    src: "https://github.com/montenegrojesu/misXVBrenda/blob/main/img/_MG_4174.JPG?raw=true",
    titulo: "A pura alegría",
    alt: "Globos y decoración festiva"
  },
  {
    src: "https://github.com/montenegrojesu/misXVBrenda/blob/main/img/_MG_4224.JPG?raw=true",
    titulo: "La pista encendida",
    alt: "Luces de una fiesta"
  },
  {
    src: "https://github.com/montenegrojesu/misXVBrenda/blob/main/img/_MG_4435.JPG?raw=true",
    titulo: "Un día inolvidable",
    alt: "Celebración especial"
  },
  {
    src: "https://github.com/montenegrojesu/misXVBrenda/blob/main/img/_MG_4443.JPG?raw=true",
    titulo: "Brindis y sonrisas",
    alt: "Reunión festiva"
  },
  {
    src: "https://github.com/montenegrojesu/misXVBrenda/blob/main/img/_MG_3963_.jpg?raw=true",
    titulo: "Todos juntos",
    alt: "Público celebrando"
  },
];

// Copiá el video junto a index.html y escribí su nombre, por ejemplo: "resumen.mp4".
// Dejalo vacío para mostrar el espacio de video sin contenido.
const VIDEO_SRC = "https://storage.googleapis.com/store-screenapp-v2-production/temp/d044189c-1408-460c-9dfe-2a41ad3fe5f8/Resumen%20XV%20_%20Brenda.MP4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=GOOG1EINEQV5X2QGY62PSZMBMUR7IGGVLKNDB6ABP5GL6O6FKO76DWA2IE3SB%2F20261121%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20261121T002653Z&X-Amz-Expires=86400&X-Amz-Signature=77319195ccb5c97322151fb0c0f7fc48ea04b33fda5d20111b78fc5b466e4461&X-Amz-SignedHeaders=host&x-id=GetObject";

// Pegá aquí el enlace compartido de la carpeta de Google Drive.
const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1DeLZBAci9cVYfiMTlmF3ZKF9JUIMyRq8?usp=sharing";

const gallery = document.querySelector("#gallery");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const closeButton = lightbox.querySelector(".close-lightbox");
const video = document.querySelector("#party-video");
const videoPlaceholder = document.querySelector("#video-placeholder");
const driveLink = document.querySelector("#drive-link");

// Crea las tarjetas de la galería a partir de la lista FOTOS.
FOTOS.slice(0, 10).forEach((foto) => {
  const card = document.createElement("button");
  card.className = "gallery-card";
  card.dataset.src = foto.src;
  card.setAttribute("aria-label", `Ampliar foto: ${foto.titulo}`);

  const img = document.createElement("img");
  img.src = foto.src;
  img.alt = foto.alt;
  img.loading = "lazy";

  const label = document.createElement("span");
  label.className = "card-label";

  const title = document.createElement("span");
  title.textContent = foto.titulo;

  const arrow = document.createElement("b");
  arrow.textContent = "↗";

  label.append(title, arrow);
  card.append(img, label);
  gallery.append(card);
});

// Muestra el video si escribiste una ruta en VIDEO_SRC.
if (VIDEO_SRC.trim()) {
  video.src = VIDEO_SRC;
  video.hidden = false;
  videoPlaceholder.hidden = true;
}

// Activa el botón de Drive cuando agregás el enlace.
if (DRIVE_FOLDER_URL.trim()) {
  driveLink.href = DRIVE_FOLDER_URL;
  driveLink.removeAttribute("aria-disabled");
  driveLink.nextElementSibling.textContent =
    "Se abrirá la carpeta compartida en una nueva pestaña.";
} else {
  driveLink.addEventListener("click", (event) => event.preventDefault());
}

// Abre las fotos ampliadas.
gallery.addEventListener("click", (event) => {
  const card = event.target.closest(".gallery-card");
  if (!card) return;

  lightboxImage.src = card.dataset.src;
  lightboxImage.alt = card.querySelector("img").alt;
  lightbox.showModal();
});

closeButton.addEventListener("click", () => lightbox.close());

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.open) {
    lightbox.close();
  }
});
