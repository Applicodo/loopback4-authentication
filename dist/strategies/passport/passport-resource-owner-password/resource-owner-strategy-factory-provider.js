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
const keys_1 = require("../../keys");
const oauth2_resource_owner_password_grant_1 = require("./oauth2-resource-owner-password-grant");
const lodash_1 = require("lodash");
let ResourceOwnerPasswordStrategyFactoryProvider = class ResourceOwnerPasswordStrategyFactoryProvider {
    constructor(verifierResourceOwner) {
        this.verifierResourceOwner = verifierResourceOwner;
    }
    value() {
        return options => this.getResourceOwnerVerifier(options);
    }
    getResourceOwnerVerifier(options) {
        if (options && options.passReqToCallback) {
            return new oauth2_resource_owner_password_grant_1.Oauth2ResourceOwnerPassword.Strategy(options, async (req, clientId, clientSecret, username, password, cb) => {
                try {
                    const userInfo = await this.verifierResourceOwner(clientId, clientSecret, username, password, req);
                    if (!userInfo || lodash_1.isEmpty(userInfo)) {
                        throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* InvalidCredentials */);
                    }
                    cb(null, userInfo.client, userInfo.user);
                }
                catch (err) {
                    cb(err);
                }
            });
        }
        else {
            return new oauth2_resource_owner_password_grant_1.Oauth2ResourceOwnerPassword.Strategy(async (clientId, clientSecret, username, password, cb) => {
                try {
                    const userInfo = await this.verifierResourceOwner(clientId, clientSecret, username, password);
                    if (!userInfo || lodash_1.isEmpty(userInfo)) {
                        throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* InvalidCredentials */);
                    }
                    cb(null, userInfo.client, userInfo.user);
                }
                catch (err) {
                    cb(err);
                }
            });
        }
    }
};
ResourceOwnerPasswordStrategyFactoryProvider = __decorate([
    __param(0, core_1.inject(keys_1.Strategies.Passport.RESOURCE_OWNER_PASSWORD_VERIFIER)),
    __metadata("design:paramtypes", [Function])
], ResourceOwnerPasswordStrategyFactoryProvider);
exports.ResourceOwnerPasswordStrategyFactoryProvider = ResourceOwnerPasswordStrategyFactoryProvider;
//# sourceMappingURL=resource-owner-strategy-factory-provider.js.map