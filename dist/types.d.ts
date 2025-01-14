/// <reference types="express" />
import { Request, Response } from '@loopback/rest';
export * from './strategies/types';
export interface IAuthClient {
    clientId: string;
    clientSecret: string;
    redirectUrl?: string;
}
export interface IAuthUser {
    id?: number | string;
    username: string;
    password?: string;
}
export interface AuthenticationMetadata {
    strategy: string;
    options?: Object;
    authOptions?: (req: Request) => Object;
}
/**
 * interface definition of a function which accepts a request
 * and returns an authenticated user
 */
export interface AuthenticateFn<T> {
    (request: Request, response?: Response): Promise<T>;
}
export interface ClientAuthCode<T extends IAuthUser> {
    clientId: string;
    userId?: string;
    user?: T;
}
