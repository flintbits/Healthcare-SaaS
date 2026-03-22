self.addEventListener("install", () => {
  console.log("SW installed");
});

self.addEventListener("activate", () => {
  console.log("SW activated");
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SHOW_NOTIFICATION") {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
    });
  }
});
