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
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const rest_1 = require("@loopback/rest");
const openapi_v3_1 = require("@loopback/openapi-v3");
const decorators_1 = require("../../../decorators");
const helpers_1 = require("../helpers/helpers");
const authentication_sequence_1 = require("../../fixtures/sequences/authentication.sequence");
const keys_1 = require("../../../strategies/keys");
const bearer_data_1 = require("../../fixtures/data/bearer-data");
describe('getting google oauth2 strategy with options', () => {
    let app;
    let server;
    beforeEach(givenAServer);
    beforeEach(givenAuthenticatedSequence);
    beforeEach(getAuthVerifier);
    it('should return 200 when client id is passed and passReqToCallback is set true', async () => {
        class TestController {
            test() {
                return 'test successful';
            }
        }
        __decorate([
            openapi_v3_1.get('/test'),
            decorators_1.authenticate("Google Oauth 2.0" /* GOOGLE_OAUTH2 */, {
                clientID: 'string',
                clientSecret: 'string',
                passReqToCallback: true,
            }),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], TestController.prototype, "test", null);
        app.controller(TestController);
        await whenIMakeRequestTo(server)
            .get('/test')
            .expect(200);
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
            .bind(keys_1.Strategies.Passport.GOOGLE_OAUTH2_VERIFIER)
            .toProvider(GoogleAuthVerifyProvider);
    }
    function givenAuthenticatedSequence() {
        // bind user defined sequence
        server.sequence(authentication_sequence_1.MyAuthenticationSequence);
    }
});
class GoogleAuthVerifyProvider {
    constructor() { }
    value() {
        return async (accessToken, refreshToken, profile, req) => {
            return bearer_data_1.userWithoutReqObj;
        };
    }
}
//# sourceMappingURL=google-oauth2.integration.js.map