/// <reference types="express" />
import { Request } from '@loopback/rest';
import * as GoogleStrategy from 'passport-google-oauth20';
import { IAuthClient, IAuthUser } from '../types';
export declare namespace VerifyFunction {
    interface OauthClientPasswordFn {
        (clientId: string, clientSecret: string, req?: Request): Promise<IAuthClient | null>;
    }
    interface LocalPasswordFn {
        (username: string, password: string, req?: Request): Promise<IAuthUser | null>;
    }
    interface BearerFn {
        (token: string, req?: Request): Promise<IAuthUser | null>;
    }
    interface ResourceOwnerPasswordFn {
        (clientId: string, clientSecret: string, username: string, password: string, req?: Request): Promise<{
            client: IAuthClient;
            user: IAuthUser;
        } | null>;
    }
    interface GoogleAuthFn {
        (accessToken: string, refreshToken: string, profile: GoogleStrategy.Profile, req?: Request): Promise<IAuthUser | null>;
    }
}
