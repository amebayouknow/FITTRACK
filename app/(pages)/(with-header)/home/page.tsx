import { cookies } from "next/headers";
import View from "./view";

export interface IExercises{
    category: string,
    duration: number,
    exercise_id: number,
    parameters: number
}

export interface ITraining{
    training_id: number,
    date: string;
    duration: number;
    exercises: IExercises[]
}

export default async function Page() {
  const cookieStore = cookies();
  const user_id = (await cookieStore).get("user_id")?.value;

  try {
    const ServerResponseTraining = await fetch(`http://localhost:3000/api/trainings?id=${user_id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const Trainings: ITraining[] = await ServerResponseTraining.json();
  } catch (error) {
    console.log("error")
  }

  return <View />;
}
