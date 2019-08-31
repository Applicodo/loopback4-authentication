import { Provider, ValueOrPromise } from '@loopback/context';
import { Strategy } from 'passport';
import { AuthenticationMetadata } from '../types';
import { BearerStrategyFactory } from './passport/passport-bearer';
import { GoogleAuthStrategyFactory } from './passport/passport-google-oauth2';
import { LocalPasswordStrategyFactory } from './passport/passport-local';
import { ResourceOwnerPasswordStrategyFactory } from './passport/passport-resource-owner-password';
export declare class AuthStrategyProvider implements Provider<Strategy | undefined> {
    private readonly metadata;
    private readonly getLocalStrategyVerifier;
    private readonly getBearerStrategyVerifier;
    private readonly getResourceOwnerVerifier;
    private readonly getGoogleAuthVerifier;
    constructor(metadata: AuthenticationMetadata, getLocalStrategyVerifier: LocalPasswordStrategyFactory, getBearerStrategyVerifier: BearerStrategyFactory, getResourceOwnerVerifier: ResourceOwnerPasswordStrategyFactory, getGoogleAuthVerifier: GoogleAuthStrategyFactory);
    value(): ValueOrPromise<Strategy | undefined>;
}
