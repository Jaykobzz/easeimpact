import ExportButton from '../ExportButton';
import { type Task } from "@shared/schema";

export default function ExportButtonExample() {
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
    }
  ];

  return (
    <div className="p-6 bg-background">
      <ExportButton tasks={mockTasks} />
    </div>
  );
}