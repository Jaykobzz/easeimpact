import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { type Task } from "@shared/schema";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportButtonProps {
  tasks: Task[];
  chartRef?: React.RefObject<HTMLDivElement>;
}

export default function ExportButton({ tasks, chartRef }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    if (tasks.length === 0) return;
    
    setIsExporting(true);
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Title
      pdf.setFontSize(20);
      pdf.text('Uppgiftsprioritering', 20, 30);
      
      pdf.setFontSize(10);
      pdf.text(`Genererad: ${new Date().toLocaleDateString('sv-SE')}`, 20, 40);
      
      let yPosition = 60;
      
      // Group tasks by category
      const categories = ['A', 'B', 'C', 'D'];
      const categoryNames = {
        A: 'A - Snabbt med högt värde',
        B: 'B - Tidskrävande med högt värde', 
        C: 'C - Snabbt med lågt värde',
        D: 'D - Tidskrävande med lågt värde'
      };
      
      categories.forEach(category => {
        const categoryTasks = tasks.filter(task => task.category === category);
        if (categoryTasks.length === 0) return;
        
        // Category header
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(categoryNames[category as keyof typeof categoryNames], 20, yPosition);
        yPosition += 10;
        
        // Tasks in category
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        
        categoryTasks.forEach(task => {
          if (yPosition > 250) {
            pdf.addPage();
            yPosition = 30;
          }
          
          pdf.text(`• ${task.name}`, 25, yPosition);
          yPosition += 5;
          
          if (task.description) {
            const splitDescription = pdf.splitTextToSize(`  ${task.description}`, 160);
            pdf.text(splitDescription, 25, yPosition);
            yPosition += splitDescription.length * 5;
          }
          
          pdf.text(`  Tid: ${task.timeRating}/5, Värde: ${task.valueRating}/5`, 25, yPosition);
          yPosition += 10;
        });
        
        yPosition += 5;
      });
      
      // Add chart if available
      if (chartRef?.current) {
        try {
          const canvas = await html2canvas(chartRef.current, {
            backgroundColor: '#ffffff',
            scale: 2
          });
          
          pdf.addPage();
          pdf.setFontSize(14);
          pdf.text('Bubbeldiagram', 20, 30);
          
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 170;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          pdf.addImage(imgData, 'PNG', 20, 40, imgWidth, imgHeight);
        } catch (error) {
          console.warn('Could not add chart to PDF:', error);
        }
      }
      
      // Save the PDF
      pdf.save('uppgiftsprioritering.pdf');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={exportToPDF}
      disabled={tasks.length === 0 || isExporting}
      data-testid="button-export-pdf"
      className="gap-2"
    >
      {isExporting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {isExporting ? 'Skapar PDF...' : 'Spara som PDF'}
    </Button>
  );
}