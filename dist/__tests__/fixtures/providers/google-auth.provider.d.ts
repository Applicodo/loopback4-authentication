import { Provider } from '@loopback/core';
import { VerifyFunction } from '../../../strategies';
import * as GoogleStrategy from 'passport-google-oauth20';
import { IAuthUser } from '../../../types';
export declare class BearerTokenVerifyProvider implements Provider<VerifyFunction.GoogleAuthFn> {
    constructor();
    value(): (accessToken: string, refreshToken: string, profile: GoogleStrategy.Profile) => Promise<IAuthUser>;
}
