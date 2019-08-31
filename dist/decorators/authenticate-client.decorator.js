"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("@loopback/context");
const keys_1 = require("../keys");
function authenticateClient(strategyName, options) {
    return context_1.MethodDecoratorFactory.createDecorator(keys_1.CLIENT_AUTHENTICATION_METADATA_KEY, {
        strategy: strategyName,
        options: options || {},
    });
}
exports.authenticateClient = authenticateClient;
function getClientAuthenticateMetadata(controllerClass, methodName) {
    return context_1.MetadataInspector.getMethodMetadata(keys_1.CLIENT_AUTHENTICATION_METADATA_KEY, controllerClass.prototype, methodName);
}
exports.getClientAuthenticateMetadata = getClientAuthenticateMetadata;
//# sourceMappingURL=authenticate-client.decorator.js.map