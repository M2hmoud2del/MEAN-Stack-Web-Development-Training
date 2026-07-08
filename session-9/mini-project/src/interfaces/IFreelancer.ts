import  type { IUser } from './IUser';
import type { Skill } from '../types/Skill';

export interface IFreelancer extends IUser {
    skills: Skill[];
    hourlyRate: number;
}