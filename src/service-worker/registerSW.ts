export const registerSW = async () => {
  if ("serviceWorker" in navigator) {
    await navigator.serviceWorker.register("/sw.js");
    console.log("SW registered")
  }
}
