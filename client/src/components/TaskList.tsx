import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, AlertCircle, CheckCircle, Target, Zap } from "lucide-react";
import { type Task } from "@shared/schema";

interface TaskListProps {
  tasks: Task[];
}

const categoryConfig = {
  A: {
    title: "A - Snabbt med högt värde",
    description: "Gör dessa först! Snabba vinster.",
    color: "bg-chart-1 text-white",
    icon: Zap,
    priority: 1
  },
  B: {
    title: "B - Tidskrävande & Högt värde",
    description: "Planera tid, använd AI för att öka effekt",
    color: "bg-chart-2 text-white",
    icon: Target,
    priority: 2
  },
  C: {
    title: "C - Snabbt med lågt värde",
    description: "Gör när du har tid över.",
    color: "bg-chart-3 text-white",
    icon: Clock,
    priority: 3
  },
  D: {
    title: "D - Tidskrävande & Lågt värde",
    description: "Automatisera eller överväg att ta bort.",
    color: "bg-chart-4 text-white",
    icon: AlertCircle,
    priority: 4
  }
};

export default function TaskList({ tasks }: TaskListProps) {
  // Group tasks by category
  const tasksByCategory = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  // Sort categories by priority
  const sortedCategories = Object.keys(tasksByCategory).sort(
    (a, b) => categoryConfig[a as keyof typeof categoryConfig].priority - 
              categoryConfig[b as keyof typeof categoryConfig].priority
  );

  if (tasks.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Inga uppgifter än. Lägg till din första uppgift ovan.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {sortedCategories.map(category => {
        const config = categoryConfig[category as keyof typeof categoryConfig];
        const categoryTasks = tasksByCategory[category];
        const Icon = config.icon;

        return (
          <Card key={category} className="w-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md ${config.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{config.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{config.description}</p>
                </div>
                <Badge variant="secondary" data-testid={`badge-count-${category}`}>
                  {categoryTasks.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoryTasks.map(task => (
                  <div
                    key={task.id}
                    className="p-4 rounded-md border bg-card hover-elevate"
                    data-testid={`task-card-${task.id}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-1">
                        <h4 className="font-medium text-card-foreground">{task.name}</h4>
                        {task.description && (
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Tid</div>
                          <div className="text-sm font-medium">{task.timeRating}/10</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Värde</div>
                          <div className="text-sm font-medium">{task.valueRating}/10</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}