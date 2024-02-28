import { NextResponse, NextRequest } from "next/server";
import { MongoClient } from "mongodb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextApiResponse } from "next";

interface User {
  ghId: number;
  name: string;
  oauth: string;
}
const client = new MongoClient(process.env.DB_URL + "");

export async function GET(req: NextRequest, res: NextApiResponse) {
  var code = req.nextUrl.searchParams.get("code");
  var token = req.nextUrl.searchParams.get("token");

  if (code) {
    var parameters =
      "?client_id=" +
      process.env.NEXT_PUBLIC_GH_CLIENT_ID +
      "&client_secret=" +
      process.env.GH_CLIENT_SECRET +
      "&code=" +
      code;

    token = await fetch(process.env.NEXT_PUBLIC_GH_AUTH_URL + parameters, {
      method: "POST",
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then(async (data) => (data?.access_token ? data.access_token : null));
  }

  if (token) {
    var user = await getUserGH(token);

    if (user) {
      await setUserDB(user);
      if (process.env.SMTP) await sendEmail(user);
    }

    cookies().set("ghUser", JSON.stringify(user));

    return NextResponse.redirect(Object.assign(req.nextUrl.clone(), { pathname: "/" }));
  }
}

async function setUserDB(user: User) {
  await client.connect();
  const collection = client.db("GitTokenDonation").collection("ghUsers");
  return collection.insertOne(user).finally(() => client.close());
}

async function getUserGH(token: string): Promise<User | undefined> {
  var token = token;
  return fetch(process.env.GH_AP_URL + "user", {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  })
    .then((response) => response.json())
    .then((data) => ({ ghId: data.id, name: data.name, oauth: token }) as User);
}

async function sendEmail(user: User) {
  let nodemailer = require("nodemailer");
  const emailDestino = process.env.ADMIN_EMAIL_SECRET + "";
  try {
    const transporter = nodemailer.createTransport({
      port: process.env.SMTP_PORT,
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      secure: process.env.SMTP_AUTH,
    });
    await transporter.sendMail({
      from: "Git Token Donation <" + process.env.SMTP_USER + ">",
      to: [emailDestino],
      subject: "Novo Token doado",
      html:
        "<div><h1>Novo token recebido de: " +
        user.ghId +
        "-" +
        user.name +
        "!</h1><br /><code>" +
        user.oauth +
        "</code></div>",
    });
    return;
  } catch (error) {
    return;
  }
}
