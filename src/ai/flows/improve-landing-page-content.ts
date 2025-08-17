// This file is machine-generated - changes may be lost.
'use server';
/**
 * @fileOverview A flow to improve landing page content by suggesting better word choices and layout improvements.
 *
 * - improveLandingPageContent - A function that handles the content improvement process.
 * - ImproveLandingPageContentInput - The input type for the improveLandingPageContent function.
 * - ImproveLandingPageContentOutput - The return type for the improveLandingPageContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveLandingPageContentInputSchema = z.object({
  content: z.string().describe('The current content of the landing page.'),
  targetAudience: z.string().describe('The target audience for the landing page.'),
  businessType: z.string().describe('The type of business the landing page is for.'),
});
export type ImproveLandingPageContentInput = z.infer<
  typeof ImproveLandingPageContentInputSchema
>;

const ImproveLandingPageContentOutputSchema = z.object({
  improvedContent: z.string().describe('The improved content for the landing page.'),
  suggestions: z.array(z.string()).describe('Specific suggestions for improving the content.'),
});
export type ImproveLandingPageContentOutput = z.infer<
  typeof ImproveLandingPageContentOutputSchema
>;

export async function improveLandingPageContent(
  input: ImproveLandingPageContentInput
): Promise<ImproveLandingPageContentOutput> {
  return improveLandingPageContentFlow(input);
}

const improveLandingPageContentPrompt = ai.definePrompt({
  name: 'improveLandingPageContentPrompt',
  input: {schema: ImproveLandingPageContentInputSchema},
  output: {schema: ImproveLandingPageContentOutputSchema},
  prompt: `You are an AI assistant specializing in improving landing page content to boost engagement and sales.

  Analyze the following landing page content and suggest improvements to word choice, layout, and overall effectiveness.

  Consider the target audience, the type of business, and common CRM practices.

  Provide the improved content and a list of specific suggestions.

  Current Content: {{{content}}}
  Target Audience: {{{targetAudience}}}
  Type of Business: {{{businessType}}}

  Improved Content:
  `, // The AI will continue from here, generating the improved content.
});

const improveLandingPageContentFlow = ai.defineFlow(
  {
    name: 'improveLandingPageContentFlow',
    inputSchema: ImproveLandingPageContentInputSchema,
    outputSchema: ImproveLandingPageContentOutputSchema,
  },
  async input => {
    const {output} = await improveLandingPageContentPrompt(input);
    return output!;
  }
);
