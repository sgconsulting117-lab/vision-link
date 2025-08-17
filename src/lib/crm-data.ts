
'use server';

import type { QuoteRequestInput } from '@/ai/flows/process-quote-request';

export type LeadStatus = 'Nuevo' | 'Contactado' | 'En Negociación' | 'Ganado' | 'Perdido' | 'Cliente';
export type ClientStatus = 'Active' | 'Trial' | 'Inactive';

export interface Lead {
  id: string;
  name: string;
  email: string;
  source: 'Servicio' | 'Cotización';
  status: LeadStatus;
  date: string;
}

export type LeadDetail = QuoteRequestInput & {
  id: string;
  status: LeadStatus;
  source: 'Servicio' | 'Cotización';
  date: string;
}

export interface Client {
  name: string;
  contact: string;
  email: string;
  status: ClientStatus;
}


// In-memory data store for demonstration purposes.
// In a real application, you would use a database.
let leads: LeadDetail[] = [
  {
    id: 'lead001',
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '+502 1234 5678',
    source: 'Cotización',
    status: 'Nuevo',
    date: '2024-07-28',
    companyName: 'Constructora El Sol',
    nit: '1234567-8',
    address: 'Avenida Siempre Viva 123, Ciudad',
    clientType: 'constructora',
    interest: 'Quisiera una cotización formal con los detalles que seleccioné. También me interesa saber sobre las opciones de pago.',
    calculator: {
      numCameras: 5,
      recordingDays: 30,
      needsBackup: true,
      needsPhysicalBackup: false,
      needsQr: true,
      needsMicrosite: true,
      totalCost: 435,
      needsProjectHistory: false,
    },
    ownershipType: 'Renta',
  },
  {
    id: 'lead002',
    name: 'Ana García',
    email: 'ana.garcia@example.com',
    phone: '+502 8765 4321',
    source: 'Servicio',
    status: 'Contactado',
    date: '2024-07-27',
    interest: 'Necesito soporte técnico para mi instalación actual.'
  },
  {
    id: 'lead003',
    name: 'Empresa Constructora XYZ',
    email: 'contacto@constructoraxyz.com',
    phone: '+502 5555 5555',
    source: 'Cotización',
    status: 'En Negociación',
    date: '2024-07-26',
    companyName: 'Constructora XYZ',
    nit: '8765432-1',
    address: 'Calle Falsa 456, Ciudad',
    clientType: 'constructora',
    interest: 'Interesado en el plan empresarial.',
     calculator: {
      numCameras: 25,
      recordingDays: 90,
      needsBackup: true,
      needsPhysicalBackup: true,
      needsQr: true,
      needsMicrosite: true,
      needsProjectHistory: true,
      totalCost: 3000,
    },
    ownershipType: 'Renta + DVR',
  },
    {
    id: 'lead004',
    name: 'Carlos Lopez',
    email: 'carlos.lopez@integra.com',
    phone: '+502 11223344',
    source: 'Cotización',
    status: 'Ganado',
    date: '2024-07-25',
    companyName: 'Integradores Asociados',
    nit: '1122334-5',
    address: 'Boulevard Principal 789',
    clientType: 'integrador',
    interest: 'Cotización para proyecto de reventa.',
     calculator: {
      numCameras: 10,
      recordingDays: 60,
      needsBackup: true,
      needsPhysicalBackup: false,
      needsQr: false,
      needsMicrosite: false,
      needsProjectHistory: false,
      totalCost: 850,
    },
    ownershipType: 'Propiedad',
  },
    {
    id: 'lead005',
    name: 'Lucia Fernandez',
    email: 'lucia.f@dominio.com',
    phone: '+502 99887766',
    source: 'Servicio',
    status: 'Perdido',
    date: '2024-07-24',
    interest: 'Solicitaba un servicio que no ofrecemos.'
  },
];

// Functions to interact with the data.

// LEAD FUNCTIONS
export async function getLeads(): Promise<Lead[]> {
    return leads
        .map(({ id, name, email, source, status, date }) => ({
            id, name, email, source, status, date
        })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getLeadById(id: string): Promise<LeadDetail | null> {
    const lead = leads.find(lead => lead.id === id)
    return lead ? {...lead} : null;
}

export async function addLead(leadData: QuoteRequestInput): Promise<LeadDetail> {
    const newId = `lead${String(Date.now()).slice(-6)}`;
    const newLead: LeadDetail = {
        id: newId,
        status: 'Nuevo',
        source: leadData.calculator ? 'Cotización' : 'Servicio',
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        ...leadData,
    };
    leads.unshift(newLead); // Add to the beginning of the array
    return newLead;
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<LeadDetail | null> {
    const leadIndex = leads.findIndex(lead => lead.id === id);
    if (leadIndex > -1) {
        leads[leadIndex].status = status;
        return leads[leadIndex];
    }
    return null;
}

export async function convertLeadToClient(leadId: string): Promise<boolean> {
    const lead = await getLeadById(leadId);
    if (!lead || lead.status !== 'Ganado') {
        return false; // Can only convert 'Won' leads
    }
    
    const updatedLead = await updateLeadStatus(leadId, 'Cliente'); // Mark lead as converted
    
    return !!updatedLead;
}

// CLIENT FUNCTIONS
export async function getConvertedLeads(): Promise<LeadDetail[]> {
    return [...leads]
        .filter(lead => lead.status === 'Cliente')
        .sort((a, b) => a.name.localeCompare(b.name));
}
