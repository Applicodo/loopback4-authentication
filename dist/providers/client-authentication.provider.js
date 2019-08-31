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
const strategy_adapter_1 = require("../strategy-adapter");
const lodash_1 = require("lodash");
let ClientAuthenticateActionProvider = class ClientAuthenticateActionProvider {
    constructor(getStrategy, setCurrentClient) {
        this.getStrategy = getStrategy;
        this.setCurrentClient = setCurrentClient;
    }
    value() {
        return request => this.action(request);
    }
    async action(request) {
        const strategy = await this.getStrategy();
        if (!strategy) {
            this.setCurrentClient(undefined);
            return undefined;
        }
        if (!strategy.authenticate) {
            throw new Error('invalid strategy parameter');
        }
        const strategyAdapter = new strategy_adapter_1.StrategyAdapter(strategy);
        // Added for cases, where data is passed not in body but in query parameter
        if (!request.body || !lodash_1.isObjectLike(request.body) || lodash_1.isEmpty(request.body)) {
            request.body = request.query;
        }
        const client = await strategyAdapter.authenticate(request);
        this.setCurrentClient(client);
        return client;
    }
};
ClientAuthenticateActionProvider = __decorate([
    __param(0, context_1.inject.getter(keys_1.AuthenticationBindings.CLIENT_STRATEGY)),
    __param(1, context_1.inject.setter(keys_1.AuthenticationBindings.CURRENT_CLIENT)),
    __metadata("design:paramtypes", [Function, Function])
], ClientAuthenticateActionProvider);
exports.ClientAuthenticateActionProvider = ClientAuthenticateActionProvider;
//# sourceMappingURL=client-authentication.provider.js.map