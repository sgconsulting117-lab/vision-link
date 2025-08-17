
'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Video, RadioTower, Film, Rocket, Tv, ArrowRight, Check, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";


const navItems = ["Plataforma", "Links", "Recursos"];
const solucionesDropdown = [
    "Media and Broadcasters",
    "Radio y Podcast",
    "Enterprise",
    "Educación en línea",
    "Agencias y Anunciantes",
    "Ecommerce y Retail",
    "VAST Inspector"
];

const plataformaDropdown = [
    { name: "MoAI", new: true },
    { name: "Platform" },
    { name: "OTT" },
    { name: "MediaFirst" },
    { name: "Live Streaming" },
    { name: "Fast Channels" },
    { name: "Audio y Podcast" },
    { name: "Audience Advertiser" },
    { name: "Audience Publisher" },
    { name: "CDN" },
];

const videoVigilanciaDropdown = [
    {name: "Camaras FTP", href: "#"}, 
    {name: "CCTV", href: "#"},
    {name: "Links", href: "/construction-monitoring"}
];

const solutions = [
    {
        icon: <RadioTower className="h-10 w-10 text-blue-500" />,
        title: "Live Streaming",
        description: "Transmite eventos en vivo a audiencias masivas con la más alta calidad y la menor latencia del mercado.",
        link: "#"
    },
    {
        icon: <Film className="h-10 w-10 text-blue-500" />,
        title: "Video On Demand (VOD)",
        description: "Aloja, gestiona y distribuye tu catálogo de videos de forma segura, rápida y con una experiencia de usuario impecable.",
        link: "#"
    },
    {
        icon: <Tv className="h-10 w-10 text-blue-500" />,
        title: "Plataforma OTT",
        description: "Crea y lanza tu propio Netflix. Una solución completa para desplegar tu servicio de streaming en web, móviles y Smart TVs.",
        link: "#"
    },
    {
        icon: <Rocket className="h-10 w-10 text-blue-500" />,
        title: "Proyectos Especiales",
        description: "Desarrollamos soluciones de video a medida para necesidades complejas. Tu visión, nuestra tecnología.",
        link: "#"
    },
];

const platformFeatures = [
    "Player de video personalizable y de alta performance.",
    "CDN global para una entrega de contenido ultrarrápida.",
    "Sistema de monetización flexible (AVOD, SVOD, TVOD).",
    "Analíticas detalladas para entender a tu audiencia.",
    "Máxima seguridad con DRM y protección de contenido.",
    "APIs robustas para una integración total."
];

const partners = [
    { name: "Partner 1", logo: "https://placehold.co/150x50.png", hint: "company logo" },
    { name: "Partner 2", logo: "https://placehold.co/150x50.png", hint: "company logo" },
    { name: "Partner 3", logo: "https://placehold.co/150x50.png", hint: "company logo" },
    { name: "Partner 4", logo: "https://placehold.co/150x50.png", hint: "company logo" },
    { name: "Partner 5", logo: "https://placehold.co/150x50.png", hint: "company logo" },
    { name: "Partner 6", logo: "https://placehold.co/150x50.png", hint: "company logo" },
];

function Logo({ className }: { className?: string }) {
  return (
    (<Link href="/dashboard" className="flex items-center gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("text-primary", className)}
        >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="currentColor"/>
      </svg>
      <span className={cn("font-bold text-xl text-primary", className)}>VisionLink</span>
    </Link>)
  );
}

export default function WelcomePage() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );

    return (
        <div className="bg-white min-h-screen text-gray-800 font-sans">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Logo className="text-gray-900" />
                    <nav className="hidden md:flex items-center gap-8">
                       <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium focus:outline-none">
                                Soluciones <ChevronDown className="h-4 w-4 ml-1" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {solucionesDropdown.map(item => (
                                    <DropdownMenuItem key={item}>
                                        <a href="#">{item}</a>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium focus:outline-none">
                                Plataforma <ChevronDown className="h-4 w-4 ml-1" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {plataformaDropdown.map(item => (
                                    <DropdownMenuItem key={item.name}>
                                        <a href="#" className="flex justify-between w-full items-center">
                                            {item.name}
                                            {item.new && <Badge variant="default" className="bg-purple-500 text-white ml-4">NEW</Badge>}
                                        </a>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium focus:outline-none">
                                Video Monitoreo <ChevronDown className="h-4 w-4 ml-1" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {videoVigilanciaDropdown.map(item => (
                                    <DropdownMenuItem key={item.name}>
                                        <Link href={item.href}>{item.name}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Recursos</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost">Contacto</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">Comenzar</Button>
                    </div>
                </div>
            </header>
            
            <main>
                {/* Hero Section */}
                <section className="bg-white py-20 md:py-32">
                    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                                La plataforma de video que impulsa tu negocio
                            </h1>
                            <p className="text-lg text-gray-600 mt-6">
                                Soluciones de streaming robustas y escalables para que puedas transmitir, gestionar y monetizar tu contenido de video sin complicaciones.
                            </p>
                            <div className="mt-10 flex gap-4">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Explorar Soluciones</Button>
                                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700">Hablar con un experto</Button>
                            </div>
                        </div>
                        <div className="relative">
                            <Image src="https://placehold.co/600x400.png" alt="Dashboard de la plataforma de streaming" width={600} height={400} className="rounded-lg shadow-2xl" data-ai-hint="streaming dashboard" />
                             <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-blue-100 rounded-full -z-10"></div>
                             <div className="absolute -top-8 -left-8 w-24 h-24 bg-gray-100 rounded-full -z-10"></div>
                        </div>
                    </div>
                </section>

                {/* Partners Section */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-gray-500 font-medium mb-6">Con la confianza de empresas líderes en todo el mundo:</p>
                        <Carousel
                            plugins={[plugin.current]}
                            className="w-full max-w-4xl mx-auto"
                            onMouseEnter={plugin.current.stop}
                            onMouseLeave={plugin.current.reset}
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                        >
                            <CarouselContent>
                                {partners.map((partner, index) => (
                                    <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                                        <div className="p-1">
                                            <Image
                                                src={partner.logo}
                                                alt={partner.name}
                                                width={130}
                                                height={40}
                                                className="opacity-70"
                                                data-ai-hint={partner.hint}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </section>
                
                {/* Solutions Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold">Soluciones de Video para Cada Necesidad</h2>
                            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                                No importa el tamaño de tu audiencia o la complejidad de tu proyecto, tenemos la tecnología para llevar tu estrategia de video al siguiente nivel.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {solutions.map((solution) => (
                                <div key={solution.title} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                                    <div className="mb-4">{solution.icon}</div>
                                    <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                                    <p className="text-gray-600 mb-4 flex-grow">{solution.description}</p>
                                    <a href={solution.link} className="text-blue-600 font-semibold hover:underline flex items-center gap-2">
                                        Saber más <ArrowRight className="h-4 w-4" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Platform Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
                        <div>
                             <Image src="https://placehold.co/600x500.png" alt="Reproductor de video en múltiples dispositivos" width={600} height={500} className="rounded-lg shadow-xl" data-ai-hint="video player devices" />
                        </div>
                         <div>
                             <h3 className="text-lg font-semibold text-blue-600">Nuestra Plataforma</h3>
                             <h2 className="text-3xl font-bold mt-2 mb-6">Tecnología de Punta para tu Contenido</h2>
                             <p className="text-gray-600 mb-8">
                                Nuestra plataforma de video integral te da el control total sobre tu contenido. Desde la ingesta y el transcoding hasta la distribución y monetización, todo en un solo lugar.
                             </p>
                            <ul className="space-y-4">
                                {platformFeatures.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <Check className="h-6 w-6 bg-green-100 text-green-600 rounded-full p-1" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button size="lg" className="mt-10 bg-blue-600 hover:bg-blue-700">Ver todas las funcionalidades</Button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                {/* CTA Section */}
                <div className="bg-blue-600">
                    <div className="container mx-auto px-4 py-12 text-center">
                        <h3 className="text-3xl font-bold mb-4">¿Listo para potenciar tu estrategia de video?</h3>
                        <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                           Habla con uno de nuestros expertos y descubre cómo VisionLink puede ayudarte a alcanzar tus objetivos.
                        </p>
                        <Button size="lg" variant="secondary" className="bg-white hover:bg-gray-200 text-blue-600 font-bold">
                            Contactar a Ventas
                        </Button>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="grid md:grid-cols-5 gap-8">
                        {/* Column 1: Logo & About */}
                        <div className="space-y-4 col-span-2">
                             <Logo className="text-white"/>
                            <p className="text-sm text-gray-400 max-w-sm">
                                VisionLink es la plataforma líder en soluciones de video streaming para empresas en Latinoamérica, ayudando a medios, corporaciones y organizaciones a transmitir su mensaje al mundo.
                            </p>
                        </div>
                        {/* Column 2: Soluciones */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-lg">Soluciones</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-blue-400">Live Streaming</a></li>
                                <li><a href="#" className="hover:text-blue-400">Video on Demand</a></li>
                                <li><a href="#" className="hover:text-blue-400">Plataformas OTT</a></li>
                                <li><a href="#" className="hover:text-blue-400">Proyectos Especiales</a></li>
                            </ul>
                        </div>
                         {/* Column 3: Empresa */}
                        <div className="space-y-4">
                             <h4 className="font-bold text-lg">Empresa</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-blue-400">Sobre Nosotros</a></li>
                                <li><a href="#" className="hover:text-blue-400">Carreras</a></li>
                                <li><a href="#" className="hover:text-blue-400">Prensa</a></li>
                                <li><a href="#" className="hover:text-blue-400">Contacto</a></li>
                            </ul>
                        </div>
                        {/* Column 4: Legal */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-lg">Legal</h4>
                             <ul className="space-y-3 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-blue-400">Términos de Servicio</a></li>
                                <li><a href="#" className="hover:text-blue-400">Política de Privacidad</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                 {/* Copyright */}
                <div className="border-t border-gray-800 py-6">
                    <div className="container mx-auto px-4 text-center text-sm text-gray-500">
                         Copyright © 2024 VisionLink. Todos los derechos reservados.
                    </div>
                </div>
            </footer>
        </div>
    );
}
