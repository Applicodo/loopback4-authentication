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
const testlab_1 = require("@loopback/testlab");
const rest_1 = require("@loopback/rest");
const core_1 = require("@loopback/core");
const openapi_v3_1 = require("@loopback/openapi-v3");
const decorators_1 = require("../../../decorators");
const helpers_1 = require("../helpers/helpers");
const authentication_sequence_1 = require("../../fixtures/sequences/authentication.sequence");
const keys_1 = require("../../../strategies/keys");
const keys_2 = require("../../../keys");
const bearer_passport_provider_1 = require("../../fixtures/providers/bearer-passport.provider");
/**
 * Testing overall flow of authentication with bearer strategy
 */
describe('Bearer-token strategy', () => {
    let app;
    let server;
    beforeEach(givenAServer);
    beforeEach(givenAuthenticatedSequence);
    beforeEach(getAuthVerifier);
    it('should return 401 when token is not passed', async () => {
        class BearerNoTokenController {
            test() {
                return 'test successful';
            }
        }
        __decorate([
            openapi_v3_1.get('/auth/bearer/no-token'),
            decorators_1.authenticate("bearer" /* BEARER */),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], BearerNoTokenController.prototype, "test", null);
        app.controller(BearerNoTokenController);
        await whenIMakeRequestTo(server)
            .get('/auth/bearer/no-token')
            .expect(401);
    });
    it('should return status 200 when token is passed', async () => {
        class BearerTokenController {
            test() {
                return 'test successful';
            }
        }
        __decorate([
            openapi_v3_1.get('/auth/bearer/token'),
            decorators_1.authenticate("bearer" /* BEARER */),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], BearerTokenController.prototype, "test", null);
        app.controller(BearerTokenController);
        await whenIMakeRequestTo(server)
            .get('/auth/bearer/token')
            .set('Authorization', 'Bearer validtoken')
            .expect(200);
    });
    it('should return the user passed via verifier when no options are passed', async () => {
        let BearerNoOptionsController = class BearerNoOptionsController {
            constructor(user) {
                this.user = user;
            }
            async test() {
                return this.user;
            }
        };
        __decorate([
            openapi_v3_1.get('/auth/bearer/no-options'),
            decorators_1.authenticate("bearer" /* BEARER */),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], BearerNoOptionsController.prototype, "test", null);
        BearerNoOptionsController = __decorate([
            __param(0, core_1.inject(keys_2.AuthenticationBindings.CURRENT_USER)),
            __metadata("design:paramtypes", [Object])
        ], BearerNoOptionsController);
        app.controller(BearerNoOptionsController);
        const user = await whenIMakeRequestTo(server)
            .get('/auth/bearer/no-options')
            .set('Authorization', 'Bearer validtoken')
            .expect(200);
        testlab_1.expect(user.body).to.have.property('id');
        testlab_1.expect(user.body.id).to.equal(1);
    });
    it('should return the user passed via verifier and options are passed with passRequestCallback true', async () => {
        let BearerForCallbackController = class BearerForCallbackController {
            constructor(user) {
                this.user = user;
                this.options = {
                    passRequestToCallback: false,
                };
            }
            async test() {
                return this.user;
            }
        };
        __decorate([
            openapi_v3_1.get('/auth/bearer/callback'),
            decorators_1.authenticate("bearer" /* BEARER */, { passReqToCallback: true }),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], BearerForCallbackController.prototype, "test", null);
        BearerForCallbackController = __decorate([
            __param(0, core_1.inject(keys_2.AuthenticationBindings.CURRENT_USER)),
            __metadata("design:paramtypes", [Object])
        ], BearerForCallbackController);
        app.controller(BearerForCallbackController);
        const user = await whenIMakeRequestTo(server)
            .get('/auth/bearer/callback')
            .set('Authorization', 'Bearer validtoken')
            .expect(200);
        testlab_1.expect(user.body).to.have.property('id');
        testlab_1.expect(user.body.id).to.equal(2);
    });
    it('should return the user passed via verifier and options are passed with passRequestCallback false', async () => {
        let BearerNoCallbackController = class BearerNoCallbackController {
            constructor(user) {
                this.user = user;
                this.options = {
                    passRequestToCallback: false,
                };
            }
            async test() {
                return this.user;
            }
        };
        __decorate([
            openapi_v3_1.get('/auth/bearer/no-callback'),
            decorators_1.authenticate("bearer" /* BEARER */, { passReqToCallback: false }),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], BearerNoCallbackController.prototype, "test", null);
        BearerNoCallbackController = __decorate([
            __param(0, core_1.inject(keys_2.AuthenticationBindings.CURRENT_USER)),
            __metadata("design:paramtypes", [Object])
        ], BearerNoCallbackController);
        app.controller(BearerNoCallbackController);
        const user = await whenIMakeRequestTo(server)
            .get('/auth/bearer/no-callback')
            .set('Authorization', 'Bearer validtoken')
            .expect(200);
        testlab_1.expect(user.body).to.have.property('id');
        testlab_1.expect(user.body.id).to.equal(1);
    });
    it('should return status 401 as Bearer is not sent in token', async () => {
        class NoBearerInTokenController {
            test() {
                return 'test successful';
            }
        }
        __decorate([
            openapi_v3_1.get('/auth/bearer/no-bearer-in-token'),
            decorators_1.authenticate("bearer" /* BEARER */),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], NoBearerInTokenController.prototype, "test", null);
        app.controller(NoBearerInTokenController);
        await whenIMakeRequestTo(server)
            .get('/auth/bearer/no-bearer-in-token')
            .set('Authorization', 'sometoken')
            .expect(401);
    });
    it('should return error as no user was returned from provider', async () => {
        let BearerNoUserController = class BearerNoUserController {
            constructor(user) {
                this.user = user;
            }
            async test() {
                return this.user;
            }
        };
        __decorate([
            openapi_v3_1.get('/auth/bearer/no-user'),
            decorators_1.authenticate("bearer" /* BEARER */),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], BearerNoUserController.prototype, "test", null);
        BearerNoUserController = __decorate([
            __param(0, core_1.inject(keys_2.AuthenticationBindings.CURRENT_USER)),
            __metadata("design:paramtypes", [Object])
        ], BearerNoUserController);
        app.controller(BearerNoUserController);
        await whenIMakeRequestTo(server)
            .get('/auth/bearer/no-user')
            .set('Authorization', 'Bearer sometoken')
            .expect(401);
    });
    it('should return error when passRequestCallback is true and provider is not returning user', async () => {
        let BearerNoUserFromCallbackController = class BearerNoUserFromCallbackController {
            constructor(user) {
                this.user = user;
                this.options = {
                    passRequestToCallback: false,
                };
            }
            async test() {
                return this.user;
            }
        };
        __decorate([
            openapi_v3_1.get('/auth/bearer/no-user-with-callback'),
            decorators_1.authenticate("bearer" /* BEARER */, { passReqToCallback: true }),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], BearerNoUserFromCallbackController.prototype, "test", null);
        BearerNoUserFromCallbackController = __decorate([
            __param(0, core_1.inject(keys_2.AuthenticationBindings.CURRENT_USER)),
            __metadata("design:paramtypes", [Object])
        ], BearerNoUserFromCallbackController);
        app.controller(BearerNoUserFromCallbackController);
        await whenIMakeRequestTo(server)
            .get('/auth/bearer/no-user-with-callback')
            .set('Authorization', 'Bearer sometoken')
            .expect(401);
    });
    it('should return error when options are passed with passRequestCallback false and provider does not return user', async () => {
        let BearerCallbackFalseController = class BearerCallbackFalseController {
            constructor(user) {
                this.user = user;
                this.options = {
                    passRequestToCallback: false,
                };
            }
            async test() {
                return this.user;
            }
        };
        __decorate([
            openapi_v3_1.get('/auth/bearer/no-user-when-callback-false'),
            decorators_1.authenticate("bearer" /* BEARER */, { passReqToCallback: false }),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], BearerCallbackFalseController.prototype, "test", null);
        BearerCallbackFalseController = __decorate([
            __param(0, core_1.inject(keys_2.AuthenticationBindings.CURRENT_USER)),
            __metadata("design:paramtypes", [Object])
        ], BearerCallbackFalseController);
        app.controller(BearerCallbackFalseController);
        await whenIMakeRequestTo(server)
            .get('/auth/bearer/no-user-when-callback-false')
            .set('Authorization', 'Bearer sometoken')
            .expect(401);
    });
    function whenIMakeRequestTo(restServer) {
        return testlab_1.createClientForHandler(restServer.requestHandler);
    }
    async function givenAServer() {
        app = helpers_1.getApp();
        server = await app.getServer(rest_1.RestServer);
    }
    function getAuthVerifier() {
        app
            .bind(keys_1.Strategies.Passport.BEARER_TOKEN_VERIFIER)
            .toProvider(bearer_passport_provider_1.BearerTokenVerifyProvider);
    }
    function givenAuthenticatedSequence() {
        // bind user defined sequence
        server.sequence(authentication_sequence_1.MyAuthenticationSequence);
    }
});
describe('integration test when no provider was implemented', () => {
    let app;
    let server;
    beforeEach(givenAServer);
    beforeEach(givenAuthenticatedSequence);
    it('should return error as the verifier is not implemented', async () => {
        let BearerNoVerifierController = class BearerNoVerifierController {
            constructor(user) {
                this.user = user;
                this.options = {
                    passRequestToCallback: false,
                };
            }
            async test() {
                return this.user;
            }
        };
        __decorate([
            openapi_v3_1.get('/auth/bearer/no-verifier'),
            decorators_1.authenticate("bearer" /* BEARER */, { passReqToCallback: false }),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], BearerNoVerifierController.prototype, "test", null);
        BearerNoVerifierController = __decorate([
            __param(0, core_1.inject(keys_2.AuthenticationBindings.CURRENT_USER)),
            __metadata("design:paramtypes", [Object])
        ], BearerNoVerifierController);
        app.controller(BearerNoVerifierController);
        await whenIMakeRequestTo(server)
            .get('/auth/bearer/no-verifier')
            .set('Authorization', 'Bearer sometoken')
            .expect(401);
    });
    function whenIMakeRequestTo(restServer) {
        return testlab_1.createClientForHandler(restServer.requestHandler);
    }
    async function givenAServer() {
        app = helpers_1.getApp();
        server = await app.getServer(rest_1.RestServer);
    }
    function givenAuthenticatedSequence() {
        // bind user defined sequence
        server.sequence(authentication_sequence_1.MyAuthenticationSequence);
    }
});
//# sourceMappingURL=bearer-token-verify.integration.js.map