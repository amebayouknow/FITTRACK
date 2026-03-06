export interface WorkoutData {
  id?: number; 
  date: string;
  time: string;
  exercises: string;
}

export interface StatData {
  id?: number;
  type: string;
  time: string;
  count: string;
}

export type TableRowData = WorkoutData | StatData;
export type TableRowType = 'workout' | 'stat' | 'workout-alt';