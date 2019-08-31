"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("@loopback/context");
const keys_1 = require("../keys");
/**
 * `@authenticate` decorator for adding authentication to controller methods
 *
 * @param strategyName  Name of the Strategy. Use Strategy enum
 * like `Strategy.LOCAL`
 * @param options       Extra options to be passed on
 * while instantiating strategy specific class
 * @param authOptions   Extra options to be passed on to `authenticate` method
 * of the strategy.
 * This is a creator function which should return an object with options.
 * The request object is passed on as parameter to the method.
 * It can be used to setup `state` parameters based on request for google-auth,
 * for example.
 */
function authenticate(strategyName, options, authOptions) {
    return context_1.MethodDecoratorFactory.createDecorator(keys_1.USER_AUTHENTICATION_METADATA_KEY, {
        strategy: strategyName,
        options: options || {},
        authOptions: authOptions,
    });
}
exports.authenticate = authenticate;
function getAuthenticateMetadata(controllerClass, methodName) {
    return context_1.MetadataInspector.getMethodMetadata(keys_1.USER_AUTHENTICATION_METADATA_KEY, controllerClass.prototype, methodName);
}
exports.getAuthenticateMetadata = getAuthenticateMetadata;
//# sourceMappingURL=authenticate-user.decorator.js.map