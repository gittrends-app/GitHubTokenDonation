import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        var parameters =
            "?client_id=" + process.env.NEXT_PUBLIC_GH_CLIENT_ID +
            "&client_secret=" + process.env.GH_CLIENT_SECRET +
            "&code=" + req.nextUrl.searchParams.get("code");
        var ghToken = await fetch(process.env.NEXT_PUBLIC_GH_AUTH_URL + parameters, {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        }).then(async (response) => {
            if (response){
                try{
                    let data = JSON.parse(await response.text())
                    console.log(data)
                    if (data?.access_token)
                        return data.access_token
                    else
                        return null
                } catch (error){
                    return null
                }
            }
            return null;
        })
        console.log(ghToken)
        if(ghToken)
            return NextResponse.json({ ghToken: ghToken }, { status: 200 });
        else
            return NextResponse.json({}, { status: 500 });
    } catch (error) {
        return NextResponse.json({error: error}, { status: 500 });
    }
}