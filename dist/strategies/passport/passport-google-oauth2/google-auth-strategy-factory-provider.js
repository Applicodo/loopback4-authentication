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
const GoogleStrategy = require("passport-google-oauth20");
const keys_1 = require("../../keys");
let GoogleAuthStrategyFactoryProvider = class GoogleAuthStrategyFactoryProvider {
    constructor(verifierGoogleAuth) {
        this.verifierGoogleAuth = verifierGoogleAuth;
    }
    value() {
        return options => this.getGoogleAuthStrategyVerifier(options);
    }
    getGoogleAuthStrategyVerifier(options) {
        if (options && options.passReqToCallback === true) {
            return new GoogleStrategy.Strategy(options, async (req, accessToken, refreshToken, profile, cb) => {
                try {
                    const user = await this.verifierGoogleAuth(accessToken, refreshToken, profile, req);
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
            return new GoogleStrategy.Strategy(options, async (accessToken, refreshToken, profile, cb) => {
                try {
                    const user = await this.verifierGoogleAuth(accessToken, refreshToken, profile);
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
GoogleAuthStrategyFactoryProvider = __decorate([
    __param(0, core_1.inject(keys_1.Strategies.Passport.GOOGLE_OAUTH2_VERIFIER)),
    __metadata("design:paramtypes", [Function])
], GoogleAuthStrategyFactoryProvider);
exports.GoogleAuthStrategyFactoryProvider = GoogleAuthStrategyFactoryProvider;
//# sourceMappingURL=google-auth-strategy-factory-provider.js.map