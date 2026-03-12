import { NextResponse } from "next/server";
import { IServerResponse } from "../../types";

export async function POST(req: Request) {
    const response: IServerResponse = {
        message: "Success log-in",
        success: true,
        status: 200
    }

    try {
        const RequestBody = await req.json();

        const { email, password } = RequestBody;

        if (!email || !password) {
            response.message = "Fields empty"
            response.status = 400
            throw new Error()
        }

        const serverRequest = await fetch("http://localhost:3030/auth/sign-in", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
        const serverData: IServerResponse = await serverRequest.json()
        if(!serverData.success){
            response.message = serverData.message;
            response.status = serverData.status;
            throw new Error()
        }else{
            response.body = serverData.body;
        }

    } catch (error) {
        console.log(error)
        response.success = false;
    } finally {
        return NextResponse.json(response, {status: response.status})
    }
}