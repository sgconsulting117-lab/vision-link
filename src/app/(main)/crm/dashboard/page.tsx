
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, DollarSign, Users, TrendingUp, Handshake, Target } from "lucide-react";
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, YAxis } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getLeads, Lead, getConvertedLeads, LeadDetail } from "@/lib/crm-data";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

const leadFunnelData = [
  { name: 'Nuevos', value: 120 },
  { name: 'Contactados', value: 95 },
  { name: 'Negociando', value: 60 },
  { name: 'Ganados', value: 45 },
];

const leadSourceData = [
  { name: 'Cotización', value: 250 },
  { name: 'Servicio', value: 150 },
  { name: 'Referido', value: 80 },
  { name: 'Web', value: 120 },
];

interface RecentClient {
    name: string;
    email: string;
    status: string;
    contact: string;
}


export default function CrmDashboardPage() {
    const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
    const [recentClients, setRecentClients] = useState<RecentClient[]>([]);

    useEffect(() => {
        const fetchRecentData = async () => {
            const allLeads = await getLeads();
            setRecentLeads(allLeads.slice(0, 5));

            const allClients: LeadDetail[] = await getConvertedLeads();
            const formattedClients: RecentClient[] = allClients.slice(0, 5).map(client => ({
                name: client.companyName || client.name,
                email: client.email,
                status: client.status,
                contact: client.phone
            }));
            setRecentClients(formattedClients);
        }
        fetchRecentData();
    }, []);


    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">CRM Dashboard</h1>
                <p className="text-muted-foreground">Una vista general de tus prospectos y clientes.</p>
            </div>

             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Nuevos Prospectos (30d)</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">120</div>
                        <p className="text-xs text-muted-foreground">+15% desde el mes pasado</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Negociaciones Activas</CardTitle>
                        <Handshake className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">60</div>
                        <p className="text-xs text-muted-foreground">+2 desde la semana pasada</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Clientes Ganados (Mes)</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">+25% desde el mes pasado</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">37.5%</div>
                        <p className="text-xs text-muted-foreground">+2.1% desde el mes pasado</p>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <Card>
                    <CardHeader>
                        <CardTitle>Embudo de Ventas</CardTitle>
                        <CardDescription>Distribución de prospectos por estado.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={leadFunnelData} layout="vertical" margin={{ left: 10, right: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" width={80} tickLine={false} axisLine={false} />
                                <Tooltip
                                    cursor={{fill: 'hsl(var(--muted))'}}
                                    contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}
                                />
                                <Bar dataKey="value" fill="hsl(var(--primary))" background={{ fill: 'hsl(var(--muted))' }} barSize={30} radius={[4, 4, 4, 4]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Fuentes de Prospectos</CardTitle>
                        <CardDescription>Origen de los prospectos.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={leadSourceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip
                                    cursor={{fill: 'hsl(var(--muted))'}}
                                    contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}
                                />
                                <Bar dataKey="value" fill="hsl(var(--primary))" background={{ fill: 'hsl(var(--muted))' }} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Prospectos Recientes</CardTitle>
                         <Button asChild variant="outline" size="sm" className="absolute top-6 right-6">
                            <Link href="/crm/leads">Ver todos</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="text-right">Fecha</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentLeads.map(lead => (
                                     <TableRow key={lead.id}>
                                        <TableCell>
                                            <div className="font-medium">{lead.name}</div>
                                            <div className="text-sm text-muted-foreground">{lead.email}</div>
                                        </TableCell>
                                        <TableCell><Badge variant="secondary">{lead.status}</Badge></TableCell>
                                        <TableCell className="text-right">{lead.date}</TableCell>
                                     </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Clientes Recientes</CardTitle>
                         <Button asChild variant="outline" size="sm" className="absolute top-6 right-6">
                            <Link href="/clients">Ver todos</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Compañía</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="text-right">Contacto</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentClients.map(client => (
                                     <TableRow key={client.email}>
                                        <TableCell>
                                            <div className="font-medium">{client.name}</div>
                                            <div className="text-sm text-muted-foreground">{client.email}</div>
                                        </TableCell>
                                        <TableCell><Badge>{client.status}</Badge></TableCell>
                                        <TableCell className="text-right">{client.contact}</TableCell>
                                     </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
