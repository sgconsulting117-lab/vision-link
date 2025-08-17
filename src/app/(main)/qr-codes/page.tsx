import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, PlusCircle, Link as LinkIcon } from "lucide-react";
import Image from "next/image";

const codes = [
    {
        name: 'Summer Sale Page',
        url: '/landing-pages/summer-sale',
        qrUrl: 'https://placehold.co/150x150.png',
        dataAiHint: 'qr code'
    },
    {
        name: 'Product Launch Page',
        url: '/landing-pages/product-launch',
        qrUrl: 'https://placehold.co/150x150.png',
        dataAiHint: 'qr code'
    }
]

export default function QRCodesPage() {
  return (
     <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">QR Codes</h1>
          <p className="text-muted-foreground">Generate QR codes for your landing pages.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Generate New QR Code
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {codes.map(code => (
            <Card key={code.name} className="flex flex-col items-center justify-center p-6">
                <div className="mb-4">
                  <Image src={code.qrUrl} alt={`QR Code for ${code.name}`} width={150} height={150} data-ai-hint={code.dataAiHint} />
                </div>
                <CardTitle className="text-lg text-center">{code.name}</CardTitle>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground text-sm">
                    <LinkIcon className="h-4 w-4" />
                    <span>{code.url}</span>
                </div>
                <Button variant="outline" className="mt-4">Download</Button>
            </Card>
        ))}
      </div>
    </div>
  );
}
