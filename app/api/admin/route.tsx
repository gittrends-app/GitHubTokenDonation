import { MongoClient } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

const client = new MongoClient(process.env.DB_URL + "");

export const revalidate = 0;

export async function GET() {
  try {
    await client.connect();
    const db = client.db("GitTokenDonation");
    const collection = db.collection("tokens");

    var tokens = await collection.find({}).toArray();
    return NextResponse.json(tokens, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
