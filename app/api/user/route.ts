import { NextResponse } from "next/server";
import { IServerResponse } from "../../types";

export interface IProfileProps {
  age: null | number;
  goal: null | number;
  height: null | number;
  name: null | string;
  profile_id: number;
  sex: null | string;
  weight: null | number;
  user_id: string;
}


export async function POST(req: Request) {
    const response: IServerResponse = {
        message: "Success change",
        success: true,
        status: 200
    }

    try {
        const RequestBody = await req.json();

        const { age, goal, height, name, profile_id, sex, weight, user_id } = RequestBody;
        console.log(profile_id)
        const serverRequest = await fetch("http://localhost:3030/profile/update-profile", {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                age: age,
                goal: goal,
                height: height,
                name: name,
                user_id: user_id,
                sex: sex,
                weight: weight
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