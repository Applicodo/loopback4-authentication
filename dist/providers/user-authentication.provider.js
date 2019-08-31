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
const rest_1 = require("@loopback/rest");
const keys_1 = require("../keys");
const strategy_adapter_1 = require("../strategy-adapter");
let AuthenticateActionProvider = class AuthenticateActionProvider {
    constructor(getStrategy, getMetadata, setCurrentUser) {
        this.getStrategy = getStrategy;
        this.getMetadata = getMetadata;
        this.setCurrentUser = setCurrentUser;
    }
    value() {
        return (request, response) => this.action(request, response);
    }
    async action(request, response) {
        const strategy = await this.getStrategy();
        if (!strategy) {
            this.setCurrentUser(undefined);
            return undefined;
        }
        if (!strategy.authenticate) {
            throw new rest_1.HttpErrors.Unauthorized("Unknown Error" /* UnknownError */);
        }
        // Read decorator metadata to fetch options
        // to be passed on to authenticate method of strategy
        const metadata = await this.getMetadata();
        let authOpts;
        if (metadata && metadata.authOptions) {
            // Fetch options using creator function added with decorator definition
            authOpts = metadata.authOptions(request);
        }
        const strategyAdapter = new strategy_adapter_1.StrategyAdapter(strategy);
        const user = await strategyAdapter.authenticate(request, response, authOpts);
        this.setCurrentUser(user);
        return user;
    }
};
AuthenticateActionProvider = __decorate([
    __param(0, context_1.inject.getter(keys_1.AuthenticationBindings.USER_STRATEGY)),
    __param(1, context_1.inject.getter(keys_1.AuthenticationBindings.USER_METADATA)),
    __param(2, context_1.inject.setter(keys_1.AuthenticationBindings.CURRENT_USER)),
    __metadata("design:paramtypes", [Function, Function, Function])
], AuthenticateActionProvider);
exports.AuthenticateActionProvider = AuthenticateActionProvider;
//# sourceMappingURL=user-authentication.provider.js.map