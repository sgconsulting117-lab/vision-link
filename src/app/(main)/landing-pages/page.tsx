
'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const pages = [
    {
        id: 'summer-sale-campaign',
        name: 'Summer Sale Campaign',
        client: 'Tech Solutions Inc.',
        status: 'Published',
        previewUrl: 'https://placehold.co/400x225.png',
        dataAiHint: 'summer sale'
    },
    {
        id: 'new-product-launch',
        name: 'New Product Launch',
        client: 'Innovate LLC',
        status: 'Draft',
        previewUrl: 'https://placehold.co/400x225.png',
        dataAiHint: 'product launch'
    },
    {
        id: 'webinar-sign-up',
        name: 'Webinar Sign-up',
        client: 'Global Connect',
        status: 'Published',
        previewUrl: 'https://placehold.co/400x225.png',
        dataAiHint: 'webinar signup'
    }
]

export default function LandingPagesPage() {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Proyectos de Landing Page</h1>
          <p className="text-muted-foreground">Crea y gestiona los proyectos de tus clientes.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Crear Micrositio
        </Button>
      </div>

      <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar proyectos..." className="pl-8 w-full max-w-sm" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pages.map(page => (
            <Card key={page.name}>
                <CardHeader>
                    <Image src={page.previewUrl} alt={page.name} width={400} height={225} className="rounded-md" data-ai-hint={page.dataAiHint} />
                </CardHeader>
                <CardContent>
                    <CardTitle className="text-lg">{page.name}</CardTitle>
                    <CardDescription>{page.client}</CardDescription>
                    <div className="flex justify-between items-center mt-4">
                        {page.status === 'Published' 
                            ? <Badge variant="default">Publicado</Badge> 
                            : <Badge variant="secondary">Borrador</Badge>
                        }
                        <div className="space-x-2">
                             <Button variant="outline" size="sm">Editar</Button>
                             <Link href={`/landing-pages/${page.id}`}>
                                <Button variant="ghost" size="sm">Ver Enlaces</Button>
                             </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
