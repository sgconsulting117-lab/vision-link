
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, PlusCircle, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from 'next/navigation';

const cameraLinks = [
    {
        id: 'link1',
        cameraName: 'Cámara de la Entrada Principal',
        publicUrl: 'https://visionlink.stream/live/a1b2c3d4e5'
    },
    {
        id: 'link2',
        cameraName: 'Cámara del Almacén',
        publicUrl: 'https://visionlink.stream/live/f6g7h8i9j0'
    },
    {
        id: 'link3',
        cameraName: 'Cámara del Estacionamiento',
        publicUrl: 'https://visionlink.stream/live/k1l2m3n4o5'
    }
];

// Helper to convert slug to title case
const unslugify = (slug: string) => {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export default function ProjectLinksPage() {
    const params = useParams();
    const projectId = params.projectId as string;
    const projectName = unslugify(projectId);


    const handleCopy = (url: string) => {
        navigator.clipboard.writeText(url);
        // Here you could add a toast to notify the user.
        alert('¡Enlace copiado al portapapeles!');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center mb-8">
                 <Link href="/landing-pages">
                    <Button variant="outline" size="icon" className="mr-4">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">Enlaces para {projectName}</h1>
                    <p className="text-gray-500">Gestiona los enlaces públicos para este proyecto.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Links Activos</CardTitle>
                            <CardDescription>Estos enlaces permiten ver el video en vivo sin necesidad de iniciar sesión.</CardDescription>
                        </div>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Generar Nuevo Link
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre de la Cámara</TableHead>
                                <TableHead>URL del Link Público</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cameraLinks.map((link) => (
                                <TableRow key={link.id}>
                                    <TableCell className="font-medium">{link.cameraName}</TableCell>
                                    <TableCell className="font-mono">{link.publicUrl}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleCopy(link.publicUrl)}>
                                            <Copy className="mr-2 h-4 w-4" />
                                            Copiar
                                        </Button>
                                        <Button variant="destructive" size="sm">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Revocar
                                        </Button>
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

