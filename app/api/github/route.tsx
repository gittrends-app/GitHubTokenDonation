import { NextResponse, NextRequest } from "next/server";
import { MongoClient } from "mongodb"

interface User {
    ghId: number;
    name: string;
    oauth: string;
}
const client = new MongoClient(process.env.DB_URL + '');

export async function GET(req: NextRequest) {
    try {
        var code = req.nextUrl.searchParams.get("code");
        var token = req.nextUrl.searchParams.get("token");
        if(code){
            var parameters =
                "?client_id=" + process.env.NEXT_PUBLIC_GH_CLIENT_ID +
                "&client_secret=" + process.env.GH_CLIENT_SECRET +
                "&code=" + code
            token = await fetch(process.env.NEXT_PUBLIC_GH_AUTH_URL + parameters, {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                }
            }).then(async (response) => {
                if (response){
                    try{
                        let data = await response.json()
                        return data?.access_token ? data.access_token : null;
                    } catch (error){
                        return null
                    }
                }
                return null;
            })
        }
        if(token){
            var user = await getUserDB(token)
            if(user){
                return NextResponse.json({ user: user }, { status: 200 });
            }
            else{
                user = await getUserGH(token)
                if(user){
                    await setUserDB(user)
                    return NextResponse.json({ user: user }, { status: 200 });
                }
                return NextResponse.json({error: process.env.NEXT_PUBLIC_GH_ERROR_MESSAGE}, { status: 500 });
            }
        }
        return NextResponse.json({error: process.env.NEXT_PUBLIC_GH_ERROR_MESSAGE}, { status: 500 });
    } catch (error) {
        return NextResponse.json({error: error}, { status: 500 });
    }
}

async function getUserDB(token: string): Promise<User | undefined>{
    await client.connect()
    const db = client.db("GitTokenDonation")
    const collection = db.collection("ghUsers")
    
    var user = await collection.findOne<User>({oauth: token})
    if(user){
        return user;
    }
    return;
}

async function setUserDB(user: User){
    await client.connect()
    const db = client.db("GitTokenDonation")
    const collection = db.collection("ghUsers")

    collection.insertOne(user)
    return;
}

async function getUserGH(token: string): Promise<User | undefined> {
    try {
        var token = token
        var ghUser = await fetch(process.env.GH_AP_URL + 'user', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(async (response) => {
            if (response){
                try{
                    let data = JSON.parse(await response.text())
                    if (data)
                        return data
                    else
                        return null
                } catch (error){
                    return null
                }
            }
            return null;
        })
        if(ghUser){
            var user: User = {
                ghId: ghUser.id,
                name: ghUser.name,
                oauth: token,

            }
            return user;
        }
        else
            return;
    } catch (error) {
        return;
    }
}