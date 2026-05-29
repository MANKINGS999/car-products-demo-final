// Central WhatsApp helper
// Uses api.whatsapp.com/send — opens WhatsApp app directly on mobile,
// and skips the "Starting chat" spinner on desktop by going straight to app/web
export const WA_NUMBER = "917385319052";

export function waLink(msg: string): string {
  return `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(msg)}`;
}

export const WA_GENERAL = waLink("Hi! I'm interested in your car decor services. Can you help me?");
export const WA_CUSTOM  = waLink("Hi! I have a custom requirement for my car. Can you help me?");

export function waProduct(productTitle: string): string {
  return waLink(`Hi! I'm interested in *${productTitle}* from Ayansh Car Decor. Can you share the price and availability?`);
}
