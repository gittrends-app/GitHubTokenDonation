import { NextResponse, NextRequest } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { omitBy } from "lodash";

export interface GitHubUser {
  [key: string]: any;
  id: number;
  login: string;
  avatar_url: string;
  name: string;
  email: string;
}

export interface GitHubToken {
  user: GitHubUser;
  access_token: string;
  donated_at: Date;
}

const client = new MongoClient(process.env.DB_URL + "");

export async function GET(req: NextRequest) {
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
      const donation = {
        user: omitBy(user, (_, key) => key.endsWith("_url")) as GitHubUser,
        access_token: token,
        donated_at: new Date(),
      };
      await setUserDB(donation);
      if (process.env.SMTP) await sendEmail(donation);
    }

    cookies().set("ghUser", JSON.stringify(user));

    return NextResponse.redirect(Object.assign(req.nextUrl.clone(), { pathname: "/" }));
  }
}

async function setUserDB(data: GitHubToken) {
  await client.connect();
  const collection = client.db("GitTokenDonation").collection("ghUsers");
  return collection
    .updateOne({ _id: data.user.id as any }, { $set: data }, { upsert: true })
    .finally(() => client.close());
}

async function getUserGH(token: string): Promise<GitHubUser> {
  return fetch(process.env.GH_AP_URL + "user", {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  }).then((response) => response.json());
}

async function sendEmail(user: GitHubToken) {
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
      from: `Git Token Donation <${process.env.SMTP_USER}>`,
      to: [emailDestino],
      subject: `[${process.env.NODE_ENV || "development"}] Novo Token doado`,
      html:
        "<div><h1>Novo token recebido de: " +
        user.user.id +
        "-" +
        user.user.name +
        "!</h1><br /><code>" +
        user.access_token +
        "</code></div>",
    });
    return;
  } catch (error) {
    return;
  }
}
