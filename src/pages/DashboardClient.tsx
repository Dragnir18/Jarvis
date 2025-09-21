import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import TicketBoard from '@/components/TicketBoard';
import CreateTicketModal from '@/components/CreateTicketModal';
import DashboardHeader from '@/components/DashboardHeader';
import { Plus, Search, Filter, User, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const DashboardClient = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulate client stats
  const stats = [
    {
      title: 'Mes Tickets',
      value: '12',
      description: 'Total de vos demandes',
      icon: User,
      color: 'text-blue-500'
    },
    {
      title: 'En Attente',
      value: '3',
      description: 'Tickets en cours',
      icon: Clock,
      color: 'text-amber-500'
    },
    {
      title: 'Résolus',
      value: '8',
      description: 'Tickets clôturés',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      title: 'Urgents',
      value: '1',
      description: 'Nécessitent attention',
      icon: AlertCircle,
      color: 'text-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        title="Espace Client"
        userRole="client"
        userName="Jean Dupont"
      />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Bonjour Jean 👋</h1>
          <p className="text-muted-foreground">
            Gérez vos demandes de support et suivez leur progression
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="cosmic-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouveau Ticket
          </Button>
          
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher dans mes tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtrer
          </Button>
        </div>

        {/* Tickets Board */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Mes Tickets SAV</h2>
            <Badge variant="secondary" className="text-sm">
              {searchQuery ? 'Résultats filtrés' : 'Tous les tickets'}
            </Badge>
          </div>
          
          <div className="cosmic-card p-6 rounded-lg">
            <TicketBoard userRole="client" searchQuery={searchQuery} />
          </div>
        </div>
      </main>

      <CreateTicketModal 
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default DashboardClient;