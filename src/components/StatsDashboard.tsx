import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  Users, 
  Ticket,
  Download,
  Calendar
} from 'lucide-react';

const StatsDashboard = () => {
  // Mock statistics data
  const globalStats = [
    {
      title: 'Tickets ce mois',
      value: 247,
      change: +12,
      changeLabel: '+12% vs mois dernier',
      icon: Ticket,
      trend: 'up'
    },
    {
      title: 'Temps de résolution moyen',
      value: '4.2h',
      change: -23,
      changeLabel: '-23% d\'amélioration',
      icon: Clock,
      trend: 'up'
    },
    {
      title: 'Taux de résolution',
      value: '92%',
      change: +5,
      changeLabel: '+5 points',
      icon: CheckCircle,
      trend: 'up'
    },
    {
      title: 'Satisfaction client',
      value: '4.7/5',
      change: +0.3,
      changeLabel: '+0.3 points',
      icon: TrendingUp,
      trend: 'up'
    }
  ];

  const categoryStats = [
    { category: 'Matériel', count: 89, percentage: 36, color: 'bg-blue-500' },
    { category: 'Logiciel', count: 67, percentage: 27, color: 'bg-green-500' },
    { category: 'Réseau', count: 45, percentage: 18, color: 'bg-purple-500' },
    { category: 'Formation', count: 28, percentage: 11, color: 'bg-amber-500' },
    { category: 'Sécurité', count: 18, percentage: 7, color: 'bg-red-500' }
  ];

  const technicianPerformance = [
    { name: 'Marie Lambert', resolved: 42, average: '3.2h', satisfaction: 4.9 },
    { name: 'Thomas Roux', resolved: 38, average: '4.1h', satisfaction: 4.7 },
    { name: 'Julie Moreau', resolved: 35, average: '3.8h', satisfaction: 4.8 },
    { name: 'Pierre Duval', resolved: 29, average: '5.2h', satisfaction: 4.5 }
  ];

  return (
    <div className="space-y-8">
      {/* Global Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {globalStats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={stat.title} className="cosmic-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                </div>
                <div className="flex items-center text-xs">
                  <TrendIcon className={`h-3 w-3 mr-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {stat.changeLabel}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tickets by Category */}
        <Card className="cosmic-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Répartition par catégorie
            </CardTitle>
            <CardDescription>
              Distribution des tickets par type de problème
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryStats.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{category.category}</span>
                  <span className="text-muted-foreground">{category.count} tickets</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${category.color}`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {category.percentage}% du total
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Technician Performance */}
        <Card className="cosmic-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Performance des techniciens
            </CardTitle>
            <CardDescription>
              Statistiques de résolution ce mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {technicianPerformance.map((tech, index) => (
                <div key={tech.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{tech.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {tech.resolved} tickets résolus
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{tech.average}</div>
                    <div className="text-xs text-muted-foreground">
                      ⭐ {tech.satisfaction}/5
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="cosmic-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Activité récente
              </CardTitle>
              <CardDescription>
                Dernières actions sur la plateforme
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Cette semaine
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exporter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">
                  Ticket #1247 résolu par Marie Lambert
                </div>
                <div className="text-xs text-muted-foreground">
                  Problème d'imprimante - Client: Sophie Bernard
                </div>
              </div>
              <div className="text-xs text-muted-foreground">Il y a 5 min</div>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">
                  Nouveau ticket #1248 créé
                </div>
                <div className="text-xs text-muted-foreground">
                  Installation logiciel - Client: Luc Moreau
                </div>
              </div>
              <div className="text-xs text-muted-foreground">Il y a 12 min</div>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
              <div className="h-2 w-2 rounded-full bg-amber-500"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">
                  Ticket #1245 en attente client
                </div>
                <div className="text-xs text-muted-foreground">
                  Informations supplémentaires demandées
                </div>
              </div>
              <div className="text-xs text-muted-foreground">Il y a 1h</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsDashboard;