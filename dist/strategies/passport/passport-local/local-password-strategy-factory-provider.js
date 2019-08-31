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
const PassportLocal = require("passport-local");
const keys_1 = require("../../keys");
const lodash_1 = require("lodash");
let LocalPasswordStrategyFactoryProvider = class LocalPasswordStrategyFactoryProvider {
    constructor(verifierLocal) {
        this.verifierLocal = verifierLocal;
    }
    value() {
        return options => this.getLocalStrategyVerifier(options);
    }
    getLocalStrategyVerifier(options) {
        if (options && options.passReqToCallback) {
            return new PassportLocal.Strategy(options, async (req, username, password, cb) => {
                try {
                    const user = await this.verifierLocal(username, password, req);
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
        else if (!!options && !lodash_1.isEmpty(options)) {
            return new PassportLocal.Strategy(options, async (username, password, cb) => {
                try {
                    const user = await this.verifierLocal(username, password);
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
        else {
            return new PassportLocal.Strategy(async (username, password, cb) => {
                try {
                    const user = await this.verifierLocal(username, password, undefined);
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
LocalPasswordStrategyFactoryProvider = __decorate([
    __param(0, core_1.inject(keys_1.Strategies.Passport.LOCAL_PASSWORD_VERIFIER)),
    __metadata("design:paramtypes", [Function])
], LocalPasswordStrategyFactoryProvider);
exports.LocalPasswordStrategyFactoryProvider = LocalPasswordStrategyFactoryProvider;
//# sourceMappingURL=local-password-strategy-factory-provider.js.map