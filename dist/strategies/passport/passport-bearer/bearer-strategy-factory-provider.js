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
const PassportBearer = require("passport-http-bearer");
const keys_1 = require("../../keys");
const lodash_1 = require("lodash");
let BearerStrategyFactoryProvider = class BearerStrategyFactoryProvider {
    constructor(verifierBearer) {
        this.verifierBearer = verifierBearer;
    }
    value() {
        return options => this.getBearerStrategyVerifier(options);
    }
    getBearerStrategyVerifier(options) {
        if (options && options.passReqToCallback) {
            return new PassportBearer.Strategy(options, async (req, token, cb) => {
                try {
                    const user = await this.verifierBearer(token, req);
                    if (!user) {
                        throw new rest_1.HttpErrors.Unauthorized("Token Invalid" /* TokenInvalid */);
                    }
                    cb(null, user);
                }
                catch (err) {
                    cb(err);
                }
            });
        }
        else if (!!options && !lodash_1.isEmpty(options)) {
            return new PassportBearer.Strategy(options, async (token, cb) => {
                try {
                    const user = await this.verifierBearer(token);
                    if (!user) {
                        throw new rest_1.HttpErrors.Unauthorized("Token Invalid" /* TokenInvalid */);
                    }
                    cb(null, user);
                }
                catch (err) {
                    cb(err);
                }
            });
        }
        else {
            return new PassportBearer.Strategy(async (token, cb) => {
                try {
                    const user = await this.verifierBearer(token);
                    if (!user) {
                        throw new rest_1.HttpErrors.Unauthorized("Invalid Credentials" /* InvalidCredentials */);
                    }
                    cb(null, user);
                }
                catch (err) {
                    cb(err);
                }
            });
        }
    }
};
BearerStrategyFactoryProvider = __decorate([
    __param(0, core_1.inject(keys_1.Strategies.Passport.BEARER_TOKEN_VERIFIER)),
    __metadata("design:paramtypes", [Function])
], BearerStrategyFactoryProvider);
exports.BearerStrategyFactoryProvider = BearerStrategyFactoryProvider;
//# sourceMappingURL=bearer-strategy-factory-provider.js.map