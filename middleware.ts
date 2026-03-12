import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
    const user_id = request.cookies.get("user_id");
    const { pathname } = request.nextUrl;

    if(pathname.startsWith("/_next") || pathname.startsWith("/api")){
        return NextResponse.next()
    }

    const publicRoutes = ["/", "/auth/sign-in", "/auth/sign-up"];
    const isPublic = publicRoutes.includes(pathname);

    if(!user_id && !isPublic){
        return NextResponse.redirect(new URL("/", request.url));
    }

    if(user_id && isPublic){
        return NextResponse.redirect(new URL("/home", request.url))
    }

    return NextResponse.next()
}

export const config = {
    metchers: ["/home"]
}