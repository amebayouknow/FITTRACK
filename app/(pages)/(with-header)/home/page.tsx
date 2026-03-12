import View from "./view";

interface IExercises{
    category: string,
    duration: number,
    exercise_id: number,
    parameters: number
}

interface ITraining{
    training_id: number,
    date: string;
    duration: number;
    exercises: IExercises[]
}

export default async function Page() {
  try {
    // console.log("request")
    const ServerResponseTraining = await fetch("http://localhost:3000/api/trainings", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const Trainings: ITraining[] = await ServerResponseTraining.json();

    data = await list.json()
    console.log(data)
    
    // console.log("request yeap")
  } catch (error) {
    data = null;
  }

  return <View />;
}
