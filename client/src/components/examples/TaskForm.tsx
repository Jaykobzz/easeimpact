import TaskForm from '../TaskForm';

export default function TaskFormExample() {
  return (
    <div className="p-6 bg-background">
      <TaskForm 
        onSubmit={(task) => console.log('Task submitted:', task)} 
      />
    </div>
  );
}