const url = "https://tu-gimnasio-santa-lucia.github.io/tu-gimnasio-santa-lucia/";
const shareButton = document.getElementById("share-site");
const copyButton = document.getElementById("copy-link");

function showCopied() {
  copyButton.textContent = "Enlace copiado";
  window.setTimeout(() => {
    copyButton.textContent = "Copiar enlace";
  }, 2200);
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(url);
    showCopied();
  } catch {
    window.prompt("Copiá este enlace:", url);
  }
}

shareButton.addEventListener("click", async () => {
  if (!navigator.share) {
    await copyLink();
    return;
  }

  try {
    await navigator.share({
      title: "Tu Gimnasio",
      text: "Tu Gimnasio · Desde 1996 en Santa Lucía, Corrientes.",
      url,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return;
    await copyLink();
  }
});

copyButton.addEventListener("click", copyLink);
