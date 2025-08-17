'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ShoppingBag, Link as LinkIcon, Users, MoreHorizontal, Search, Filter } from "lucide-react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const activities = [
  {
    category: 'Landing Pages',
    amount: '12 Active',
    value: 60,
    icon: <LayoutTemplateIcon className="h-6 w-6 text-muted-foreground" />
  },
  {
    category: 'Video Plays',
    amount: '1.2k Views',
    value: 75,
    icon: <PlayIcon className="h-6 w-6 text-muted-foreground" />
  },
  {
    category: 'QR Code Scans',
    amount: '842 Scans',
    value: 40,
    icon: <QrCodeIcon className="h-6 w-6 text-muted-foreground" />
  },
  {
    category: 'New Clients',
    amount: '3 New',
    value: 25,
    icon: <Users className="h-6 w-6 text-muted-foreground" />
  },
]

const recentClients = [
    { name: 'Innovate LLC', email: 'contact@innovate.com', status: 'Active', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Tech Solutions Inc.', email: 'hello@techsolutions.com', status: 'Trial', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Global Connect', email: 'support@globalconnect.com', status: 'Active', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Creative Agency', email: 'projects@creative.co', status: 'Inactive', avatar: 'https://placehold.co/40x40.png' },
]

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Columna Izquierda */}
      <div className="lg:col-span-1 space-y-8">
        <Card className="bg-card-foreground text-primary-foreground rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-3xl font-bold">$2,367.45</p>
              </div>
              <div className="w-12 h-8 relative">
                 <Image src="https://raw.githubusercontent.com/steven-tey/nextjs-typescript-starter/main/public/mastercard.png" layout="fill" objectFit="contain" alt="Mastercard" />
              </div>
            </div>
            <div className="mt-6 text-lg tracking-wider">
              <span>5631</span>
              <span className="ml-4">0110</span>
              <span className="ml-4">7010</span>
              <span className="ml-4">5423</span>
            </div>
             <div className="mt-2 text-sm text-muted-foreground">
              <span>08/22</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>Fast transfer</CardTitle>
                <Button variant="ghost" size="sm">More</Button>
            </div>
          </CardHeader>
          <CardContent className="flex justify-around gap-4">
            <Button variant="secondary" className="w-full h-16 rounded-lg bg-secondary/50">Transfer</Button>
            <Button variant="secondary" className="w-full h-16 rounded-lg bg-secondary/50">SWIFT</Button>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle>Activities</CardTitle>
            <CardDescription>$45,345.75</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {activities.map(activity => (
              <div key={activity.category} className="flex items-center gap-4">
                <div className="p-3 bg-secondary rounded-lg">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{activity.category}</p>
                    <p className="text-sm text-muted-foreground">{activity.amount}</p>
                  </div>
                  <Progress value={activity.value} className="h-2 mt-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Columna Derecha */}
      <div className="lg:col-span-2 space-y-8">
        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle>Payment templates</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 overflow-x-auto pb-4">
              <div className="flex-shrink-0 w-64 bg-secondary/50 p-4 rounded-lg">
                  <p className="font-semibold">Internet and TV</p>
                  <p className="text-sm text-muted-foreground">Triolan company</p>
                  <p className="mt-4 text-sm text-muted-foreground">09 Sep 2020</p>
                  <p className="font-mono mt-1">348 300 878</p>
              </div>
              <div className="flex-shrink-0 w-64 bg-green-100 p-4 rounded-lg border border-green-200">
                  <p className="font-semibold">Electricity supply</p>
                  <p className="text-sm text-muted-foreground">International Energy Society</p>
                  <p className="mt-4 text-sm text-muted-foreground">07 Mar 2020</p>
                  <p className="font-mono mt-1">564 787 874</p>
              </div>
               <div className="flex-shrink-0 w-64 bg-blue-100 p-4 rounded-lg">
                  <p className="font-semibold">Water supply</p>
                  <p className="text-sm text-muted-foreground">AquaForce</p>
                   <p className="mt-4 text-sm text-muted-foreground">11 Mar 2020</p>
                  <p className="font-mono mt-1">987 654 321</p>
              </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Payment History</CardTitle>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon"><Search className="h-5 w-5"/></Button>
                        <Button variant="ghost" size="icon"><Filter className="h-5 w-5"/></Button>
                    </div>
                </div>
            </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {recentClients.map((client) => (
                  <TableRow key={client.email}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={client.avatar} alt={client.name} />
                            <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-sm text-muted-foreground">{client.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <p className={`font-medium ${client.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                        {client.status === 'Active' ? `+ $200.00` : `- $19.99`}
                      </p>
                      <p className="text-sm text-muted-foreground">07 Mar 2020, 2:34 PM</p>
                    </TableCell>
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

function LayoutTemplateIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2Z" />
      <path d="M12 12a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2Z" />
    </svg>
  )
}


function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  )
}


function QrCodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h.01" />
      <path d="M21 12h.01" />
      <path d="M12 21h.01" />
    </svg>
  )
}
