import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Laptop, Wrench, Wifi, Database, GraduationCap, ShieldCheck } from 'lucide-react';

interface CreateTicketModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({ open, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [priority, setPriority] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const { toast } = useToast();

  const ticketTypes = [
    { value: 'materiel', label: 'Matériel', icon: Laptop },
    { value: 'logiciel', label: 'Logiciel', icon: Wrench },
    { value: 'reseau', label: 'Réseau', icon: Wifi },
    { value: 'donnees', label: 'Données', icon: Database },
    { value: 'formation', label: 'Formation', icon: GraduationCap },
    { value: 'securite', label: 'Sécurité', icon: ShieldCheck }
  ];

  const priorities = [
    { value: 'basse', label: 'Basse', color: 'bg-green-500' },
    { value: 'moyenne', label: 'Moyenne', color: 'bg-amber-500' },
    { value: 'haute', label: 'Haute', color: 'bg-red-500' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !type || !priority) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    // Simulate ticket creation
    toast({
      title: "Ticket créé",
      description: `Votre demande "${title}" a été enregistrée avec succès`,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setType('');
    setPriority('');
    setAttachments([]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer un nouveau ticket</DialogTitle>
          <DialogDescription>
            Décrivez votre problème ou demande. Notre équipe technique vous aidera rapidement.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Titre du problème *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Mon ordinateur ne s'allume plus"
              required
            />
          </div>

          {/* Type and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type de problème *</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  {ticketTypes.map((ticketType) => {
                    const Icon = ticketType.icon;
                    return (
                      <SelectItem key={ticketType.value} value={ticketType.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {ticketType.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priorité *</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Niveau d'urgence" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((prio) => (
                    <SelectItem key={prio.value} value={prio.value}>
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${prio.color}`}></div>
                        {prio.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description détaillée *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre problème en détail : quand cela a-t-il commencé, que s'est-il passé, avez-vous reçu des messages d'erreur..."
              rows={4}
              required
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="attachments">Pièces jointes</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4">
              <div className="text-center space-y-2">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                <div className="text-sm text-muted-foreground">
                  Glissez vos fichiers ici ou
                  <label htmlFor="file-upload" className="text-primary hover:underline cursor-pointer ml-1">
                    parcourez
                  </label>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*,.pdf,.txt,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Attachment List */}
            {attachments.length > 0 && (
              <div className="space-y-2">
                <Label>Fichiers sélectionnés:</Label>
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm truncate">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Créer le ticket
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTicketModal;