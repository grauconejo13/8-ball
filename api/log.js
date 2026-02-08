import clientPromise from "../lib/mongodb.js";

console.log("API FILE LOADED");

export default async function handler(req, res) {
  console.log("HANDLER INVOKED", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("ENV CHECK:", !!process.env.MONGODB_URI);

    const client = await clientPromise;
    console.log("MONGO CONNECTED");

    const db = client.db("8ball");

    const { question, response } = req.body;
    console.log("BODY:", { question, response });

    await db.collection("consults").insertOne({
      question,
      response,
      createdAt: new Date(),
    });

    console.log("INSERT SUCCESS");

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("API ERROR:", error);
    return res.status(500).json({ error: "Failed to log consult" });
  }
}
