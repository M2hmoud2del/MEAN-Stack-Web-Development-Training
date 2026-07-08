import { JobStatus } from '../enums/JobStatus';
import type { Skill } from '../types/Skill';

export interface IProject {
    id: string;
    title: string;
    description: string;
    skillsRequired: Skill[];
    budget: number;
    status: JobStatus;
    clientId: string;
    assignedFreelancerId?: string;
}