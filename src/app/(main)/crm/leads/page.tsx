
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, FileText, UserPlus, Trash2, Contact, RefreshCw } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { useState, useEffect } from "react";
import { getLeads, Lead, LeadStatus, updateLeadStatus, convertLeadToClient } from "@/lib/crm-data";
import { useToast } from "@/hooks/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const { toast } = useToast();

  const fetchLeads = async () => {
      const leadsData = await getLeads();
      setLeads(leadsData);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (id: string, status: LeadStatus) => {
    const updatedLead = await updateLeadStatus(id, status);
    if (updatedLead) {
      fetchLeads(); // Refetch to update the list
      toast({ title: "Estado Actualizado", description: `El prospecto ahora está en estado: ${status}` });
    } else {
      toast({ title: "Error", description: "No se pudo actualizar el estado.", variant: "destructive" });
    }
  };

  const handleConvertToClient = async (id: string) => {
    const success = await convertLeadToClient(id);
    if (success) {
      fetchLeads();
      toast({ title: "¡Conversión Exitosa!", description: `El prospecto ha sido marcado como cliente.` });
    } else {
      toast({ title: "Error de Conversión", description: "No se pudo convertir el prospecto a cliente.", variant: "destructive" });
    }
  }

  const getStatusBadge = (status: LeadStatus) => {
    switch(status) {
        case 'Nuevo':
            return <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Nuevo</Badge>;
        case 'Contactado':
            return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">Contactado</Badge>;
        case 'En Negociación':
            return <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200">En Negociación</Badge>;
        case 'Ganado':
            return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">Ganado</Badge>;
        case 'Perdido':
            return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">Perdido</Badge>;
        case 'Cliente':
            return <Badge variant="default" className="bg-gray-500 text-white hover:bg-gray-600 border-gray-600">Cliente</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
  }


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Prospectos (Leads)</h1>
          <p className="text-muted-foreground">Gestiona las solicitudes de tus formularios.</p>
        </div>
        <Button onClick={fetchLeads} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4"/> Refrescar
        </Button>
      </div>
      
      <Card className="rounded-2xl shadow-lg">
        <CardHeader>
            <CardTitle>Bandeja de Entrada</CardTitle>
            <CardDescription>Aquí se listan todos los prospectos recibidos.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Origen</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} className={lead.status === 'Cliente' ? 'bg-gray-100' : ''}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.source}</Badge>
                  </TableCell>
                  <TableCell>{lead.date}</TableCell>
                  <TableCell>
                    {getStatusBadge(lead.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={lead.status === 'Cliente'}>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Link href={`/crm/leads/${lead.id}`}>
                                <DropdownMenuItem>
                                    <FileText className="mr-2 h-4 w-4" /> Ver Detalles
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            {lead.status === 'Nuevo' && (
                                <DropdownMenuItem onClick={() => handleUpdateStatus(lead.id, 'Contactado')}>
                                    <Contact className="mr-2 h-4 w-4" /> Marcar como Contactado
                                </DropdownMenuItem>
                            )}
                            {lead.status === 'Contactado' && (
                                <>
                                <DropdownMenuItem onClick={() => handleUpdateStatus(lead.id, 'En Negociación')}>
                                    <Contact className="mr-2 h-4 w-4" /> Iniciar Negociación
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUpdateStatus(lead.id, 'Perdido')}>
                                    <Trash2 className="mr-2 h-4 w-4" /> Marcar como Perdido
                                </DropdownMenuItem>
                                </>
                            )}
                            {lead.status === 'En Negociación' && (
                               <>
                                 <DropdownMenuItem onClick={() => handleUpdateStatus(lead.id, 'Ganado')}>
                                    <UserPlus className="mr-2 h-4 w-4" /> Marcar como Ganado
                                 </DropdownMenuItem>
                                 <DropdownMenuItem onClick={() => handleUpdateStatus(lead.id, 'Perdido')}>
                                    <Trash2 className="mr-2 h-4 w-4" /> Marcar como Perdido
                                 </DropdownMenuItem>
                               </>
                            )}
                            {lead.status === 'Ganado' && (
                                 <DropdownMenuItem onClick={() => handleConvertToClient(lead.id)}>
                                    <UserPlus className="mr-2 h-4 w-4" /> Convertir a Cliente
                                 </DropdownMenuItem>
                            )}
                            {lead.status === 'Perdido' && (
                                 <DropdownMenuItem onClick={() => handleUpdateStatus(lead.id, 'Contactado')}>
                                    <RefreshCw className="mr-2 h-4 w-4" /> Reactivar Prospecto
                                 </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
