"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BearerTokenVerifyProvider {
    constructor() { }
    value() {
        return async (accessToken, refreshToken, profile) => {
            const userToPass = {
                id: 1,
                username: 'xyz',
                password: 'pass',
            };
            return userToPass;
        };
    }
}
exports.BearerTokenVerifyProvider = BearerTokenVerifyProvider;
//# sourceMappingURL=google-auth.provider.js.map