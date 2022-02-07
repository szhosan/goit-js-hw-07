import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryDivRef = document.querySelector(".gallery");
galleryDivRef.innerHTML = createGalleryMarkup(galleryItems);
galleryDivRef.addEventListener("click", onIMGModalOpen);

let modalInstance;

function onIMGModalOpen(e) {
  if (e.target.nodeName !== "IMG") {
    return;
  }
  e.preventDefault();
  modalInstance = basicLightbox.create(
    `<img width="1400" height="900" 
    src="${e.target.dataset.source}">`,
    {
      onShow: (modalInstance) => {
        addListener();
      },
      onClose: (modalInstance) => {
        removeListener();
      },
    }
  );
  modalInstance.show();
}

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join("");
}

function addListener() {
  window.addEventListener("keydown", onEscClick);
}

function removeListener() {
  window.removeEventListener("keydown", onEscClick);
}

function onEscClick(e) {
  if (e.code === "Escape") {
    modalInstance.close();
  }
}
