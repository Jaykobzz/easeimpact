import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import BubbleChart from "./BubbleChart";
import ExportButton from "./ExportButton";
import ThemeToggle from "./ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Target, Loader2 } from "lucide-react";
import { type Task, type InsertTask } from "@shared/schema";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function TaskPriorityApp() {
  const chartRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch tasks
  const { data: tasks = [], isLoading, error } = useQuery<Task[]>({
    queryKey: ['/api/tasks'],
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: async (taskData: InsertTask) => {
      const response = await apiRequest('POST', '/api/tasks', taskData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      toast({
        title: "Uppgift tillagd",
        description: "Din nya uppgift har sparats.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Fel",
        description: error.message || "Kunde inte lägga till uppgift",
        variant: "destructive",
      });
    },
  });

  // Clear all tasks mutation
  const clearTasksMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('DELETE', '/api/tasks');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      toast({
        title: "Uppgifter rensade",
        description: "Alla uppgifter har tagits bort.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Fel",
        description: error.message || "Kunde inte rensa uppgifter",
        variant: "destructive",
      });
    },
  });

  const addTask = (taskData: InsertTask) => {
    createTaskMutation.mutate(taskData);
  };

  const clearAllTasks = () => {
    clearTasksMutation.mutate();
  };

  // Calculate statistics
  const stats = {
    total: tasks.length,
    A: tasks.filter((t: Task) => t.category === 'A').length,
    B: tasks.filter((t: Task) => t.category === 'B').length,
    C: tasks.filter((t: Task) => t.category === 'C').length,
    D: tasks.filter((t: Task) => t.category === 'D').length,
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-destructive">Ett fel uppstod: {error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-md">
                <Target className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-card-foreground">Uppgiftsprioritering</h1>
                <p className="text-muted-foreground">Organisera dina arbetsuppgifter efter tid och värde</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {tasks && tasks.length > 0 && (
                <>
                  <ExportButton tasks={tasks} chartRef={chartRef} />
                  <Button
                    variant="outline"
                    onClick={clearAllTasks}
                    disabled={clearTasksMutation.isPending}
                    data-testid="button-clear-all"
                    className="gap-2"
                  >
                    {clearTasksMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    Rensa alla
                  </Button>
                </>
              )}
              <ThemeToggle />
            </div>
          </div>

          {/* Statistics */}
          {tasks && tasks.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge variant="secondary" data-testid="badge-total-tasks">
                Totalt: {stats.total}
              </Badge>
              <Badge className="bg-chart-1 text-white">
                A: {stats.A}
              </Badge>
              <Badge className="bg-chart-2 text-white">
                B: {stats.B}
              </Badge>
              <Badge className="bg-chart-3 text-white">
                C: {stats.C}
              </Badge>
              <Badge className="bg-chart-4 text-white">
                D: {stats.D}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Task Form */}
          <div className="flex justify-center">
            <TaskForm 
              onSubmit={addTask} 
              isSubmitting={createTaskMutation.isPending}
            />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {/* Task List */}
          {tasks && tasks.length > 0 && (
            <TaskList tasks={tasks} />
          )}

          {/* Bubble Chart */}
          {tasks && tasks.length > 0 && (
            <div ref={chartRef}>
              <BubbleChart tasks={tasks} />
            </div>
          )}

          {/* Help Text */}
          {(!tasks || tasks.length === 0) && !isLoading && (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6 text-center space-y-4">
                <Target className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold">Kom igång</h3>
                  <p className="text-muted-foreground">
                    Lägg till dina arbetsuppgifter ovan och betygsätt dem efter tid och värde. 
                    Systemet kategoriserar automatiskt dina uppgifter i fyra grupper:
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-chart-1/10 rounded-md">
                    <div className="font-semibold text-chart-1">A - Snabbt & Högt värde</div>
                    <div className="text-muted-foreground">Gör först</div>
                  </div>
                  <div className="p-3 bg-chart-2/10 rounded-md">
                    <div className="font-semibold text-chart-2">B - Tidskrävande & Högt värde</div>
                    <div className="text-muted-foreground">Planera tid</div>
                  </div>
                  <div className="p-3 bg-chart-3/10 rounded-md">
                    <div className="font-semibold text-chart-3">C - Snabbt & Lågt värde</div>
                    <div className="text-muted-foreground">När du har tid</div>
                  </div>
                  <div className="p-3 bg-chart-4/10 rounded-md">
                    <div className="font-semibold text-chart-4">D - Tidskrävande & Lågt värde</div>
                    <div className="text-muted-foreground">Delegera/skjut upp</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}