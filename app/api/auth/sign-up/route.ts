import { NextResponse } from "next/server";
import { IServerResponse } from "../../types";

export async function POST(req: Request) {
    const response: IServerResponse = {
        message: "Success create",
        success: true,
        status: 200
    }

    try {
        const RequestBody = await req.json();

        const { email, password } = RequestBody;

        if (!email || !password ) {
            response.message = "Fields empty"
            response.success = false
            response.status = 400
            throw new Error("error")
        }

        if (String(email).indexOf("@") === -1) {
            response.message = "Not valid email"
            response.status = 400
            throw new Error("error")
        }

        const serverRequest = await fetch("http://localhost:3030/auth/sign-up", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                confirmPassword: password
            })
        })
        const serverData: IServerResponse = await serverRequest.json()

        if(!serverData.success){
            response.message = serverData.message;
            response.status = serverData.status;
            throw new Error();
        }
    } catch (err) {
        response.success = false
        return;
    } finally {
        return NextResponse.json(response, {status: response.status})
    }
}