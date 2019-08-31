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
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const ClientPasswordStrategy = require("passport-oauth2-client-password");
const keys_1 = require("../../keys");
let ClientPasswordStrategyFactoryProvider = class ClientPasswordStrategyFactoryProvider {
    constructor(verifier) {
        this.verifier = verifier;
    }
    value() {
        return options => this.getClientPasswordVerifier(options);
    }
    getClientPasswordVerifier(options) {
        if (options && options.passReqToCallback) {
            return new ClientPasswordStrategy.Strategy(options, async (req, clientId, clientSecret, cb) => {
                try {
                    const client = await this.verifier(clientId, clientSecret, req);
                    if (!client) {
                        throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* ClientInvalid */);
                    }
                    else if (!client.clientSecret ||
                        client.clientSecret !== clientSecret) {
                        throw new rest_1.HttpErrors.Unauthorized("Client Verification Failed" /* ClientVerificationFailed */);
                    }
                    cb(null, client);
                }
                catch (err) {
                    cb(err);
                }
            });
        }
        else {
            return new ClientPasswordStrategy.Strategy(async (clientId, clientSecret, cb) => {
                try {
                    const client = await this.verifier(clientId, clientSecret);
                    if (!client) {
                        throw new rest_1.HttpErrors.Unauthorized("Client Invalid" /* ClientInvalid */);
                    }
                    else if (!client.clientSecret ||
                        client.clientSecret !== clientSecret) {
                        throw new rest_1.HttpErrors.Unauthorized("Client Verification Failed" /* ClientVerificationFailed */);
                    }
                    cb(null, client);
                }
                catch (err) {
                    cb(err);
                }
            });
        }
    }
};
ClientPasswordStrategyFactoryProvider = __decorate([
    __param(0, core_1.inject(keys_1.Strategies.Passport.OAUTH2_CLIENT_PASSWORD_VERIFIER)),
    __metadata("design:paramtypes", [Function])
], ClientPasswordStrategyFactoryProvider);
exports.ClientPasswordStrategyFactoryProvider = ClientPasswordStrategyFactoryProvider;
//# sourceMappingURL=client-password-strategy-factory-provider.js.map