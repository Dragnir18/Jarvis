import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar, 
  User, 
  MessageCircle, 
  Paperclip, 
  AlertTriangle, 
  Clock,
  CheckCircle,
  Wrench,
  Shield,
  Laptop,
  Wifi,
  Database,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'nouveau' | 'en-cours' | 'en-attente' | 'resolu' | 'cloture';
  priority: 'basse' | 'moyenne' | 'haute';
  type: 'materiel' | 'logiciel' | 'reseau' | 'donnees' | 'formation' | 'securite';
  clientName: string;
  technicianName?: string;
  createdAt: string;
  dueDate: string;
  attachments: number;
  messages: number;
}

interface TicketCardProps {
  ticket: Ticket;
  onDragStart: (e: React.DragEvent, ticket: Ticket) => void;
  onDragEnd: () => void;
  onStatusChange: (ticketId: string, newStatus: string) => void;
  userRole: 'client' | 'technicien' | 'admin';
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  onDragStart,
  onDragEnd,
  onStatusChange,
  userRole
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    const cardElement = e.currentTarget as HTMLElement;
    cardElement.classList.add('dragging');
    
    // Create a ghost image
    const ghostImage = cardElement.cloneNode(true) as HTMLElement;
    ghostImage.style.transform = 'rotate(5deg)';
    ghostImage.style.opacity = '0.8';
    document.body.appendChild(ghostImage);
    ghostImage.style.position = 'absolute';
    ghostImage.style.top = '-1000px';
    e.dataTransfer.setDragImage(ghostImage, 0, 0);
    
    setTimeout(() => document.body.removeChild(ghostImage), 0);
    
    onDragStart(e, ticket);
  };

  const handleDragEnd = () => {
    const cardElement = document.querySelector(`[data-ticket-id="${ticket.id}"]`) as HTMLElement;
    if (cardElement) {
      cardElement.classList.remove('dragging');
    }
    onDragEnd();
  };

  const priorityConfig = {
    basse: { color: 'bg-green-500', label: 'Basse' },
    moyenne: { color: 'bg-amber-500', label: 'Moyenne' },
    haute: { color: 'bg-red-500', label: 'Haute' }
  };

  const typeIcons = {
    materiel: Laptop,
    logiciel: Wrench,
    reseau: Wifi,
    donnees: Database,
    formation: GraduationCap,
    securite: ShieldCheck
  };

  const TypeIcon = typeIcons[ticket.type];

  return (
    <Card
      className="task-card cursor-grab active:cursor-grabbing"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      data-ticket-id={ticket.id}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <TypeIcon className="h-4 w-4 text-muted-foreground" />
            <Badge variant="outline" className="text-xs">
              #{ticket.id.slice(-4)}
            </Badge>
          </div>
          <div className={`h-3 w-3 rounded-full ${priorityConfig[ticket.priority].color}`} 
               title={`Priorité ${priorityConfig[ticket.priority].label}`} />
        </div>
        
        <h4 className="font-medium text-sm leading-tight text-foreground line-clamp-2">
          {ticket.title}
        </h4>
      </CardHeader>
      
      <CardContent className="pt-2 space-y-3">
        <p className="text-xs text-muted-foreground line-clamp-2">
          {ticket.description}
        </p>
        
        {/* Client and Technician Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <User className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Client:</span>
            <span className="font-medium text-foreground">{ticket.clientName}</span>
          </div>
          
          {ticket.technicianName && (
            <div className="flex items-center gap-2 text-xs">
              <Wrench className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">Technicien:</span>
              <span className="font-medium text-foreground">{ticket.technicianName}</span>
            </div>
          )}
        </div>
        
        {/* Due Date */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>Échéance: {new Date(ticket.dueDate).toLocaleDateString('fr-FR')}</span>
        </div>
        
        {/* Status Indicators */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            {ticket.attachments > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Paperclip className="h-3 w-3" />
                <span>{ticket.attachments}</span>
              </div>
            )}
            
            {ticket.messages > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MessageCircle className="h-3 w-3" />
                <span>{ticket.messages}</span>
              </div>
            )}
          </div>
          
          {/* Urgency Indicator */}
          {ticket.priority === 'haute' && (
            <AlertTriangle className="h-4 w-4 text-red-500" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketCard;