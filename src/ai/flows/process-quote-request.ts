
// This file is machine-generated - changes may be lost.
'use server';
/**
 * @fileOverview A flow to process quote requests from the landing page and send them to an internal CRM.
 *
 * - processQuoteRequest - A function that handles the quote request submission.
 * - QuoteRequestInput - The input type for the processQuoteRequest function.
 * - QuoteRequestOutput - The return type for the processQuoteRequest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { addLead } from '@/lib/crm-data';

const QuoteRequestInputSchema = z.object({
  name: z.string().describe('The full name of the person requesting the service.'),
  email: z.string().email().describe('The email address of the person.'),
  phone: z.string().describe('The phone number of the person.'),
  interest: z.string().describe('The initial message or interest of the person.'),
  companyName: z.string().optional().describe('The name of the company.'),
  nit: z.string().optional().describe('The tax identification number (NIT).'),
  address: z.string().optional().describe('The physical address of the company.'),
  logoDataUri: z.string().optional().describe("The company's logo as a data URI."),
  clientType: z.string().optional().describe('The type of client (e.g., "constructora", "integrador").'),
  ownershipType: z.string().optional().describe('The ownership type for the equipment (e.g., "renta", "propiedad").'),
  calculator: z
    .object({
      numCameras: z.number(),
      recordingDays: z.number(),
      needsBackup: z.boolean(),
      needsPhysicalBackup: z.boolean(),
      needsQr: z.boolean(),
      needsMicrosite: z.boolean(),
      needsProjectHistory: z.boolean(),
      totalCost: z.number(),
    })
    .optional()
    .describe('The details from the cost calculator, if used.'),
});

export type QuoteRequestInput = z.infer<typeof QuoteRequestInputSchema>;

const QuoteRequestOutputSchema = z.object({
  success: z.boolean().describe('Whether the submission was successful.'),
  message: z.string().describe('A confirmation or error message.'),
});

export type QuoteRequestOutput = z.infer<typeof QuoteRequestOutputSchema>;

export async function processQuoteRequest(
  input: QuoteRequestInput
): Promise<QuoteRequestOutput> {
  return processQuoteRequestFlow(input);
}

const processQuoteRequestFlow = ai.defineFlow(
  {
    name: 'processQuoteRequestFlow',
    inputSchema: QuoteRequestInputSchema,
    outputSchema: QuoteRequestOutputSchema,
  },
  async (leadData) => {
    // In a real-world scenario, you would have more robust error handling
    // and potentially call external APIs. For now, we'll use our simulated data service.
    
    try {
      await addLead(leadData);
      console.log('Successfully added lead for:', leadData.email);
      
      return {
        success: true,
        message: 'Solicitud de cotización recibida con éxito. Nos pondremos en contacto con usted en breve.',
      };
    } catch (error) {
      console.error('Failed to add lead:', error);
      return {
        success: false,
        message: 'Hubo un error al procesar su solicitud. Por favor, inténtelo de nuevo.',
      }
    }
  }
);
