"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("@loopback/context");
const keys_1 = require("../keys");
const keys_2 = require("./keys");
let AuthStrategyProvider = class AuthStrategyProvider {
    constructor(metadata, getLocalStrategyVerifier, getBearerStrategyVerifier, getResourceOwnerVerifier, getGoogleAuthVerifier) {
        this.metadata = metadata;
        this.getLocalStrategyVerifier = getLocalStrategyVerifier;
        this.getBearerStrategyVerifier = getBearerStrategyVerifier;
        this.getResourceOwnerVerifier = getResourceOwnerVerifier;
        this.getGoogleAuthVerifier = getGoogleAuthVerifier;
    }
    value() {
        if (!this.metadata) {
            return undefined;
        }
        const name = this.metadata.strategy;
        if (name === "local" /* LOCAL */) {
            return this.getLocalStrategyVerifier(this.metadata.options);
        }
        else if (name === "bearer" /* BEARER */) {
            return this.getBearerStrategyVerifier(this.metadata
                .options);
        }
        else if (name === "OAuth2 resource owner grant" /* OAUTH2_RESOURCE_OWNER_GRANT */) {
            return this.getResourceOwnerVerifier(this.metadata
                .options);
        }
        else if (name === "Google Oauth 2.0" /* GOOGLE_OAUTH2 */) {
            return this.getGoogleAuthVerifier(this.metadata.options);
        }
        else {
            return Promise.reject(`The strategy ${name} is not available.`);
        }
    }
};
AuthStrategyProvider = __decorate([
    __param(0, context_1.inject(keys_1.AuthenticationBindings.USER_METADATA)),
    __param(1, context_1.inject(keys_2.Strategies.Passport.LOCAL_STRATEGY_FACTORY)),
    __param(2, context_1.inject(keys_2.Strategies.Passport.BEARER_STRATEGY_FACTORY)),
    __param(3, context_1.inject(keys_2.Strategies.Passport.RESOURCE_OWNER_STRATEGY_FACTORY)),
    __param(4, context_1.inject(keys_2.Strategies.Passport.GOOGLE_OAUTH2_STRATEGY_FACTORY)),
    __metadata("design:paramtypes", [Object, Function, Function, Function, Function])
], AuthStrategyProvider);
exports.AuthStrategyProvider = AuthStrategyProvider;
//# sourceMappingURL=user-auth-strategy.provider.js.map