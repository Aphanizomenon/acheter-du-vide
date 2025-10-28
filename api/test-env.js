export default function handler(req, res) {
  const key = process.env.STRIPE_SECRET_KEY;

  if (!key) {
    return res.status(500).json({ ok: false, message: "❌ STRIPE_SECRET_KEY non trouvée" });
  }

  // On n'affiche que les 6 premiers caractères pour des raisons de sécurité
  return res.status(200).json({
    ok: true,
    message: "✅ STRIPE_SECRET_KEY détectée sur Vercel",
    prefix: key.substring(0, 6) + "************"
  });
}
