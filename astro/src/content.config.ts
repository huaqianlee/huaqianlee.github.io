import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const skill = z.object({
  name: z.string(),
  url: z.string().optional(),
  frequent: z.boolean().optional(), // marked † — familiar / frequently used
});

const role = z.object({
  title: z.string(),
  paragraphs: z.array(z.string()).default([]),
  items: z.array(z.string()).default([]),
});

const experience = z.object({
  company: z.string(),
  period: z.string(),
  roles: z.array(role),
});

const contact = z.object({
  label: z.string(),
  value: z.string(),
  href: z.string().optional(),
});

const talk = z.object({ title: z.string(), url: z.string() });

const resumeSchema = z.object({
  name: z.string(),
  title: z.string(),
  contact: z.array(contact),
  profile: z.array(z.string()),
  experience: z.array(experience),
  talks: z.array(talk),
  skills: z.array(z.array(skill)),
  education: z.string(),
  honors: z.array(z.string()),
  thanks: z.string(),
});

export type ResumeData = z.infer<typeof resumeSchema>;

const resume = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/resume' }),
  schema: resumeSchema,
});

export const collections = { resume };
