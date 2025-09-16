import { type Task, type InsertTask, calculateCategory } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getTasks(): Promise<Task[]>;
  getTask(id: string): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string, task: Partial<InsertTask>): Promise<Task | undefined>;
  deleteTask(id: string): Promise<boolean>;
  clearAllTasks(): Promise<void>;
}

export class MemStorage implements IStorage {
  private tasks: Map<string, Task>;

  constructor() {
    this.tasks = new Map();
  }

  async getTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async getTask(id: string): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = randomUUID();
    const category = calculateCategory(insertTask.timeRating, insertTask.valueRating);
    const task: Task = { 
      ...insertTask, 
      id, 
      category, 
      description: insertTask.description || null 
    };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: string, updateData: Partial<InsertTask>): Promise<Task | undefined> {
    const existingTask = this.tasks.get(id);
    if (!existingTask) return undefined;

    const updatedTask = { ...existingTask, ...updateData };
    updatedTask.category = calculateCategory(updatedTask.timeRating, updatedTask.valueRating);
    
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.tasks.delete(id);
  }

  async clearAllTasks(): Promise<void> {
    this.tasks.clear();
  }
}

export const storage = new MemStorage();
