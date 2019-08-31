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
let ClientAuthStrategyProvider = class ClientAuthStrategyProvider {
    constructor(clientMetadata, getClientPasswordVerifier) {
        this.clientMetadata = clientMetadata;
        this.getClientPasswordVerifier = getClientPasswordVerifier;
    }
    value() {
        if (!this.clientMetadata) {
            return undefined;
        }
        const name = this.clientMetadata.strategy;
        if (name === "client-password" /* CLIENT_PASSWORD */) {
            return this.getClientPasswordVerifier(this.clientMetadata
                .options);
        }
        else {
            return Promise.reject(`The strategy ${name} is not available.`);
        }
    }
};
ClientAuthStrategyProvider = __decorate([
    __param(0, context_1.inject(keys_1.AuthenticationBindings.CLIENT_METADATA)),
    __param(1, context_1.inject(keys_2.Strategies.Passport.CLIENT_PASSWORD_STRATEGY_FACTORY)),
    __metadata("design:paramtypes", [Object, Function])
], ClientAuthStrategyProvider);
exports.ClientAuthStrategyProvider = ClientAuthStrategyProvider;
//# sourceMappingURL=client-auth-strategy.provider.js.map