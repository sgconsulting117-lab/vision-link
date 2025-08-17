
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, Building, FileText, Calendar, DollarSign, User } from "lucide-react";
import Link from "next/link";
import { useParams } from 'next/navigation';
import { getLeadById, LeadDetail } from '@/lib/crm-data';
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function LeadDetailPage() {
    const params = useParams();
    const leadId = params.leadId as string;
    const [lead, setLead] = useState<LeadDetail | null>(null);

    useEffect(() => {
        if (leadId) {
            const fetchLead = async () => {
                const foundLead = await getLeadById(leadId);
                setLead(foundLead || null);
            };
            fetchLead();
        }
    }, [leadId]);


    if (!lead) {
        return (
            <div className="flex justify-center items-center h-full">
                <p>Cargando prospecto o prospecto no encontrado...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center mb-4">
                 <Link href="/crm/leads">
                    <Button variant="outline" size="icon" className="mr-4">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div className="flex-grow">
                    <h1 className="text-3xl font-bold">{lead.name}</h1>
                    <p className="text-gray-500">ID del prospecto: {lead.id}</p>
                </div>
                 <Badge variant="outline" className="text-lg py-1 px-4">{lead.status}</Badge>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Columna Izquierda - Detalles del Prospecto */}
                <div className="md:col-span-2 space-y-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Información de Contacto</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <User className="h-5 w-5 text-muted-foreground" />
                                <span>{lead.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="h-5 w-5 text-muted-foreground" />
                                <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">{lead.email}</a>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="h-5 w-5 text-muted-foreground" />
                                <span>{lead.phone}</span>
                            </div>
                            {lead.companyName && (
                                <div className="flex items-center gap-4">
                                    <Building className="h-5 w-5 text-muted-foreground" />
                                    <span>{lead.companyName} {lead.nit && `(NIT: ${lead.nit})`}</span>
                                </div>
                            )}
                             {lead.address && (
                                <div className="flex items-center gap-4">
                                    <Building className="h-5 w-5 text-muted-foreground" />
                                    <span>{lead.address}</span>
                                </div>
                            )}
                            {lead.clientType && (
                                <div className="flex items-center gap-4">
                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                    <span>Cliente {lead.clientType}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {lead.interest && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Solicitud del Cliente</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground italic">"{lead.interest}"</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
                
                {/* Columna Derecha - Resumen de Cotización */}
                <div className="space-y-6">
                    {lead.calculator && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Resumen de Cotización</CardTitle>
                                 <CardDescription>Configuración de la calculadora</CardDescription>
                            </CardHeader>
                            <CardContent>
                                 <ul className="text-sm text-gray-600 space-y-2">
                                    <li><strong>Cámaras:</strong> {lead.calculator.numCameras}</li>
                                    <li><strong>Días de Grabación:</strong> {lead.calculator.recordingDays}</li>
                                    <li><strong>Modalidad:</strong> {lead.ownershipType}</li>
                                    {lead.calculator.needsBackup && <li>✓ Backup en la Nube</li>}
                                    {lead.calculator.needsPhysicalBackup && <li>✓ Backup Físico</li>}
                                    {lead.calculator.needsQr && <li>✓ Código QR para acceso rápido</li>}
                                    {lead.calculator.needsMicrosite && <li>✓ Micrositio con datos de la empresa</li>}
                                    {lead.calculator.needsProjectHistory && <li>✓ Historia corta del proyecto (por un año)</li>}
                                    <li className="font-bold mt-4 pt-4 border-t">
                                        <div className="flex justify-between items-center">
                                            <span>Costo Estimado:</span>
                                            <span>Q{lead.calculator.totalCost.toFixed(2)} / mes</span>
                                        </div>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    )}
                     <Card>
                        <CardHeader>
                            <CardTitle>Actividad y Notas</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-sm text-muted-foreground">Aún no hay actividad registrada.</p>
                           <Button className="mt-4 w-full">Añadir Nota</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
