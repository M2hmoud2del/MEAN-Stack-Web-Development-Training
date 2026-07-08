import type { IUser } from './IUser';

export interface IClient extends IUser {
    budget: number;
}