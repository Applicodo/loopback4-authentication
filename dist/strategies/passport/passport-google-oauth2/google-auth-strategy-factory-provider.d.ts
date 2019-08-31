import { Provider } from '@loopback/core';
import * as GoogleStrategy from 'passport-google-oauth20';
import { VerifyFunction } from '../../types';
export interface GoogleAuthStrategyFactory {
    (options: GoogleStrategy.StrategyOptions | GoogleStrategy.StrategyOptionsWithRequest): GoogleStrategy.Strategy;
}
export declare class GoogleAuthStrategyFactoryProvider implements Provider<GoogleAuthStrategyFactory> {
    private readonly verifierGoogleAuth;
    constructor(verifierGoogleAuth: VerifyFunction.GoogleAuthFn);
    value(): GoogleAuthStrategyFactory;
    getGoogleAuthStrategyVerifier(options: GoogleStrategy.StrategyOptions | GoogleStrategy.StrategyOptionsWithRequest): GoogleStrategy.Strategy;
}
