import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Settings, LogOut, User, Shield, Wrench } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  userRole: 'client' | 'technicien' | 'admin';
  userName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, userRole, userName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const roleConfig = {
    client: {
      icon: User,
      color: 'bg-blue-500',
      label: 'Client'
    },
    technicien: {
      icon: Wrench,
      color: 'bg-green-500',
      label: 'Technicien'
    },
    admin: {
      icon: Shield,
      color: 'bg-purple-500',
      label: 'Admin'
    }
  };

  const RoleIcon = roleConfig[userRole].icon;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <div className="h-4 w-4 rounded-sm bg-primary-foreground"></div>
              </div>
              <span className="font-bold text-foreground">SAV Platform</span>
            </Link>
            
            <div className="h-6 w-px bg-border"></div>
            
            <h1 className="text-lg font-medium text-foreground">{title}</h1>
            
            <Badge variant="secondary" className="flex items-center gap-1">
              <RoleIcon className="h-3 w-3" />
              {roleConfig[userRole].label}
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={`${roleConfig[userRole].color} text-white text-sm`}>
                      {userName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-medium text-foreground">{userName}</div>
                    <div className="text-xs text-muted-foreground">{roleConfig[userRole].label}</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;