import TaskList from '../TaskList';
import { type Task } from "@shared/schema";

export default function TaskListExample() {
  const mockTasks: Task[] = [
    {
      id: "1",
      name: "Skriva månadsrapport",
      description: "Sammanställa resultat från förra månaden",
      timeRating: 3,
      valueRating: 8,
      category: "B"
    },
    {
      id: "2", 
      name: "Besvara mail",
      description: null,
      timeRating: 9,
      valueRating: 7,
      category: "A"
    },
    {
      id: "3",
      name: "Sortera papper",
      description: "Rensa upp på skrivbordet",
      timeRating: 8,
      valueRating: 3,
      category: "C"
    },
    {
      id: "4",
      name: "Uppdatera intranät",
      description: "Lägga till nya medarbetarbilder",
      timeRating: 2,
      valueRating: 2,
      category: "D"
    }
  ];

  return (
    <div className="p-6 bg-background">
      <TaskList tasks={mockTasks} />
    </div>
  );
}