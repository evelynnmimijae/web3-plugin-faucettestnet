"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatePlugin = void 0;
var web3_1 = require("web3");
var FaucetPlugin_1 = require("./FaucetPlugin");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
// Initialize the Faucet Plugin
var faucetPlugin = new FaucetPlugin_1.FaucetPlugin();
// Example usage
faucetPlugin.init();
var TemplatePlugin = /** @class */ (function (_super) {
    __extends(TemplatePlugin, _super);
    function TemplatePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pluginNamespace = "template";
        return _this;
    }
    TemplatePlugin.prototype.test = function (param) {
        console.log(param);
    };
    return TemplatePlugin;
}(web3_1.Web3PluginBase));
exports.TemplatePlugin = TemplatePlugin;
