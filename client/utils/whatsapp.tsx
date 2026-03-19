export const WHATSAPP_NUMBER = " +971589520398";

export const getWhatsAppLink = (message: string) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const baseUrl = isMobile
    ? "https://api.whatsapp.com/send"
    : "https://web.whatsapp.com/send";

  return `${baseUrl}?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
}