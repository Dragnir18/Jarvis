import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { User, Shield, Settings } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'client' | 'technicien' | 'admin'>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in real app, this would call authentication API
    localStorage.setItem('userRole', selectedRole);
    navigate(`/dashboard/${selectedRole}`);
  };

  const roleConfig = {
    client: {
      icon: User,
      title: 'Client',
      description: 'Créer et suivre vos tickets SAV',
      color: 'bg-blue-500'
    },
    technicien: {
      icon: Settings,
      title: 'Technicien',
      description: 'Gérer et résoudre les tickets',
      color: 'bg-green-500'
    },
    admin: {
      icon: Shield,
      title: 'Administrateur',
      description: 'Gérer la plateforme et les utilisateurs',
      color: 'bg-purple-500'
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Plateforme SAV</h1>
          <p className="text-muted-foreground">Connectez-vous pour accéder à votre espace</p>
        </div>

        <Card className="cosmic-card">
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
            <CardDescription>
              Sélectionnez votre type de compte et connectez-vous
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as any)} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                {Object.entries(roleConfig).map(([role, config]) => {
                  const Icon = config.icon;
                  return (
                    <TabsTrigger key={role} value={role} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {config.title}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {Object.entries(roleConfig).map(([role, config]) => {
                const Icon = config.icon;
                return (
                  <TabsContent key={role} value={role} className="space-y-4">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                      <div className={`p-2 rounded-full ${config.color}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{config.title}</h3>
                        <p className="text-sm text-muted-foreground">{config.description}</p>
                      </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="votre@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Se connecter en tant que {config.title}
                      </Button>
                    </form>
                  </TabsContent>
                );
              })}
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Nouveau sur la plateforme ?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Créer un compte
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;