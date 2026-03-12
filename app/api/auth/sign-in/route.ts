import { NextResponse } from "next/server";
import { IServerResponse } from "../../types";

type TServerBody = {
  token: string;
  id: string;
};

export async function POST(req: Request) {
  const responseBody: IServerResponse<string> = {
    message: "Success log-in",
    success: true,
    body: null,
    status: 200,
  };

  try {
    const RequestBody = await req.json();

    const { email, password } = RequestBody;

    if (!email || !password) {
      responseBody.message = "Fields empty";
      responseBody.status = 400;
      throw new Error();
    }

    const serverRequest = await fetch("http://localhost:3030/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const serverData: IServerResponse<TServerBody> = await serverRequest.json();

    if (!serverData.success || serverData.body?.id == null) {
      responseBody.message = serverData.message;
      responseBody.status = serverData.status;
      throw new Error();
    } else {
      responseBody.body = serverData.body?.id;
    }
  } catch (error) {
    console.log(error);
    responseBody.success = false;
  } finally {
    const response = NextResponse.json(responseBody, {
      status: responseBody.status,
    });
    if (responseBody.success) {
      response.cookies.set("user_id", String(responseBody.body), {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      });
    }
    return response;
  }
}
