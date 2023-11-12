import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {

   let user = req.cookies.get("user")?.value
   let password = req.cookies.get("password")?.value
   const path = req.nextUrl.pathname;
   if (user) {
      if (password) {
         if (checkLogin(user, password)) {
            return getResponse(path, 'admin', req)
         }
         else {
            var response = getResponse(path, 'login', req)
            response.cookies.delete("user")
            response.cookies.delete("password")
            return response
         }
      }
      else {
         var response = getResponse(path, 'login', req)
         response.cookies.delete("user")
         return response
      }
   }
   else if (password) {
      var response = getResponse(path, 'login', req)
      req.cookies.delete("password")
      return response
   }
   var response = getResponse(path, 'login', req)
   return response
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
function getResponse(path: string, destino: string, req: NextRequest) {
   switch (destino){
      case 'admin':
         if(path == '/admin'){
            return NextResponse.next()
         }
         else{
            return NextResponse.redirect(new URL('/admin', req.url))
         }
      case 'login':
         if(path == '/login'){
            return NextResponse.next()
         }
         else{
            return NextResponse.redirect(new URL('/login', req.url))
         }
      default:
         return NextResponse.redirect(new URL('/', req.url)) 
   }
}