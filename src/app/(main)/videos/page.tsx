
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal, Settings, History, Trash2, Link as LinkIcon } from "lucide-react";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger, 
    DialogFooter, 
    DialogClose 
} from "@/components/ui/dialog";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useCallback } from "react";
import RobustVideoPlayer from "@/components/ui/robust-video-player";

interface Camera {
    id: string;
    name: string;
    streamUrl: string;
}

const initialCameras: Camera[] = [
    { 
        id: 'cam1', 
        name: 'Puerta Principal', 
        streamUrl: 'https://213.136.81.52:8080/hls/playtv/index.m3u8',
    },
    { 
        id: 'cam2', 
        name: 'Oficina Principal', 
        streamUrl: '', 
    },
    { 
        id: 'cam3', 
        name: 'Sala de Estar', 
        streamUrl: '', 
    },
     { 
        id: 'cam4', 
        name: 'Almacén', 
        streamUrl: '', 
    },
];

export default function VideosPage() {
    const [cameras, setCameras] = useState<Camera[]>(initialCameras);
    const [newCamera, setNewCamera] = useState({ name: '', streamUrl: '' });
    const [editingCamera, setEditingCamera] = useState<Camera | null>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    
    const handleAddCamera = () => {
        if (newCamera.name) {
            const newCam: Camera = {
                id: `cam${Date.now()}`,
                ...newCamera
            };
            setCameras([newCam, ...cameras]);
            setNewCamera({ name: '', streamUrl: '' });
            setIsAddDialogOpen(false);
        }
    };
    
    const handleDeleteCamera = (idToDelete: string) => {
        setCameras(cameras.filter(camera => camera.id !== idToDelete));
    };

    const openEditDialog = (camera: Camera) => {
        setEditingCamera({...camera});
        setIsEditDialogOpen(true);
    };

    const handleEditCamera = () => {
        if (editingCamera) {
            const updatedCameras = cameras.map(cam => 
                cam.id === editingCamera.id 
                    ? { ...editingCamera }
                    : cam
            );
            setCameras(updatedCameras);
            setIsEditDialogOpen(false);
            setEditingCamera(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Video en Vivo</h1>
                    <p className="text-muted-foreground">Gestiona y visualiza tus streams de cámara.</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Añadir Cámara
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Añadir Nueva Cámara</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Nombre
                                </Label>
                                <Input id="name" value={newCamera.name} onChange={(e) => setNewCamera({ ...newCamera, name: e.target.value })} className="col-span-3" placeholder="ej., Recepción Oficina" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="streamUrl" className="text-right">
                                    URL del Stream (.m3u8)
                                </Label>
                                <Input id="streamUrl" value={newCamera.streamUrl} onChange={(e) => setNewCamera({ ...newCamera, streamUrl: e.target.value })} className="col-span-3" placeholder="http://.../index.m3u8" />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button onClick={handleAddCamera}>Añadir Cámara</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cameras.map(camera => (
                    <Card key={camera.id}>
                        <div className="aspect-video bg-black rounded-t-lg overflow-hidden">
                           <RobustVideoPlayer 
                                options={{
                                    autoplay: false,
                                    controls: true,
                                    responsive: true,
                                    fluid: true,
                                    sources: [{
                                        src: camera.streamUrl,
                                        type: 'application/x-mpegURL'
                                    }]
                                }}
                            />
                        </div>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <CardTitle className="text-lg">{camera.name}</CardTitle>
                                </div>
                                <AlertDialog>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-5 w-5" />
                                                <span className="sr-only">Más opciones</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => openEditDialog(camera)}>
                                                <Settings className="mr-2 h-4 w-4" />
                                                Ajustes
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <History className="mr-2 h-4 w-4" />
                                                Grabaciones
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <AlertDialogTrigger asChild>
                                                <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Eliminar
                                                </DropdownMenuItem>
                                            </AlertDialogTrigger>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta acción no se puede deshacer. Esto eliminará permanentemente la cámara
                                            <span className="font-bold"> {camera.name} </span>
                                            y todos sus datos asociados.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDeleteCamera(camera.id)} className="bg-red-600 hover:bg-red-700">
                                            Sí, eliminar
                                        </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                            <Button variant="outline" className="w-full">
                                <LinkIcon className="mr-2 h-4 w-4" />
                                Crear Landing Page
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Edit Camera Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Cámara</DialogTitle>
                    </DialogHeader>
                    {editingCamera && (
                         <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">
                                    Nombre
                                </Label>
                                <Input id="edit-name" value={editingCamera.name} onChange={(e) => setEditingCamera({...editingCamera, name: e.target.value})} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-streamUrl" className="text-right">
                                    URL del Stream (.m3u8)
                                </Label>
                                <Input id="edit-streamUrl" value={editingCamera.streamUrl} onChange={(e) => setEditingCamera({...editingCamera, streamUrl: e.target.value})} className="col-span-3" placeholder="http://.../index.m3u8"/>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" onClick={() => setEditingCamera(null)}>Cancelar</Button>
                        </DialogClose>
                        <Button onClick={handleEditCamera}>Guardar Cambios</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}
