import { NextResponse } from "next/server";
import { IServerResponse } from "../types";

export async function GET() {
  const response: IServerResponse = {
    message: "Успешный запрос",
    success: true,
    status: 200,
  };

  try {
    const serverRequest = await fetch(
      "http://localhost:3030/training/get-all-trainings?user_id=692ed42f-4ba1-46b9-bb74-0f9b64155355",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      },
    );

    const serverData: IServerResponse = await serverRequest.json();
    console.log("Ответ сервера",serverData)
    if (!serverData.success) {
      response.message = serverData.message;
      response.status = serverData.status;
      throw new Error();
    } else {
      response.body = serverData.body;
    }
  } catch (error) {
    console.log(error);
    response.success = false;
  } finally {
    return NextResponse.json(response, { status: response.status });
  }
}
