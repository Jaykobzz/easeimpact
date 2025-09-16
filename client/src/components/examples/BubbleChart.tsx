import BubbleChart from '../BubbleChart';
import { type Task } from "@shared/schema";

export default function BubbleChartExample() {
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
    },
    {
      id: "5",
      name: "Planera möte",
      description: "Boka sal och skicka kallelser",
      timeRating: 7,
      valueRating: 6,
      category: "A"
    }
  ];

  return (
    <div className="p-6 bg-background">
      <BubbleChart tasks={mockTasks} />
    </div>
  );
}