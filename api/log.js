import clientPromise from "../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("8ball");

    const { question, response } = req.body;

    if (!question || !response) {
      return res.status(400).json({ error: "Missing data" });
    }

    await db.collection("consults").insertOne({
      question,
      response,
      feature: "8-ball",
      createdAt: new Date(),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("MongoDB log error:", error);
    return res.status(500).json({ error: "Failed to log consult" });
  }
}
