import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {

    try {
        const cookieStore = await cookies()
        cookieStore.delete("user_id")
    } catch (err) {
        console.log(err)
    } finally {
        return NextResponse.json({message: "bay"})
    }
}