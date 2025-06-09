export function showToast(message = "Default message", {
    background = "bg-dark",
    textColor = "text-white",
    delay = 3000
} = {}) {
    const container = document.getElementById("toast-container");
    if (!container) {
        console.error("Toast container not found in DOM.");
        return;
    }

    // Create toast wrapper
    const toastWrapper = document.createElement("div");
    toastWrapper.className = `toast align-items-center ${background} ${textColor} border-0 mb-2`;
    toastWrapper.setAttribute("role", "alert");
    toastWrapper.setAttribute("aria-live", "assertive");
    toastWrapper.setAttribute("aria-atomic", "true");

    toastWrapper.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    container.appendChild(toastWrapper);

    const toast = new bootstrap.Toast(toastWrapper, {
        autohide: true,
        delay: delay
    });

    toast.show();

    // Clean up after hidden
    toastWrapper.addEventListener("hidden.bs.toast", () => {
        toastWrapper.remove();
    });
}


