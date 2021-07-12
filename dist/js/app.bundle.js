const settingsButton = document.querySelector("#settings");
const settingsModal = document.querySelector("#settings-modal");
const modalContent = document.querySelector(".modal-content");
const modalCloseBtn = document.querySelector(".modal-content .modal-close-btn");

settingsButton.addEventListener("click", openSettingsModal);
settingsModal.addEventListener("click", closeSettingsModal);
modalCloseBtn.addEventListener("click", closeSettingsModal);

function openSettingsModal(event) {
    settingsModal.style.display = "block";
}

function closeSettingsModal(event) {
    if (event.target === settingsModal) {
        settingsModal.style.display = "none";
    }
    else if (event.target.parentElement === modalCloseBtn) {
        settingsModal.style.display = "none";
    }
}