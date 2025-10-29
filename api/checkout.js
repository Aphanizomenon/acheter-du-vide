// /api/checkout.js
import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    // ⚙️ Initialise Stripe avec ta clé secrète (dans .env.local)
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // 💰 Crée une session de paiement Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Achetez du Vide",
              description: "Le vide absolu, 5 euros seulement. Le cadeau le plus minimaliste du monde",
              images: ["https://achetezduvide.vercel.app/vide.jpg"],
            },
            unit_amount: 500, // prix en centimes (5 €)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.origin}/success.html`,
      cancel_url: `${req.headers.origin}/cancel.html`,
    });

    return res.status(200).json({ id: session.id });
  } catch (err) {
    console.error("Erreur Stripe :", err);
    return res.status(500).json({ error: err.message });
  }
}