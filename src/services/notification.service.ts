export const showNotification = async (title: string, body: string) => {
  const reg = await navigator.serviceWorker.ready;

  reg.active?.postMessage({
    type: "SHOW_NOTIFICATION",
    title,
    body
  })
}
