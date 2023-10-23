import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {

   let user = req.cookies.get("user")?.value
   let password = req.cookies.get("password")?.value
   const path = req.nextUrl.pathname;

   if (user && password && checkLogin(user, password)) {
      if(path == '/admin'){
         return NextResponse.next()
      }
      return NextResponse.redirect(new URL('/admin', req.url))
   }
   else{
      if(path == '/login'){
         return NextResponse.next()
      }
      return NextResponse.redirect(new URL('/login', req.url))
   }
}

export const config = {
   matcher: ['/admin', '/login'],
}
function checkLogin(user: string, password: string): boolean {
   if (user == process.env.ADMIN_LOGIN_SECRET && password == process.env.ADMIN_PASSWORD_SECRET) {
      return true;
   }

   return false
}