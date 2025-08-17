
'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Phone, Calendar, Check, ShieldCheck, Settings, Server, Lock, Building, Network, Monitor, Quote, Users, Home, ThumbsUp, Briefcase, Mail, MapPin, ChevronRight, Navigation } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { processQuoteRequest } from "@/ai/flows/process-quote-request";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import HLSPlayer from '@/components/ui/hls-player';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";


function Logo({ className }: { className?: string }) {
  return (
    (<Link href="/dashboard" className="flex items-center gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="currentColor"/>
      </svg>
      <span className="font-bold text-xl">VisionLink</span>
    </Link>)
  );
}

function VisionLinkLogo({ className }: { className?: string }) {
  return (
    (<div className="flex items-center gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="currentColor"/>
      </svg>
      <span className="font-bold text-xl text-white">VisionLink</span>
    </div>)
  );
}

const navItems = ["INICIO", "PÁGINAS", "SOBRE NOSOTROS", "SERVICIOS", "TIENDA", "NOTICIAS", "CONTACTO"];

const projects = [
    { name: "Edificio Corporativo Central", category: "Supervisión 24/7", youtubeVideoId: "ScMzIvxBSi4" },
    { name: "Plaza Comercial 'El Sol'", category: "Control de Acceso", youtubeVideoId: "ScMzIvxBSi4" },
    { name: "Residencial 'Vistas del Valle'", category: "Cámaras Perimetrales", youtubeVideoId: "ScMzIvxBSi4" },
    { name: "Parque Industrial 'Innova'", category: "Monitoreo de Almacenes", youtubeVideoId: "ScMzIvxBSi4" },
];

const seals = [
    { src: "https://placehold.co/100x100.png", alt: "Sello Servicio Élite", dataAiHint: "elite service seal" },
    { src: "https://placehold.co/100x100.png", alt: "Sello Garantía de Satisfacción 100%", dataAiHint: "satisfaction guarantee seal" },
    { src: "https://placehold.co/100x100.png", alt: "Sello Servicio al Cliente", dataAiHint: "customer service seal" },
    { src: "https://placehold.co/100x100.png", alt: "Sello Soporte 24/7", dataAiHint: "24/7 support seal" },
]

const servicesLeft = [
    { title: "Kit de Cámaras de Monitoreo", description: "Instalación de cámaras resistentes a condiciones de obra, con visión nocturna y grabación HD para control visual del avance y seguridad.", icon: <Settings className="h-8 w-8 text-white" /> },
    { title: "Sistema de Antenas y Tags", description: "Tecnología RFID para rastreo de equipos, herramientas y personal dentro del área de construcción.", icon: <Server className="h-8 w-8 text-white" /> },
    { title: "Alarmas y Cerraduras de Gabinete", description: "Dispositivos de seguridad para proteger gabinetes eléctricos, centros de control y áreas restringidas.", icon: <Lock className="h-8 w-8 text-white" /> },
];

const servicesRight = [
    { title: "Diseño de Sistemas de Monitoreo 24/7", description: "Planificación e integración de sistemas de videovigilancia continua para supervisar actividades en tiempo real y garantizar la seguridad del sitio.", icon: <Building className="h-8 w-8 text-white" /> },
    { title: "Rastreo de Activos con GPS", description: "Accesorios de monitoreo que permiten registrar el uso y ubicación de herramientas críticas en tiempo real, a través de GPS.", icon: <Navigation className="h-8 w-8 text-white" /> },
    { title: "DVRs de Monitoreo", description: "Equipos de grabación digital para almacenamiento seguro de imágenes y respaldo de evidencia visual.", icon: <Monitor className="h-8 w-8 text-white" /> },
];

const footerStats = [
    { icon: <Users className="h-8 w-8 text-gray-700" />, value: "50+", label: "PROYECTOS COMPLETADOS" },
    { icon: <Home className="h-8 w-8 text-gray-700" />, value: "15+", label: "PROYECTOS RESIDENCIALES" },
    { icon: <ThumbsUp className="h-8 w-8 text-gray-700" />, value: "70+", label: "CLIENTES SATISFECHOS" },
    { icon: <Briefcase className="h-8 w-8 text-gray-700" />, value: "175+", label: "OBRAS PUBLICAS" },
]

const portfolioVideos = [
    { youtubeVideoId: "ScMzIvxBSi4", alt: "Instalación de CCTV" },
    { youtubeVideoId: "ScMzIvxBSi4", alt: "Monitoreo de seguridad" },
    { youtubeVideoId: "ScMzIvxBSi4", alt: "Control de acceso" },
    { youtubeVideoId: "ScMzIvxBSi4", alt: "Técnico de seguridad" },
    { youtubeVideoId: "ScMzIvxBSi4", alt: "Cámara de exterior" },
    { youtubeVideoId: "ScMzIvxBSi4", alt: "Cableado de seguridad" },
];

const pricingPlans = [
    {
        name: "Plan Básico",
        price: "350.00",
        features: ["11 enlaces en vivo (link)", "Transmisión en Vivo 24/7", "Acceso web y móvil", "Soporte básico"],
        featured: false,
    },
    {
        name: "Plan Profesional",
        price: "750.00",
        features: [
            "Hasta 39 enlaces en vivo (link)",
            "Transmisión en Vivo 24/7",
            "Acceso web y móvil",
            "Soporte básico",
            "Cámaras de Vigilancia y Monitoreo en Tiempo Real",
            "QR personalizado",
            "Enlace personalizado (Link) (opción a colocar logotipo, referencias, dato de contacto)",
        ],
        featured: true,
    },
    {
        name: "Plan Integrador",
        price: "1150.00",
        features: [
            "Hasta 79 enlaces en vivo (link)",
            "Transmisión en Vivo 24/7",
            "Acceso web y móvil",
            "Soporte básico",
            "Enlace personalizado (opción a colocar logotipo, referencias, dato de contacto)",
            "QR personalizado",
            "Acceso Multi-usuario",
            "Integración API",
        ],
        featured: false,
    }
];

const testimonials = [
  {
    author: "🚧 Ing. Marco A.",
    title: "Coordinador de Infraestructura – Ministerio de Obras Públicas",
    text: "Implementamos el sistema de monitoreo VisionLink en tres frentes de trabajo simultáneos. La transmisión en tiempo real nos permitió supervisar avances, verificar cumplimiento de protocolos y documentar incidentes. El soporte técnico fue impecable.",
  },
  {
    author: "🏫 Arq. Silvia G.",
    title: "Supervisora Técnica – Proyecto de Escuela Pública Rural",
    text: "La instalación de cámaras resistentes al clima y con visión nocturna fue fundamental para proteger materiales y equipos en zonas vulnerables. VisionLink nos ofreció soluciones adaptadas al entorno y con entrega el mismo día. Muy recomendados.",
  },
  {
    author: "🏗️ Ing. Daniel R.",
    title: "Jefe de Proyecto – Construcción de Hospital Regional",
    text: "Gracias al sistema RFID y GPS, logramos rastrear herramientas críticas y controlar el acceso del personal en áreas restringidas. Esto redujo pérdidas y mejoró la trazabilidad del proyecto. VisionLink fue un aliado estratégico.",
  },
  {
    author: "🏢 Lic. Ana M.",
    title: "Encargada de Seguridad – Municipalidad Metropolitana",
    text: "Contratamos VisionLink para la supervisión de obras viales. El sistema de cámaras con DVR nos permitió tener respaldo visual para auditorías internas y reportes ciudadanos. La atención personalizada y el soporte 24/7 marcaron la diferencia.",
  },
  {
    author: "🛠️ Ing. Jorge T.",
    title: "Director de Proyectos – Secretaría de Desarrollo Urbano",
    text: "En proyectos de gran escala como la renovación de plazas públicas, contar con monitoreo continuo fue clave para garantizar transparencia y seguridad. VisionLink cumplió con los estándares técnicos exigidos por el gobierno y entregó resultados confiables.",
  },
];


export default function ConstructionMonitoringPage() {
    const { toast } = useToast();
    const [serviceRequest, setServiceRequest] = useState({ name: '', email: '', phone: '', interest: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [numCameras, setNumCameras] = useState(1);
    const [recordingDays, setRecordingDays] = useState(7);
    const [needsBackup, setNeedsBackup] = useState(false);
    const [needsPhysicalBackup, setNeedsPhysicalBackup] = useState(false);
    const [needsQr, setNeedsQr] = useState(false);
    const [needsMicrosite, setNeedsMicrosite] = useState(false);
    const [needsProjectHistory, setNeedsProjectHistory] = useState(false);
    const [ownershipType, setOwnershipType] = useState({ renta: false, propiedad: false, dvr: false, inalambrica: false });
    const [totalCost, setTotalCost] = useState(0);
    const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
    const [quoteDetails, setQuoteDetails] = useState({
        name: '',
        email: '',
        phone: '',
        interest: '',
        nit: '',
        companyName: '',
        address: '',
        clientType: '',
        logo: null as File | null,
        logoDataUri: '',
        ownershipType: '',
    });
    const [isEquipmentSelected, setIsEquipmentSelected] = useState(false);

    const plugin = useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    const handleOwnershipChange = (type: 'renta' | 'propiedad' | 'dvr' | 'inalambrica', checked: boolean | 'indeterminate') => {
        if (typeof checked !== 'boolean') return;

        setOwnershipType(prev => {
            const newState = { ...prev, [type]: checked };
            if (type === 'renta' && checked) {
                newState.propiedad = false;
            }
            if (type === 'propiedad' && checked) {
                newState.renta = false;
            }
            return newState;
        });
    };

    const getOwnershipTypeString = () => {
        const types = [];
        if (ownershipType.renta) types.push('Renta');
        if (ownershipType.propiedad) types.push('Propiedad');
        if (ownershipType.dvr) types.push('DVR');
        if (ownershipType.inalambrica) types.push('Cámara Inalámbrica');
        return types.join(' + ') || 'No seleccionada';
    }


    useEffect(() => {
        let monthlyCost = 0;
        let oneTimeCost = 0;

        const equipmentSelected = ownershipType.renta || ownershipType.propiedad || ownershipType.dvr || ownershipType.inalambrica;
        setIsEquipmentSelected(equipmentSelected);

        let cameraCost = 0;
        if (ownershipType.renta) {
            let baseCameraCost = 0;
            if (numCameras > 0) {
                baseCameraCost = 500 + (numCameras - 1) * 275;
            }
            const recordingBlocks = Math.max(1, Math.ceil(recordingDays / 15));
             cameraCost = baseCameraCost + (500 * numCameras * (recordingBlocks -1));
        } else if (ownershipType.propiedad) {
            if (ownershipType.inalambrica) {
                cameraCost = numCameras * 1900;
            } else {
                 cameraCost = numCameras * 500;
            }
        }
        
        let dvrCost = ownershipType.dvr ? 1500 : 0;
        
        const backupCost = needsBackup ? numCameras * 235 : 0;
        const physicalBackupCost = needsPhysicalBackup ? 670 : 0;

        if (needsQr) oneTimeCost += 100;
        if (needsMicrosite) oneTimeCost += 100;
        if (needsProjectHistory) oneTimeCost += 300;

        if (!equipmentSelected && !needsBackup && !needsPhysicalBackup && !needsQr && !needsMicrosite && !needsProjectHistory) {
             monthlyCost = 150;
        } else {
             monthlyCost = 150 + cameraCost + dvrCost + backupCost + physicalBackupCost;
        }
        
        setTotalCost(monthlyCost + oneTimeCost);
    }, [numCameras, recordingDays, needsBackup, needsPhysicalBackup, needsQr, needsMicrosite, needsProjectHistory, ownershipType]);


    const handleServiceRequestSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const result = await processQuoteRequest(serviceRequest);
            toast({
                title: "Solicitud Enviada",
                description: result.message,
            });
            setServiceRequest({ name: '', email: '', phone: '', interest: '' });
        } catch (error) {
            toast({
                title: "Error",
                description: "Hubo un problema al enviar su solicitud. Por favor, inténtelo de nuevo.",
                variant: "destructive",
            });
        }
        setIsSubmitting(false);
    };

    const fileToDataUri = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleQuoteSubmit = async () => {
        setIsSubmitting(true);
        let logoDataUri = '';
        if (quoteDetails.logo) {
            try {
                logoDataUri = await fileToDataUri(quoteDetails.logo);
            } catch (error) {
                 toast({
                    title: "Error con el Logo",
                    description: "No se pudo procesar el archivo del logotipo.",
                    variant: "destructive",
                });
                setIsSubmitting(false);
                return;
            }
        }

        try {
            const result = await processQuoteRequest({
                name: quoteDetails.name,
                email: quoteDetails.email,
                phone: quoteDetails.phone,
                interest: quoteDetails.interest,
                companyName: quoteDetails.companyName,
                nit: quoteDetails.nit,
                address: quoteDetails.address,
                clientType: quoteDetails.clientType,
                logoDataUri: logoDataUri,
                ownershipType: getOwnershipTypeString(),
                calculator: {
                    numCameras,
                    recordingDays,
                    needsBackup,
                    needsPhysicalBackup,
                    needsQr,
                    needsMicrosite,
                    needsProjectHistory,
                    totalCost
                }
            });
            toast({
                title: "Cotización Enviada",
                description: result.message,
            });
            setIsQuoteDialogOpen(false);
        } catch (error) {
            toast({
                title: "Error",
                description: "Hubo un problema al enviar su cotización. Por favor, inténtelo de nuevo.",
                variant: "destructive",
            });
        }
        setIsSubmitting(false);
    };


    return (
        <div className="bg-[#0D2847] min-h-screen text-white font-sans">
            {/* Header */}
            <header className="border-b border-white/10">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <Logo className="text-white" />
                    <div className="flex items-center gap-4">
                        <Image src="https://placehold.co/50x50.png" alt="Instalador de cámara CCTV" width={50} height={50} data-ai-hint="cctv camera installer" />
                        <div>
                            <p className="font-bold text-sm">20% de descuento en la instalación</p>
                            <p className="text-xs">Cámara CCTV</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-red-500" />
                        <div>
                            <p className="text-xs">Llámanos hoy</p>
                            <p className="font-bold">+502 4789 4248</p>
                        </div>
                    </div>
                </div>
            </header>

             {/* Navigation Bar */}
            <nav className="bg-[#007BFF]">
                 <div className="container mx-auto px-4 flex justify-center items-center">
                    {navItems.map((item) => (
                        <a href="#" key={item} className="px-4 py-3 text-sm font-bold hover:bg-blue-700 transition-colors">{item}</a>
                    ))}
                </div>
            </nav>

            <main className="bg-white text-gray-800">
                {/* Hero Section */}
                <section className="bg-[#0D2847] text-white relative bg-cover bg-center" style={{backgroundImage: "url('https://placehold.co/1920x1080.png')"}} data-ai-hint="construction worker cctv">
                     <div className="absolute inset-0 bg-[#0D2847]/80"></div>
                    <div className="container mx-auto px-4 py-16 relative">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            {/* Left Column */}
                            <div className="space-y-6">
                                <p className="text-lg font-semibold text-blue-400">¿Necesita supervisión para su obra?</p>
                                <h1 className="text-5xl font-bold leading-tight">
                                    Streaming 24/7,<br/>Llama ahora
                                </h1>
                                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold text-2xl py-8 px-10 rounded-lg">
                                    +502 4789 4248
                                </Button>
                                <ul className="space-y-3 pt-4">
                                    <li className="flex items-center gap-3">
                                        <Check className="h-6 w-6 text-yellow-400" />
                                        <span>Fácil instalación</span>
                                    </li>
                                     <li className="flex items-center gap-3">
                                        <Check className="h-6 w-6 text-yellow-400" />
                                        <span>Su link disponible el mismo día</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Check className="h-6 w-6 text-yellow-400" />
                                        <span>Soporte técnico 24/7</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Check className="h-6 w-6 text-yellow-400" />
                                        <span>Asesoramiento amable y personalizado</span>
                                    </li>
                                </ul>
                                 <div className="pt-4">
                                    <Image src="https://placehold.co/400x200.png" width={400} height={200} alt="Cámaras de monitoreo CCTV en una obra" data-ai-hint="cctv cameras" />
                                </div>
                            </div>

                            {/* Right Column (Form) */}
                            <div className="bg-red-700 p-8 rounded-lg relative max-w-md mx-auto w-full">
                                <div className="text-center text-white">
                                    <div className="inline-block p-4 bg-red-700 rounded-full border-4 border-dotted border-red-500 mb-4">
                                        <Calendar className="h-8 w-8 text-white" />
                                    </div>
                                    <p className="font-semibold">Programe una</p>
                                    <h2 className="text-2xl font-bold mb-4">Cita</h2>
                                    <div className="text-center mb-4">
                                        <span className="text-red-400">---</span>
                                        <span className="text-white mx-2">o</span>
                                        <span className="text-red-400">---</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-6">Solicitar servicio</h3>
                                </div>
                                <form className="space-y-4 max-w-sm mx-auto" onSubmit={handleServiceRequestSubmit}>
                                    <div>
                                        <Input type="text" placeholder="Nombre" className="bg-red-800 border-none text-white placeholder-red-200 rounded-md" value={serviceRequest.name} onChange={(e) => setServiceRequest({...serviceRequest, name: e.target.value})} required/>
                                    </div>
                                    <div>
                                        <Input type="email" placeholder="Correo electrónico" className="bg-red-800 border-none text-white placeholder-red-200 rounded-md" value={serviceRequest.email} onChange={(e) => setServiceRequest({...serviceRequest, email: e.target.value})} required/>
                                    </div>
                                    <div>
                                        <Input type="tel" placeholder="Teléfono" className="bg-red-800 border-none text-white placeholder-red-200 rounded-md" value={serviceRequest.phone} onChange={(e) => setServiceRequest({...serviceRequest, phone: e.target.value})} required/>
                                    </div>
                                    <div>
                                        <Textarea placeholder="¿Cuál es su interés?" className="bg-red-800 border-none text-white placeholder-red-200 rounded-md min-h-[100px]" value={serviceRequest.interest} onChange={(e) => setServiceRequest({...serviceRequest, interest: e.target.value})} required/>
                                    </div>
                                    <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-md text-lg" disabled={isSubmitting}>
                                        {isSubmitting ? "Enviando..." : "ENVIAR SOLICITUD"}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold">Nuestros Proyectos <span className="text-red-600">Destacados</span></h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Contamos con la experiencia y el personal calificado para instalar sistemas de seguridad que protegen su propiedad. Vea algunos de nuestros trabajos.
                        </p>
                        <div className="grid md:grid-cols-4 gap-8 mt-12">
                            {projects.map((project) => (
                                <div key={project.name} className="relative group overflow-hidden rounded-lg shadow-lg">
                                    <div className="aspect-video w-full bg-black">
                                        <iframe
                                            className="w-full h-full"
                                            src={`https://www.youtube.com/embed/${project.youtubeVideoId}?autoplay=1&mute=1`}
                                            title={project.name}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-[#007BFF] text-white p-4">
                                        <h3 className="font-bold">{project.name}</h3>
                                        <p className="text-sm">{project.category}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                 {/* Seals Banner Section */}
                <section className="bg-[#007BFF] py-8">
                    <div className="container mx-auto px-4 flex justify-around items-center">
                       <VisionLinkLogo className="text-white" />
                        {seals.map((seal, index) => (
                             <Image key={index} src={seal.src} alt={seal.alt} width={80} height={80} data-ai-hint={seal.dataAiHint} />
                        ))}
                    </div>
                </section>

                 {/* Services Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <p className="text-gray-600 font-semibold">Servicios de Seguridad 360 para obra civil</p>
                            <h2 className="text-4xl font-bold text-blue-600">Sistemas de Monitoreo 24/7</h2>
                        </div>
                        <div className="grid md:grid-cols-3 items-center gap-8">
                            {/* Left Services */}
                            <div className="space-y-8">
                                {servicesLeft.map((service, index) => (
                                    <div key={service.title} className="flex items-start gap-4 text-right">
                                        <div>
                                            <h3 className="font-bold text-lg">{service.title}</h3>
                                            <p className="text-gray-600">{service.description}</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                                                {service.icon}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Center Image */}
                            <div className="flex justify-center">
                                <Image src="https://placehold.co/300x450.png" width={300} height={450} alt="Cámara de seguridad CCTV" data-ai-hint="cctv camera product" />
                            </div>
                            {/* Right Services */}
                             <div className="space-y-8">
                                {servicesRight.map((service, index) => (
                                    <div key={service.title} className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                                                {service.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{service.title}</h3>
                                            <p className="text-gray-600">{service.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Testimonials Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold mb-12">
                            Más de <span className="text-red-600">20k+</span> vecinos beneficiados con nuestro trabajo
                        </h2>
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
                                {testimonials.map((testimonial, index) => (
                                    <CarouselItem key={index} className="md:basis-1/2">
                                        <div className="p-4 h-full">
                                            <div className="bg-gray-50 p-8 rounded-lg shadow-md text-left h-full flex flex-col">
                                                <div className="flex items-start gap-4 mb-4 flex-grow">
                                                    <Quote className="h-12 w-12 text-blue-500 -scale-x-100 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-gray-600 mb-4">“{testimonial.text}”</p>
                                                        <p className="font-bold">{testimonial.author}</p>
                                                        <p className="text-sm text-gray-500">{testimonial.title}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="text-blue-600" />
                            <CarouselNext className="text-blue-600" />
                        </Carousel>

                        <div className="flex justify-center gap-2 mt-8">
                            <span className="h-3 w-3 bg-blue-600 rounded-full"></span>
                            <span className="h-3 w-3 bg-gray-300 rounded-full"></span>
                            <span className="h-3 w-3 bg-gray-300 rounded-full"></span>
                        </div>
                    </div>
                    <div className="container mx-auto px-4 text-center mt-16">
                        <p className="text-gray-600">Con la confianza de +397 empresas en todo el mundo</p>
                        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 mt-6">
                            <Image src="https://placehold.co/120x40.png" width={120} height={40} alt="Logo de la empresa Envato" data-ai-hint="company logo envato" />
                            <Image src="https://placehold.co/120x40.png" width={120} height={40} alt="Logo de la empresa Flaticon" data-ai-hint="company logo flaticon" />
                            <Image src="https://placehold.co/120x40.png" width={120} height={40} alt="Logo de la empresa Awwwards" data-ai-hint="company logo awwwards" />
                            <Image src="https://placehold.co/120x40.png" width={120} height={40} alt="Logo de la empresa Dribbble" data-ai-hint="company logo dribbble" />
                            <Image src="https://placehold.co/120x40.png" width={120} height={40} alt="Logo de la empresa Themeforest" data-ai-hint="company logo themeforest" />
                            <Image src="https://placehold.co/120x40.png" width={120} height={40} alt="Logo de la empresa Behance" data-ai-hint="company logo behance" />
                        </div>
                    </div>
                </section>

                {/* Pricing Table Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold">Planes de Precios Video en vivo 24/7</h2>
                            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                                Escoja el plan que mejor se adapte a tus necesidades de supervisión.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 items-center">
                            {pricingPlans.map((plan, index) => (
                                <div key={index} className={`border rounded-lg p-6 text-center flex flex-col h-full ${plan.featured ? 'bg-[#007BFF] text-white shadow-2xl transform scale-105' : 'bg-white'}`}>
                                    <div className={`py-4 ${plan.featured ? '' : 'bg-gray-100 rounded-t-md'}`}>
                                        <h3 className="text-xl font-bold uppercase tracking-wider">{plan.name}</h3>
                                    </div>
                                    <div className="py-8">
                                        <span className="text-5xl font-bold">Q{plan.price.split('.')[0]}</span>
                                        <span className="text-xl">.{plan.price.split('.')[1]} / mes</span>
                                    </div>
                                    <ul className="space-y-4 text-left flex-grow mb-8 px-4">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className={`border-t border-dashed pt-4 flex justify-center ${plan.featured ? 'border-white/50' : 'border-gray-200'}`}>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button className={`${plan.featured ? 'bg-white text-[#007BFF] hover:bg-gray-200' : 'bg-[#007BFF] text-white hover:bg-blue-700'}`}>
                                        Comprar Ahora
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Demo & Calculator Section */}
                <section className="bg-white py-20">
                    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Column: Product Demo */}
                        <div className="space-y-6">
                            <h3 className="text-3xl font-bold">Video Demostrativo del Producto</h3>
                            <p className="text-gray-600">
                                Para utilizar nuestro servicio basta con compartir el nombre de su proyecto (menor a 70 caracteres) para generar su link, le compartiremos la dirección del servidor, protocolo de transmisión y clave de transmisión para que pueda empezar a utilizar nuestro servicio. Si no tiene contratado a un Integrador de CCTV puede contratar servicios de integración de cámaras para monitorear su obra.
                            </p>
                            <div className="aspect-video w-full rounded-lg shadow-lg overflow-hidden bg-black">
                               <iframe 
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&mute=1" 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen>
                                </iframe>
                            </div>
                        </div>
                        {/* Right Column: Calculator */}
                        <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                            <h2 className="text-3xl font-bold mb-4">Calculadora de Costo</h2>
                             <p className="text-gray-600 mb-8">
                                Utilice nuestra calculadora para obtener una estimación del costo de su instalación. Los precios son una aproximación y pueden variar.
                            </p>
                            
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <Label htmlFor="num-cameras" className="font-bold">Número de Cámaras</Label>
                                        <span className="text-blue-600 font-semibold">{numCameras}</span>
                                    </div>
                                    <Slider id="num-cameras" min={1} max={50} step={1} value={[numCameras]} onValueChange={(value) => setNumCameras(value[0])} />
                                </div>
                                <div className={!isEquipmentSelected ? 'opacity-50' : ''}>
                                     <div className="flex justify-between items-center mb-2">
                                        <Label htmlFor="recording-days" className="font-bold">Días de Grabación</Label>
                                        <span className="text-blue-600 font-semibold">{recordingDays}</span>
                                    </div>
                                    <Slider 
                                        id="recording-days" 
                                        min={1} 
                                        max={90} 
                                        step={1} 
                                        value={[recordingDays]} 
                                        onValueChange={(value) => setRecordingDays(value[0])} 
                                        disabled={!isEquipmentSelected}
                                    />
                                </div>

                                <div>
                                    <Label className="font-bold">Modalidad de Equipo</Label>
                                    <div className="flex flex-wrap items-center gap-4 mt-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="renta"
                                                checked={ownershipType.renta}
                                                onCheckedChange={(checked) => handleOwnershipChange('renta', checked)}
                                            />
                                            <Label htmlFor="renta" className="font-normal">Renta</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="propiedad"
                                                checked={ownershipType.propiedad}
                                                onCheckedChange={(checked) => handleOwnershipChange('propiedad', checked)}
                                            />
                                            <Label htmlFor="propiedad" className="font-normal">Propiedad</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="dvr"
                                                checked={ownershipType.dvr}
                                                onCheckedChange={(checked) => handleOwnershipChange('dvr', checked)}
                                            />
                                            <Label htmlFor="dvr" className="font-normal">DVR</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="inalambrica"
                                                checked={ownershipType.inalambrica}
                                                onCheckedChange={(checked) => handleOwnershipChange('inalambrica', checked)}
                                            />
                                            <Label htmlFor="inalambrica" className="font-normal">Camara inalambrica</Label>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                        <Label htmlFor="needs-backup" className="font-medium">Backup en la Nube (por 30 días)</Label>
                                        <Switch id="needs-backup" checked={needsBackup} onCheckedChange={setNeedsBackup} />
                                    </div>
                                     <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                        <Label htmlFor="needs-physical-backup" className="font-medium">Backup Físico de todos los dias de grabación</Label>
                                        <Switch id="needs-physical-backup" checked={needsPhysicalBackup} onCheckedChange={setNeedsPhysicalBackup} />
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                        <Label htmlFor="needs-qr" className="font-medium">Código QR para acceso rápido</Label>
                                        <Switch id="needs-qr" checked={needsQr} onCheckedChange={setNeedsQr} />
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                        <Label htmlFor="needs-microsite" className="font-medium">Micrositio con datos de su empresa</Label>
                                        <Switch id="needs-microsite" checked={needsMicrosite} onCheckedChange={setNeedsMicrosite} />
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                        <Label htmlFor="needs-project-history" className="font-medium">Historia corta del proyecto (por un año)</Label>
                                        <Switch id="needs-project-history" checked={needsProjectHistory} onCheckedChange={setNeedsProjectHistory} />
                                    </div>
                                </div>
                            </div>
                             <div className="bg-blue-100 border border-blue-200 rounded-lg p-6 text-center mt-8">
                                <p className="text-lg text-blue-800">Costo mensual estimado</p>
                                <p className="text-5xl font-bold text-blue-600 my-2">Q{totalCost.toFixed(2)}</p>
                                <Dialog open={isQuoteDialogOpen} onOpenChange={setIsQuoteDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="mt-4 w-full bg-[#007BFF] hover:bg-blue-700">Solicitar Cotización Formal</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px]">
                                        <DialogHeader>
                                            <DialogTitle>Solicitar Cotización Formal</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input placeholder="Nombre" value={quoteDetails.name} onChange={(e) => setQuoteDetails({...quoteDetails, name: e.target.value})} required />
                                                <Input placeholder="Teléfono" value={quoteDetails.phone} onChange={(e) => setQuoteDetails({...quoteDetails, phone: e.target.value})} required />
                                            </div>
                                            <Input type="email" placeholder="Correo electrónico" value={quoteDetails.email} onChange={(e) => setQuoteDetails({...quoteDetails, email: e.target.value})} required />
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input placeholder="Nombre de la Empresa" value={quoteDetails.companyName} onChange={(e) => setQuoteDetails({...quoteDetails, companyName: e.target.value})} />
                                                <Input placeholder="Número de NIT" value={quoteDetails.nit} onChange={(e) => setQuoteDetails({...quoteDetails, nit: e.target.value})} />
                                            </div>
                                            <Input placeholder="Dirección" value={quoteDetails.address} onChange={(e) => setQuoteDetails({...quoteDetails, address: e.target.value})} />
                                            
                                            <div>
                                                <Label htmlFor="logo" className="text-sm">Logotipo de su empresa (opcional)</Label>
                                                <Input id="logo" type="file" onChange={(e) => setQuoteDetails({...quoteDetails, logo: e.target.files ? e.target.files[0] : null})} />
                                            </div>

                                            <div>
                                                <Label className="text-sm font-medium">Tipo de Cliente</Label>
                                                <RadioGroup
                                                    value={quoteDetails.clientType}
                                                    onValueChange={(value) => setQuoteDetails({...quoteDetails, clientType: value})}
                                                    className="flex gap-4 mt-2"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="constructora" id="constructora" />
                                                        <Label htmlFor="constructora" className="font-normal">Constructora</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="integrador" id="integrador" />
                                                        <Label htmlFor="integrador" className="font-normal">Integrador</Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>

                                            <div>
                                                <Label htmlFor="interest" className="text-sm">Amplíe su solicitud</Label>
                                                <Textarea id="interest" placeholder="Describa sus necesidades específicas here..." value={quoteDetails.interest} onChange={(e) => setQuoteDetails({...quoteDetails, interest: e.target.value})} />
                                            </div>

                                            <div className="mt-4 pt-4 border-t">
                                                <h4 className="font-semibold mb-2">Resumen de la Selección:</h4>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li><strong>Cámaras:</strong> {numCameras}</li>
                                                    <li><strong>Días de Grabación:</strong> {recordingDays}</li>
                                                    <li><strong>Modalidad:</strong> {getOwnershipTypeString()}</li>
                                                    <li><strong>Tipo de Cliente:</strong> {quoteDetails.clientType || 'No seleccionado'}</li>
                                                    {needsBackup && <li>Backup en la Nube</li>}
                                                    {needsPhysicalBackup && <li>Backup Físico</li>}
                                                    {needsQr && <li>Código QR para acceso rápido</li>}
                                                    {needsMicrosite && <li>Micrositio con datos de la empresa</li>}
                                                    {needsProjectHistory && <li>Historia corta del proyecto (por un año)</li>}
                                                    <li className="font-bold mt-2">Costo Total Estimado: Q{totalCost.toFixed(2)} / mes</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline">Cancelar</Button>
                                            </DialogClose>
                                            <Button onClick={handleQuoteSubmit} className="bg-[#007BFF] hover:bg-blue-700" disabled={isSubmitting}>
                                                {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-white text-gray-800 border-t">
                {/* Stats Section */}
                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {footerStats.map((stat) => (
                                <div key={stat.label} className="flex flex-col items-center">
                                    {stat.icon}
                                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                                    <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Banner */}
                <section className="bg-[#007BFF] py-8">
                    <div className="container mx-auto px-4 flex justify-between items-center">
                        <h3 className="text-xl text-white font-semibold">VisionLink: Su socio estratégico en seguridad y monitoreo.</h3>
                        <Button className="bg-black text-white hover:bg-gray-800">Empiece ahora</Button>
                    </div>
                </section>

                {/* Main Footer */}
                <div className="py-16 bg-gray-100">
                    <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
                        {/* Column 1: About */}
                        <div className="space-y-4">
                            <VisionLinkLogo className="text-blue-600" />
                            <p className="text-sm text-gray-600">
                                En VisionLink, entendemos que la seguridad y la confianza son la base de su tranquilidad. Por eso, nos dedicamos a ofrecer soluciones de monitoreo de vanguardia que protegen lo que más le importa.
                            </p>
                        </div>
                        {/* Column 2: Important Links */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-lg">Enlaces importantes</h4>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="text-gray-600 hover:text-blue-600 flex items-center gap-2"><ChevronRight className="w-4 h-4" /> Soporte</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-600 flex items-center gap-2"><ChevronRight className="w-4 h-4" /> Privacidad y política</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-600 flex items-center gap-2"><ChevronRight className="w-4 h-4" /> Términos y condiciones</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-600 flex items-center gap-2"><ChevronRight className="w-4 h-4" /> Paquetes</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-600 flex items-center gap-2"><ChevronRight className="w-4 h-4" /> Nuestra red</a></li>
                            </ul>
                        </div>
                        {/* Column 3: Recent Portfolio */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-lg">Portafolio reciente</h4>
                            <div className="grid grid-cols-3 gap-2">
                               {portfolioVideos.map(video => (
                                    <div key={video.alt} className="aspect-square">
                                        <iframe
                                            className="w-full h-full rounded-md"
                                            src={`https://www.youtube.com/embed/${video.youtubeVideoId}?autoplay=1&mute=1`}
                                            title={video.alt}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                               ))}
                            </div>
                        </div>
                        {/* Column 4: Contact Us */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-lg">Contacta con nosotros</h4>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex items-start gap-2">
                                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                                    <span>2a Calle 1-47 Zona 1, San Pedro Sacatepéquez, SM</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone className="w-5 h-5" />
                                    <span>+502 4789 4248</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail className="w-5 h-5" />
                                    <span>contacto@cooperativa.cai.gt</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="bg-gray-200 py-4">
                    <div className="container mx-auto px-4 text-center text-sm text-gray-600">
                        Copyright © 2024. Todos los derechos reservados por. VisionLink
                    </div>
                </div>
            </footer>
        </div>
    );
}

