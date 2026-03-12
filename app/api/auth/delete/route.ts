import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const RequestBody = await req.json();

    const { userId } = RequestBody;

    await fetch(`http://localhost:3030/auth/delete-user?userId=${userId}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
  } finally {
    return NextResponse.json({ message: "bay" });
  }
}
