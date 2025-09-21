import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TicketBoard from '@/components/TicketBoard';
import UserManagement from '@/components/UserManagement';
import StatsDashboard from '@/components/StatsDashboard';
import DashboardHeader from '@/components/DashboardHeader';
import { Search, Filter, Shield, Users, Ticket, TrendingUp, Settings, BarChart3 } from 'lucide-react';

const DashboardAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Simulate admin stats
  const stats = [
    {
      title: 'Total Tickets',
      value: '247',
      description: '+12% ce mois',
      icon: Ticket,
      color: 'text-blue-500'
    },
    {
      title: 'Utilisateurs Actifs',
      value: '89',
      description: '15 nouveaux',
      icon: Users,
      color: 'text-green-500'
    },
    {
      title: 'Temps Moyen',
      value: '4.2h',
      description: '-23% vs mois dernier',
      icon: TrendingUp,
      color: 'text-purple-500'
    },
    {
      title: 'Satisfaction',
      value: '4.7/5',
      description: '+0.3 points',
      icon: BarChart3,
      color: 'text-amber-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        title="Administration"
        userRole="admin"
        userName="Pierre Martin"
      />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Tableau de Bord Admin ⚙️</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de la plateforme SAV et gestion complète
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

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="tickets" className="flex items-center gap-2">
              <Ticket className="h-4 w-4" />
              Tickets
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <StatsDashboard />
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher tous les tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtres avancés
              </Button>
            </div>

            {/* All Tickets Board */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Tous les Tickets</h2>
                <Badge variant="secondary" className="text-sm">
                  {searchQuery ? 'Résultats filtrés' : 'Vue complète'}
                </Badge>
              </div>
              
              <div className="cosmic-card p-6 rounded-lg">
                <TicketBoard userRole="admin" searchQuery={searchQuery} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserManagement />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="cosmic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configuration de la Plateforme
                </CardTitle>
                <CardDescription>
                  Gérez les paramètres généraux de la plateforme SAV
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Module de configuration en cours de développement</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DashboardAdmin;