
'use client';
import {SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  LayoutTemplate,
  Video,
  QrCode,
  Sparkles,
  Home,
  PanelLeft,
  ShieldCheck,
  ChevronDown,
  LayoutDashboard,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from '@/lib/utils';
import React from 'react';


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

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/clients', label: 'Clients', icon: Users },
  { 
    href: '/crm', 
    label: 'CRM', 
    icon: ShieldCheck,
    subItems: [
        { href: '/crm/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/crm/leads', label: 'Prospectos', icon: FileText },
    ]
  },
  { href: '/landing-pages', label: 'Landing Pages', icon: LayoutTemplate },
  { href: '/videos', label: 'Videos', icon: Video },
  { href: '/qr-codes', label: 'QR Codes', icon: QrCode },
  { href: '/ai-content', label: 'AI Content', icon: Sparkles },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.startsWith(path) && (path !== '/' || pathname === '/');

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden md:flex flex-col w-64 bg-card text-card-foreground border-r">
         <div className="p-4 h-16 flex items-center border-b">
          <Logo />
         </div>
         <nav className="flex flex-col p-4 space-y-1">
           {navItems.map((item) => (
             item.subItems ? (
                <Collapsible key={item.href} defaultOpen={isActive(item.href)}>
                    <CollapsibleTrigger className="w-full">
                        <div className={`flex items-center justify-between gap-3 p-2 rounded-lg transition-colors ${isActive(item.href) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                            <div className="flex items-center gap-3">
                                <item.icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </div>
                            <ChevronDown className="h-4 w-4 transition-transform [&[data-state=open]]:rotate-180" />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="py-1 pl-7">
                        <div className="flex flex-col space-y-1">
                        {item.subItems.map(subItem => (
                             <Link href={subItem.href} key={subItem.href} className={`flex items-center gap-3 p-2 rounded-lg transition-colors text-sm ${isActive(subItem.href) ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                                <subItem.icon className="h-4 w-4" />
                                <span>{subItem.label}</span>
                            </Link>
                        ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
             ) : (
                <Link href={item.href} key={item.href} className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${isActive(item.href) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
             )
          ))}
        </nav>
        <div className="mt-auto p-4 border-t">
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer">
                   <Avatar className="h-10 w-10">
                    <AvatarImage src="https://placehold.co/40x40.png" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">admin@visionlink.com</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
       <div className="flex flex-col flex-1">
          <header className="h-16 flex items-center px-8 border-b bg-card md:hidden">
             <div className="flex items-center gap-2">
                <Logo/>
            </div>
             <div className="ml-auto md:hidden">
                <Button variant="ghost" size="icon">
                    <PanelLeft className="h-6 w-6"/>
                </Button>
            </div>
        </header>
        <main className="flex-1 p-8 overflow-auto bg-gray-50">
            {children}
        </main>
      </div>
    </div>
  );
}
