import React, { useState } from 'react';
import TicketCard, { Ticket } from './TicketCard';
import { Badge } from '@/components/ui/badge';

export interface TicketColumn {
  id: string;
  title: string;
  color: string;
  description: string;
}

interface TicketColumnProps {
  column: TicketColumn;
  tickets: Ticket[];
  onDrop: (e: React.DragEvent, columnId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onTicketDragStart: (e: React.DragEvent, ticket: Ticket) => void;
  onTicketDragEnd: () => void;
  onStatusChange: (ticketId: string, newStatus: string) => void;
  userRole: 'client' | 'technicien' | 'admin';
}

const TicketColumn: React.FC<TicketColumnProps> = ({
  column,
  tickets,
  onDrop,
  onDragOver,
  onDragLeave,
  onTicketDragStart,
  onTicketDragEnd,
  onStatusChange,
  userRole
}) => {
  const [isOver, setIsOver] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
    onDragOver(e);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    setIsOver(false);
    onDragLeave(e);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    setIsOver(false);
    onDrop(e, column.id);
  };

  const colorConfig = {
    blue: 'bg-blue-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    gray: 'bg-gray-500'
  };

  return (
    <div 
      className={`flex flex-col w-80 min-w-80 rounded-lg border border-border backdrop-blur-sm transition-all duration-300 ${
        isOver ? 'column-highlight border-primary/50' : 'bg-card/50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${colorConfig[column.color] || 'bg-muted'}`}></div>
            <h3 className="font-semibold text-foreground">{column.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {tickets.length}
            </Badge>
          </div>
          <div className="text-muted-foreground">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12V12.01M8 12V12.01M16 12V12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{column.description}</p>
      </div>
      
      <div className="p-3 flex-1 space-y-3 overflow-auto max-h-[600px]">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onDragStart={onTicketDragStart}
            onDragEnd={onTicketDragEnd}
            onStatusChange={onStatusChange}
            userRole={userRole}
          />
        ))}
        
        {tickets.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-sm">Aucun ticket</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketColumn;