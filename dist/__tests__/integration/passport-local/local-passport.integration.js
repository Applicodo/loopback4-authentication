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
const local_password_provider_1 = require("../../fixtures/providers/local-password.provider");
const keys_2 = require("../../../keys");
/**
 * Testing overall flow of authentication with bearer strategy
 */
describe('Local passport strategy', () => {
    let app;
    let server;
    beforeEach(givenAServer);
    beforeEach(givenAuthenticatedSequence);
    beforeEach(getAuthVerifier);
    it('should return 422 bad request when no user data is passed', async () => {
        class TestController {
            test(body) {
                return 'test successful';
            }
        }
        __decorate([
            openapi_v3_1.post('/auth/local/no-user-data-passed'),
            decorators_1.authenticate("local" /* LOCAL */),
            __param(0, openapi_v3_1.requestBody()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], TestController.prototype, "test", null);
        app.controller(TestController);
        await whenIMakeRequestTo(server)
            .post('/auth/local/no-user-data-passed')
            .expect(422);
    });
    it('should return status 200 for no options', async () => {
        let TestController = class TestController {
            constructor(user) {
                this.user = user;
            }
            test(body) {
                return this.user;
            }
        };
        __decorate([
            openapi_v3_1.post('/auth/local/no-options'),
            decorators_1.authenticate("local" /* LOCAL */),
            __param(0, openapi_v3_1.requestBody()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], TestController.prototype, "test", null);
        TestController = __decorate([
            __param(0, core_1.inject(keys_2.AuthenticationBindings.CURRENT_USER)),
            __metadata("design:paramtypes", [Object])
        ], TestController);
        app.controller(TestController);
        const user = await whenIMakeRequestTo(server)
            .post('/auth/local/no-options')
            .send({ username: 'user name', password: 'password' })
            .expect(200);
        testlab_1.expect(user.body).to.have.property('username');
        testlab_1.expect(user.body.username).to.equal('user name');
        testlab_1.expect(user.body).to.have.property('password');
        testlab_1.expect(user.body.password).to.equal('password');
    });
    it('should return the user credentials are sent via body and options are passed with passRequestCallback true', async () => {
        let TestController = class TestController {
            constructor(user) {
                this.user = user;
            }
            async test(body) {
                return this.user;
            }
        };
        __decorate([
            openapi_v3_1.post('/auth/local/pass-req-callback-true'),
            decorators_1.authenticate("local" /* LOCAL */, { passReqToCallback: true }),
            __param(0, openapi_v3_1.requestBody()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", Promise)
        ], TestController.prototype, "test", null);
        TestController = __decorate([
            __param(0, core_1.inject(keys_2.AuthenticationBindings.CURRENT_USER)),
            __metadata("design:paramtypes", [Object])
        ], TestController);
        app.controller(TestController);
        const user = await whenIMakeRequestTo(server)
            .post('/auth/local/pass-req-callback-true')
            .send({ username: 'name', password: 'password' })
            .expect(200);
        testlab_1.expect(user.body).to.have.property('username');
        testlab_1.expect(user.body.username).to.equal('name');
        testlab_1.expect(user.body).to.have.property('password');
        testlab_1.expect(user.body.password).to.equal('password');
    });
    it('should return the user which was passed via body and options are passed with passRequestCallback false', async () => {
        let TestController = class TestController {
            constructor(user) {
                this.user = user;
            }
            async test(body) {
                return this.user;
            }
        };
        __decorate([
            openapi_v3_1.post('/auth/local/pass-req-callback-false'),
            decorators_1.authenticate("local" /* LOCAL */, { passReqToCallback: false }),
            __param(0, openapi_v3_1.requestBody()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", Promise)
        ], TestController.prototype, "test", null);
        TestController = __decorate([
            __param(0, core_1.inject(keys_2.AuthenticationBindings.CURRENT_USER)),
            __metadata("design:paramtypes", [Object])
        ], TestController);
        app.controller(TestController);
        await whenIMakeRequestTo(server)
            .post('/auth/local/pass-req-callback-false')
            .send({ username: 'username', password: 'password' })
            .expect(200);
    });
    it('should return 401 when provider returns null', async () => {
        let TestController = class TestController {
            constructor(user) {
                this.user = user;
            }
            async test(body) {
                return body;
            }
        };
        __decorate([
            openapi_v3_1.post('/auth/local/null-user'),
            decorators_1.authenticate("local" /* LOCAL */),
            __param(0, openapi_v3_1.requestBody()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", Promise)
        ], TestController.prototype, "test", null);
        TestController = __decorate([
            __param(0, core_1.inject(keys_2.AuthenticationBindings.CURRENT_USER)),
            __metadata("design:paramtypes", [Object])
        ], TestController);
        app.controller(TestController);
        await whenIMakeRequestTo(server)
            .post('/auth/local/null-user')
            .send({ username: '', password: 'password' })
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
            .bind(keys_1.Strategies.Passport.LOCAL_PASSWORD_VERIFIER)
            .toProvider(local_password_provider_1.LocalVerifyProvider);
    }
    function givenAuthenticatedSequence() {
        // bind user defined sequence
        server.sequence(authentication_sequence_1.MyAuthenticationSequence);
    }
});
describe('Local strategy with no verifier', () => {
    let app;
    let server;
    beforeEach(givenAServer);
    beforeEach(givenAuthenticatedSequence);
    it('should return 401 when option passRequestCallback is false', async () => {
        class TestController {
            constructor() {
                this.options = {
                    passRequestToCallback: false,
                };
            }
            async test(body) {
                return body;
            }
        }
        __decorate([
            openapi_v3_1.post('/auth/local/no-verifier'),
            decorators_1.authenticate("local" /* LOCAL */, { passReqToCallback: false }),
            __param(0, openapi_v3_1.requestBody()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", Promise)
        ], TestController.prototype, "test", null);
        app.controller(TestController);
        await whenIMakeRequestTo(server)
            .post('/auth/local/no-verifier')
            .send({ username: 'username', password: 'password' })
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
//# sourceMappingURL=local-passport.integration.js.map