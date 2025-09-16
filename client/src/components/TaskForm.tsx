import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Plus, Loader2 } from "lucide-react";
import { type InsertTask } from "@shared/schema";

interface TaskFormProps {
  onSubmit: (task: InsertTask) => void;
  isSubmitting?: boolean;
}

export default function TaskForm({ onSubmit, isSubmitting = false }: TaskFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [timeRating, setTimeRating] = useState([5]);
  const [valueRating, setValueRating] = useState([5]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const task: InsertTask = {
      name: name.trim(),
      description: description.trim() || null,
      timeRating: timeRating[0],
      valueRating: valueRating[0],
    };

    onSubmit(task);
    
    // Reset form
    setName("");
    setDescription("");
    setTimeRating([5]);
    setValueRating([5]);
  };

  const getTimeLabel = (rating: number) => {
    if (rating <= 3) return "Tidskrävande";
    if (rating >= 8) return "Snabbt";
    return "Medel";
  };

  const getValueLabel = (rating: number) => {
    if (rating <= 3) return "Lågt värde";
    if (rating >= 8) return "Högt värde";
    return "Medel värde";
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Lägg till ny arbetsuppgift
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="task-name">Uppgiftens namn *</Label>
            <Input
              id="task-name"
              data-testid="input-task-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="T.ex. Skriva månadsrapport"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-description">Beskrivning (valfri)</Label>
            <Textarea
              id="task-description"
              data-testid="input-task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beskriv uppgiften i detalj..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tid ({getTimeLabel(timeRating[0])})</Label>
                <div className="px-2">
                  <Slider
                    data-testid="slider-time"
                    value={timeRating}
                    onValueChange={setTimeRating}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Tidskrävande</span>
                  <span>Snabbt</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Värde/Effekt ({getValueLabel(valueRating[0])})</Label>
                <div className="px-2">
                  <Slider
                    data-testid="slider-value"
                    value={valueRating}
                    onValueChange={setValueRating}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Lågt värde</span>
                  <span>Högt värde</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              data-testid="button-add-task"
              className="w-full"
              disabled={!name.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              {isSubmitting ? "Sparar..." : "Lägg till uppgift"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}