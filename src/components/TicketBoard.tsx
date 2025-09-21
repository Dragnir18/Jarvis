import React, { useState, useMemo } from 'react';
import { useToast } from "@/hooks/use-toast";
import TicketColumn, { TicketColumn as TicketColumnType } from './TicketColumn';
import { Ticket } from './TicketCard';

// Initial SAV tickets data
const initialTickets: Ticket[] = [
  {
    id: 'ticket-1',
    title: 'Écran noir au démarrage',
    description: 'Mon ordinateur portable ne s\'allume plus depuis hier matin',
    status: 'nouveau',
    priority: 'haute',
    type: 'materiel',
    clientName: 'Jean Dupont',
    technicianName: undefined,
    createdAt: '2024-01-15',
    dueDate: '2024-01-17',
    attachments: 2,
    messages: 0
  },
  {
    id: 'ticket-2',
    title: 'Installation logiciel comptabilité',
    description: 'Besoin d\'aide pour installer et configurer le nouveau logiciel',
    status: 'nouveau',
    priority: 'moyenne',
    type: 'logiciel',
    clientName: 'Marie Martin',
    technicianName: undefined,
    createdAt: '2024-01-15',
    dueDate: '2024-01-20',
    attachments: 1,
    messages: 2
  },
  {
    id: 'ticket-3',
    title: 'Problème connexion réseau',
    description: 'Impossible de se connecter au serveur depuis ce matin',
    status: 'en-cours',
    priority: 'haute',
    type: 'reseau',
    clientName: 'Pierre Durand',
    technicianName: 'Marie Lambert',
    createdAt: '2024-01-14',
    dueDate: '2024-01-16',
    attachments: 0,
    messages: 5
  },
  {
    id: 'ticket-4',
    title: 'Récupération données supprimées',
    description: 'Dossier important supprimé par erreur, besoin de récupération',
    status: 'en-cours',
    priority: 'moyenne',
    type: 'donnees',
    clientName: 'Sophie Bernard',
    technicianName: 'Thomas Roux',
    createdAt: '2024-01-13',
    dueDate: '2024-01-18',
    attachments: 0,
    messages: 3
  },
  {
    id: 'ticket-5',
    title: 'Imprimante ne répond plus',
    description: 'L\'imprimante réseau ne fonctionne plus depuis la mise à jour',
    status: 'en-attente',
    priority: 'basse',
    type: 'materiel',
    clientName: 'Luc Moreau',
    technicianName: 'Marie Lambert',
    createdAt: '2024-01-12',
    dueDate: '2024-01-19',
    attachments: 1,
    messages: 8
  },
  {
    id: 'ticket-6',
    title: 'Formation suite Office',
    description: 'Demande de formation sur les nouvelles fonctionnalités Excel',
    status: 'resolu',
    priority: 'basse',
    type: 'formation',
    clientName: 'Anne Petit',
    technicianName: 'Thomas Roux',
    createdAt: '2024-01-10',
    dueDate: '2024-01-15',
    attachments: 3,
    messages: 12
  },
  {
    id: 'ticket-7',
    title: 'Virus détecté sur poste',
    description: 'Alerte antivirus, système ralenti, besoin de nettoyage',
    status: 'cloture',
    priority: 'haute',
    type: 'securite',
    clientName: 'David Laurent',
    technicianName: 'Marie Lambert',
    createdAt: '2024-01-08',
    dueDate: '2024-01-10',
    attachments: 0,
    messages: 6
  }
];

const columns: TicketColumnType[] = [
  {
    id: 'nouveau',
    title: 'Nouveau',
    color: 'blue',
    description: 'Tickets récemment créés'
  },
  {
    id: 'en-cours',
    title: 'En Cours',
    color: 'amber',
    description: 'Tickets en traitement'
  },
  {
    id: 'en-attente',
    title: 'En Attente',
    color: 'purple',
    description: 'En attente client'
  },
  {
    id: 'resolu',
    title: 'Résolu',
    color: 'green',
    description: 'Tickets résolus'
  },
  {
    id: 'cloture',
    title: 'Clôturé',
    color: 'gray',
    description: 'Tickets fermés'
  }
];

interface TicketBoardProps {
  className?: string;
  userRole: 'client' | 'technicien' | 'admin';
  searchQuery?: string;
}

const TicketBoard: React.FC<TicketBoardProps> = ({ className, userRole, searchQuery = '' }) => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [draggedTicket, setDraggedTicket] = useState<Ticket | null>(null);
  const [dragSourceColumn, setDragSourceColumn] = useState<string | null>(null);
  const { toast } = useToast();

  // Filter tickets based on user role and search query
  const filteredTickets = useMemo(() => {
    let filtered = tickets;

    // Role-based filtering
    if (userRole === 'client') {
      // Clients only see their own tickets (simplified for demo)
      filtered = tickets.filter(ticket => ticket.clientName === 'Jean Dupont');
    }

    // Search filtering
    if (searchQuery) {
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ticket.technicianName && ticket.technicianName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  }, [tickets, userRole, searchQuery]);

  // Group tickets by status
  const ticketsByStatus = useMemo(() => {
    const grouped: Record<string, Ticket[]> = {};
    columns.forEach(column => {
      grouped[column.id] = filteredTickets.filter(ticket => ticket.status === column.id);
    });
    return grouped;
  }, [filteredTickets]);

  const handleTicketDragStart = (e: React.DragEvent, ticket: Ticket) => {
    e.dataTransfer.setData('ticketId', ticket.id);
    setDraggedTicket(ticket);
    setDragSourceColumn(ticket.status);
    e.dataTransfer.setData('sourceColumnId', ticket.status);
  };

  const handleTicketDragEnd = () => {
    setDraggedTicket(null);
    setDragSourceColumn(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Handle drag leave logic if needed
  };

  const handleDrop = (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();
    
    const ticketId = e.dataTransfer.getData('ticketId');
    const sourceStatus = e.dataTransfer.getData('sourceColumnId');
    
    if (!ticketId || !sourceStatus || sourceStatus === targetStatus) {
      return;
    }

    // Check if user has permission to move tickets
    if (userRole === 'client' && (targetStatus === 'en-cours' || targetStatus === 'resolu')) {
      toast({
        title: "Action non autorisée",
        description: "Seuls les techniciens peuvent modifier ce statut",
        variant: "destructive"
      });
      return;
    }

    // Update ticket status
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        const updatedTicket = { ...ticket, status: targetStatus as Ticket['status'] };
        
        // Auto-assign technician when moving to "en-cours"
        if (targetStatus === 'en-cours' && !ticket.technicianName && userRole === 'technicien') {
          updatedTicket.technicianName = 'Marie Lambert'; // Current user
        }
        
        return updatedTicket;
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
    
    // Show success toast
    const targetColumn = columns.find(col => col.id === targetStatus);
    if (targetColumn && draggedTicket) {
      toast({
        title: "Ticket déplacé",
        description: `${draggedTicket.title} → ${targetColumn.title}`,
      });
    }
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return { ...ticket, status: newStatus as Ticket['status'] };
      }
      return ticket;
    });
    setTickets(updatedTickets);
  };

  return (
    <div className={`flex gap-4 overflow-x-auto pb-4 ${className}`}>
      {columns.map(column => (
        <TicketColumn
          key={column.id}
          column={column}
          tickets={ticketsByStatus[column.id] || []}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onTicketDragStart={handleTicketDragStart}
          onTicketDragEnd={handleTicketDragEnd}
          onStatusChange={handleStatusChange}
          userRole={userRole}
        />
      ))}
    </div>
  );
};

export default TicketBoard;