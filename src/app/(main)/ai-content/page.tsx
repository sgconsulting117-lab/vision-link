'use client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { improveLandingPageContent } from '@/ai/flows/improve-landing-page-content';

export default function AIContentPage() {
    const [content, setContent] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [improvedContent, setImprovedContent] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        setImprovedContent('');
        setSuggestions([]);
        try {
            const result = await improveLandingPageContent({ content, targetAudience, businessType });
            setImprovedContent(result.improvedContent);
            setSuggestions(result.suggestions);
        } catch (error) {
            console.error("Failed to get content improvements:", error);
            // Here you might want to show an error to the user
        }
        setIsLoading(false);
    };

  return (
    <div className="grid md:grid-cols-2 gap-8">
        <div>
            <h1 className="text-3xl font-bold">AI Content Tool</h1>
            <p className="text-muted-foreground mb-6">Get AI-powered suggestions to improve your landing page content.</p>

            <div className="space-y-4">
                <div>
                    <Label htmlFor="business-type">Type of Business</Label>
                    <Input id="business-type" placeholder="e.g., SaaS, E-commerce, Local Service" value={businessType} onChange={(e) => setBusinessType(e.target.value)} />
                </div>
                 <div>
                    <Label htmlFor="target-audience">Target Audience</Label>
                    <Input id="target-audience" placeholder="e.g., Small business owners, Young professionals" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="content">Landing Page Content</Label>
                    <Textarea 
                        id="content" 
                        placeholder="Paste your landing page headline, body text, and calls to action here..."
                        className="min-h-[200px]"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <Button onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? 'Analyzing...' : 'Get Suggestions'}
                </Button>
            </div>
        </div>
        <div>
            <Card className="min-h-full">
                <CardHeader>
                    <CardTitle>Suggestions</CardTitle>
                    <CardDescription>AI-generated improvements will appear here.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading && <p>Analyzing content, please wait...</p>}
                    {improvedContent && (
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Improved Content</h3>
                                <div className="p-4 bg-muted rounded-md whitespace-pre-wrap">{improvedContent}</div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Suggestions</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    {suggestions.map((suggestion, index) => (
                                        <li key={index}>{suggestion}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
