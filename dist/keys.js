"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("@loopback/context");
const metadata_1 = require("@loopback/metadata");
__export(require("./strategies/keys"));
/**
 * Binding keys used by this component.
 */
var AuthenticationBindings;
(function (AuthenticationBindings) {
    AuthenticationBindings.USER_STRATEGY = context_1.BindingKey.create('sf.userAuthentication.strategy');
    AuthenticationBindings.CLIENT_STRATEGY = context_1.BindingKey.create('sf.clientAuthentication.strategy');
    AuthenticationBindings.USER_AUTH_ACTION = context_1.BindingKey.create('sf.userAuthentication.actions.authenticate');
    AuthenticationBindings.CLIENT_AUTH_ACTION = context_1.BindingKey.create('sf.clientAuthentication.actions.authenticate');
    AuthenticationBindings.USER_METADATA = context_1.BindingKey.create('sf.userAuthentication.operationMetadata');
    AuthenticationBindings.CLIENT_METADATA = context_1.BindingKey.create('sf.clientAuthentication.operationMetadata');
    AuthenticationBindings.CURRENT_USER = context_1.BindingKey.create('sf.userAuthentication.currentUser');
    AuthenticationBindings.CURRENT_CLIENT = context_1.BindingKey.create('sf.clientAuthentication.currentClient');
})(AuthenticationBindings = exports.AuthenticationBindings || (exports.AuthenticationBindings = {}));
exports.USER_AUTHENTICATION_METADATA_KEY = metadata_1.MetadataAccessor.create('userAuthentication.operationsMetadata');
exports.CLIENT_AUTHENTICATION_METADATA_KEY = metadata_1.MetadataAccessor.create('clientAuthentication.operationsMetadata');
//# sourceMappingURL=keys.js.map