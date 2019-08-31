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
const passport_client_provider_1 = require("../../fixtures/providers/passport-client.provider");
describe('Client-password strategy', () => {
    let app;
    let server;
    beforeEach(givenAServer);
    beforeEach(givenAuthenticatedSequence);
    beforeEach(getAuthVerifier);
    it('should return status 200 when options.passRequestToCallback is set true', async () => {
        let TestController = class TestController {
            constructor(client) {
                this.client = client;
            }
            test(body) {
                return this.client;
            }
        };
        __decorate([
            decorators_1.authenticateClient("client-password" /* CLIENT_PASSWORD */, { passReqToCallback: true }),
            openapi_v3_1.post('/test'),
            __param(0, openapi_v3_1.requestBody()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], TestController.prototype, "test", null);
        TestController = __decorate([
            __param(0, core_1.inject(keys_2.AuthenticationBindings.CURRENT_CLIENT)),
            __metadata("design:paramtypes", [Object])
        ], TestController);
        app.controller(TestController);
        const client = await whenIMakeRequestTo(server)
            .post('/test')
            .send({ client_id: 'some id', client_secret: 'some secret' }) // eslint-disable-line
            .expect(200);
        testlab_1.expect(client.body).to.have.property('clientId');
        testlab_1.expect(client.body).to.have.property('clientSecret');
        testlab_1.expect(client.body.clientId).to.equal('some id');
        testlab_1.expect(client.body.clientSecret).to.equal('some secret');
    });
    it('should return status 200 when options.passRequestToCallback is set false', async () => {
        let TestController = class TestController {
            constructor(client) {
                this.client = client;
            }
            test(body) {
                return this.client;
            }
        };
        __decorate([
            openapi_v3_1.post('/test'),
            decorators_1.authenticateClient("client-password" /* CLIENT_PASSWORD */, { passReqToCallback: false }),
            __param(0, openapi_v3_1.requestBody()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], TestController.prototype, "test", null);
        TestController = __decorate([
            __param(0, core_1.inject(keys_2.AuthenticationBindings.CURRENT_CLIENT)),
            __metadata("design:paramtypes", [Object])
        ], TestController);
        app.controller(TestController);
        const client = await whenIMakeRequestTo(server)
            .post('/test')
            .send({ client_id: 'some id', client_secret: 'some secret' }) // eslint-disable-line
            .expect(200);
        testlab_1.expect(client.body).to.have.property('clientId');
        testlab_1.expect(client.body).to.have.property('clientSecret');
        testlab_1.expect(client.body.clientId).to.equal('some id');
        testlab_1.expect(client.body.clientSecret).to.equal('some secret');
    });
    it('should return status 401 when options.passRequestToCallback is set true', async () => {
        let TestController = class TestController {
            constructor(client) {
                this.client = client;
            }
            async test(body) {
                return this.client;
            }
        };
        __decorate([
            openapi_v3_1.post('/test'),
            decorators_1.authenticateClient("client-password" /* CLIENT_PASSWORD */, { passReqToCallback: true }),
            __param(0, openapi_v3_1.requestBody()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", Promise)
        ], TestController.prototype, "test", null);
        TestController = __decorate([
            __param(0, core_1.inject(keys_2.AuthenticationBindings.CURRENT_CLIENT)),
            __metadata("design:paramtypes", [Object])
        ], TestController);
        app.controller(TestController);
        await whenIMakeRequestTo(server)
            .post('/test')
            .send({ client_id: '', client_secret: 'some secret' }) // eslint-disable-line
            .expect(401);
    });
    it('should return status 401 when options.passRequestToCallback is set false', async () => {
        let TestController = class TestController {
            constructor(client) {
                this.client = client;
            }
            async test(body) {
                return this.client;
            }
        };
        __decorate([
            openapi_v3_1.post('/test'),
            decorators_1.authenticateClient("client-password" /* CLIENT_PASSWORD */, { passReqToCallback: false }),
            __param(0, openapi_v3_1.requestBody()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", Promise)
        ], TestController.prototype, "test", null);
        TestController = __decorate([
            __param(0, core_1.inject(keys_2.AuthenticationBindings.CURRENT_CLIENT)),
            __metadata("design:paramtypes", [Object])
        ], TestController);
        app.controller(TestController);
        await whenIMakeRequestTo(server)
            .post('/test')
            .send({ client_id: '', client_secret: 'some secret' }) // eslint-disable-line
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
            .bind(keys_1.Strategies.Passport.OAUTH2_CLIENT_PASSWORD_VERIFIER)
            .toProvider(passport_client_provider_1.ClientPasswordVerifyProvider);
    }
    function givenAuthenticatedSequence() {
        // bind user defined sequence
        server.sequence(authentication_sequence_1.MyAuthenticationSequence);
    }
});
describe('integration test for client-password and no verifier', () => {
    let app;
    let server;
    beforeEach(givenAServer);
    beforeEach(givenAuthenticatedSequence);
    it('should return status 401 as this strategy is not implemented', async () => {
        let TestController = class TestController {
            constructor(client) {
                this.client = client;
            }
            test(body) {
                return this.client;
            }
        };
        __decorate([
            openapi_v3_1.post('/test'),
            decorators_1.authenticateClient("client-password" /* CLIENT_PASSWORD */, { passReqToCallback: true }),
            __param(0, openapi_v3_1.requestBody()),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], TestController.prototype, "test", null);
        TestController = __decorate([
            __param(0, core_1.inject(keys_2.AuthenticationBindings.CURRENT_CLIENT)),
            __metadata("design:paramtypes", [Object])
        ], TestController);
        app.controller(TestController);
        await whenIMakeRequestTo(server)
            .post('/test')
            .send({ client_id: 'some id', client_secret: 'some secret' }) // eslint-disable-line
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
//# sourceMappingURL=client-password-verify.integration.js.map