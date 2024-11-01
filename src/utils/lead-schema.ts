import * as z from 'zod';

export const leadSchema = z.object({
  id: z.string().cuid2(),
  first_name: z.string().trim().min(1, 'at least 1 character'),
  last_name: z.string().trim().min(1, 'at least 1 character'),
  email: z.string().email(),
  country_of_citizenship: z.string().min(1, 'at least 1 character'),
  linked_in: z.string().url(),
  visa_types: z.array(z.enum(['O_1', 'EB_1A', 'EB_2_NIW', 'NOT_SURE'])),
  answer_to_how_can_we_help: z.string().trim().min(1, 'at least 1 character'),
  status: z.enum(['PENDING', 'REACHED_OUT']),
  //
  created_at: z.number().int(),
});

export type LeadSchemaType = z.infer<typeof leadSchema>;

export const leadStatusKeyToLabel: Record<LeadSchemaType['status'], string> = {
  PENDING: 'Pending',
  REACHED_OUT: 'Reached Out',
};
