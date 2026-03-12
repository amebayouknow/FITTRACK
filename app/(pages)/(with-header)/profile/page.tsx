import { ApiError, IServerResponse } from "@/app/api/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import View from "./view";

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

export default async function Page() {
  const cookieStore = cookies();
  const user_id = (await cookieStore).get("user_id")?.value;
  let Profile: IProfileProps = {
    age: 0,
    goal: 0,
    height: 0,
    name: "",
    profile_id: 0,
    sex: "",
    weight: 0,
    user_id: "0"
  };

  try {
    const GetProfileResponse = await fetch(
      `http://localhost:3030/profile/get-profile?user_id=${user_id}`,
    );
    const GetProfileBody: IServerResponse<IProfileProps> =
      await GetProfileResponse.json();

    if (GetProfileBody.status === 400) {
      throw new ApiError("PROFILE_NOT_CREATED", "profile doesn't exist");
    }
    if(GetProfileBody.body != null && user_id != undefined){
      Profile = GetProfileBody.body;
      Profile.user_id = user_id;
    }
  } catch (error) {
    // Если аккаунт не создан
    if (error instanceof ApiError) {
      if (error.code === "PROFILE_NOT_CREATED") {
        try {
          await fetch(
            "http://localhost:3030/profile/create-profile",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                user_id: user_id,
              }),
            },
          );
        } catch (error) {
          console.log(error);
        } finally {
          redirect("/profile");
        }
      }
    }
  } finally {
    return <View profile={Profile}/>
  }
}
