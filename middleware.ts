import { NextRequest, NextResponse } from "next/server";
export default function middleware(req: NextRequest) {
   if (req.nextUrl.pathname == "/login") {
      if(checkLogin()){
         return NextResponse.redirect(new URL('/admin', req.url))
      }
      return NextResponse.next();
   }
   if (req.nextUrl.pathname == "/admin") {
      if(checkLogin()){
         return NextResponse.next();
      }
      return NextResponse.redirect(new URL('/login', req.url))
   }
}

function checkLogin(): boolean{

   return false
}