import { MongoClient } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

const client = new MongoClient(process.env.DB_URL + '');

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        if(body && body.login && body.password){
            var login = body.login;
            var password = body.password;

            if (login != process.env.ADMIN_LOGIN_SECRET || password != process.env.ADMIN_PASSWORD_SECRET) {
                return NextResponse.json({ error: "Usuario invalido" }, { status: 401 });
            }
            await client.connect()
            const db = client.db("GitTokenDonation")
            const collection = db.collection("ghUsers")
            collection.createIndex({'ghId': 1}, {unique: true})
    
            var ghUsers = await collection.find({}).toArray();
            if(ghUsers)
                return NextResponse.json({ ghUsers: ghUsers }, { status: 200 });
            else
                return NextResponse.json({ghUsers: [] }, { status: 200 });
        }
        else
            return NextResponse.json({ error: "Requisição invalida" }, { status: 400 });
        
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
