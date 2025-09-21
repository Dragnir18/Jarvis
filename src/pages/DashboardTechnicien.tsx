import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import TicketBoard from '@/components/TicketBoard';
import DashboardHeader from '@/components/DashboardHeader';
import { Search, Filter, Wrench, Clock, CheckCircle, Users, AlertTriangle } from 'lucide-react';

const DashboardTechnicien = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulate technician stats
  const stats = [
    {
      title: 'Tickets Assignés',
      value: '15',
      description: 'À traiter',
      icon: Wrench,
      color: 'text-blue-500'
    },
    {
      title: 'En Cours',
      value: '7',
      description: 'En traitement',
      icon: Clock,
      color: 'text-amber-500'
    },
    {
      title: 'Résolus Aujourd\'hui',
      value: '5',
      description: 'Tickets fermés',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      title: 'Priorité Haute',
      value: '3',
      description: 'Urgents',
      icon: AlertTriangle,
      color: 'text-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        title="Espace Technicien"
        userRole="technicien"
        userName="Marie Lambert"
      />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Bonjour Marie 🔧</h1>
          <p className="text-muted-foreground">
            Gérez vos tickets assignés et aidez les clients
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
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher dans les tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtrer par priorité
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Tickets non assignés
          </Button>
        </div>

        {/* Performance Summary */}
        <Card className="cosmic-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Performance du jour
            </CardTitle>
            <CardDescription>
              Vos statistiques de résolution de tickets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">92%</div>
                <div className="text-sm text-muted-foreground">Taux de résolution</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">2.3h</div>
                <div className="text-sm text-muted-foreground">Temps moyen</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">4.8/5</div>
                <div className="text-sm text-muted-foreground">Satisfaction client</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tickets Board */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Gestion des Tickets</h2>
            <Badge variant="secondary" className="text-sm">
              {searchQuery ? 'Résultats filtrés' : 'Tous les tickets'}
            </Badge>
          </div>
          
          <div className="cosmic-card p-6 rounded-lg">
            <TicketBoard userRole="technicien" searchQuery={searchQuery} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardTechnicien;