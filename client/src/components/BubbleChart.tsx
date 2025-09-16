import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Task } from "@shared/schema";
import { BarChart3 } from "lucide-react";

interface BubbleChartProps {
  tasks: Task[];
}

interface BubbleData {
  x: number;
  y: number;
  r: number;
  task: Task;
  color: string;
}

const categoryColors = {
  A: "hsl(142, 70%, 45%)", // Green - chart-1  
  B: "hsl(38, 95%, 60%)",  // Orange - chart-2
  C: "hsl(220, 85%, 65%)", // Blue - chart-3
  D: "hsl(0, 70%, 55%)"    // Red - chart-4
};

export default function BubbleChart({ tasks }: BubbleChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredTask, setHoveredTask] = useState<Task | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Convert tasks to bubble data
  const bubbles: BubbleData[] = tasks.map(task => ({
    x: (task.timeRating - 1) * 40 + 50, // Scale 1-10 to canvas width (50-410px)
    y: 450 - ((task.valueRating - 1) * 40 + 50), // Invert Y axis and scale 1-10 to canvas height
    r: Math.max(15, Math.min(30, 15 + (task.name.length * 0.8))), // Size based on task name length
    task,
    color: categoryColors[task.category as keyof typeof categoryColors]
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas size
    canvas.width = 500;
    canvas.height = 500;

    // Draw background with subtle gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, '#fafafa');
    gradient.addColorStop(1, '#f4f4f5');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 500, 500);

    // Draw grid lines
    ctx.strokeStyle = '#e4e4e7';
    ctx.lineWidth = 1;
    
    // Vertical lines (every 2 points from 1-10)
    for (let i = 1; i <= 10; i += 2) {
      const x = (i - 1) * 40 + 50;
      ctx.beginPath();
      ctx.moveTo(x, 50);
      ctx.lineTo(x, 450);
      ctx.stroke();
    }
    
    // Horizontal lines (every 2 points from 1-10)
    for (let i = 1; i <= 10; i += 2) {
      const y = 450 - ((i - 1) * 40 + 50);
      ctx.beginPath();
      ctx.moveTo(50, y);
      ctx.lineTo(450, y);
      ctx.stroke();
    }

    // Draw main axes
    ctx.strokeStyle = '#52525b';
    ctx.lineWidth = 3;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(50, 450);
    ctx.lineTo(450, 450);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(50, 450);
    ctx.stroke();

    // Draw center dividing lines
    ctx.strokeStyle = '#a1a1aa';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    // Vertical center line (at value 5.5)
    const centerX = (5.5 - 1) * 40 + 50;
    ctx.beginPath();
    ctx.moveTo(centerX, 50);
    ctx.lineTo(centerX, 450);
    ctx.stroke();
    
    // Horizontal center line (at value 5.5)
    const centerY = 450 - ((5.5 - 1) * 40 + 50);
    ctx.beginPath();
    ctx.moveTo(50, centerY);
    ctx.lineTo(450, centerY);
    ctx.stroke();
    
    ctx.setLineDash([]);

    // Draw axis labels
    ctx.fillStyle = '#71717a';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    
    // X-axis labels
    ctx.fillText('1', 70, 475);
    ctx.fillText('5', 250, 475);
    ctx.fillText('10', 430, 475);
    
    // X-axis title
    ctx.fillText('Tidskrävande ← Tid → Snabbt', 250, 495);
    
    // Y-axis labels
    ctx.save();
    ctx.translate(25, 430);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('1', 0, 0);
    ctx.restore();
    
    ctx.save();
    ctx.translate(25, 250);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('5', 0, 0);
    ctx.restore();
    
    ctx.save();
    ctx.translate(25, 70);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('10', 0, 0);
    ctx.restore();
    
    // Y-axis title
    ctx.save();
    ctx.translate(12, 250);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Lågt ← Värde → Högt', 0, 0);
    ctx.restore();

    // Draw quadrant labels with colors
    ctx.font = 'bold 28px Inter';
    ctx.textAlign = 'center';
    
    // B - Top left (High value, Time-consuming)
    ctx.fillStyle = categoryColors.B;
    ctx.fillText('B', 150, 150);
    
    // A - Top right (High value, Quick)  
    ctx.fillStyle = categoryColors.A;
    ctx.fillText('A', 350, 150);
    
    // D - Bottom left (Low value, Time-consuming)
    ctx.fillStyle = categoryColors.D;
    ctx.fillText('D', 150, 380);
    
    // C - Bottom right (Low value, Quick)
    ctx.fillStyle = categoryColors.C;
    ctx.fillText('C', 350, 380);

    // Draw bubbles with shadows and gradients
    bubbles.forEach(bubble => {
      // Draw shadow first
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      // Create radial gradient for bubble
      const gradientBubble = ctx.createRadialGradient(
        bubble.x - bubble.r * 0.3, bubble.y - bubble.r * 0.3, 0,
        bubble.x, bubble.y, bubble.r
      );
      gradientBubble.addColorStop(0, bubble.color);
      gradientBubble.addColorStop(1, bubble.color.replace('hsl(', 'hsla(').replace(')', ', 0.5)'));
      
      ctx.fillStyle = gradientBubble;
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.r, 0, 2 * Math.PI);
      ctx.fill();
      
      // Remove shadow for border
      ctx.shadowColor = 'transparent';
      
      // Add white border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Add subtle inner highlight
      ctx.strokeStyle = bubble.color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.r - 1.5, 0, 2 * Math.PI);
      ctx.stroke();
    });

  }, [tasks]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    setMousePos({ x: e.clientX, y: e.clientY });

    // Check if mouse is over any bubble
    const hoveredBubble = bubbles.find(bubble => {
      const distance = Math.sqrt(
        Math.pow(mouseX - bubble.x, 2) + Math.pow(mouseY - bubble.y, 2)
      );
      return distance <= bubble.r;
    });

    setHoveredTask(hoveredBubble?.task || null);
    canvas.style.cursor = hoveredBubble ? 'pointer' : 'default';
  };

  const handleMouseLeave = () => {
    setHoveredTask(null);
  };

  if (tasks.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Bubbeldiagram
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <p className="text-muted-foreground">Lägg till uppgifter för att se bubbeldiagrammet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Bubbeldiagram - Tid vs Värde
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              data-testid="bubble-chart"
              className="border-2 border-border rounded-lg shadow-lg"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ maxWidth: '100%', height: 'auto', backgroundColor: '#fafafa' }}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Tooltip */}
      {hoveredTask && (
        <div
          className="fixed z-50 px-3 py-2 bg-popover border rounded-md shadow-lg pointer-events-none"
          style={{
            left: mousePos.x + 10,
            top: mousePos.y - 40,
          }}
        >
          <div className="text-sm font-medium">{hoveredTask.name}</div>
          {hoveredTask.description && (
            <div className="text-xs text-muted-foreground mt-1">
              {hoveredTask.description}
            </div>
          )}
          <div className="text-xs text-muted-foreground mt-1">
            Tid: {hoveredTask.timeRating}/10 | Värde: {hoveredTask.valueRating}/10
          </div>
        </div>
      )}
    </div>
  );
}