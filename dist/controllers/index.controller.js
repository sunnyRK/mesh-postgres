"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../database");
exports.getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, database_1.client.query('SELECT * from user4')];
            case 1:
                response = _a.sent();
                console.log(response.rows);
                res.status(200).json(response.rows);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json("Internal server error")];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var signature, response1, response2, userinfo, address;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                signature = parseInt(req.params.signature);
                return [4 /*yield*/, database_1.client.query("SELECT * FROM user1 WHERE signature = $1", [signature])];
            case 1:
                response1 = _a.sent();
                return [4 /*yield*/, database_1.client.query("SELECT * FROM address WHERE sig_id = $1", [response1.rows[0].signature])];
            case 2:
                response2 = _a.sent();
                console.log(response1.rows[0].signature);
                userinfo = response1.rows;
                userinfo[0].signature = response2.rows[0];
                address = response2.rows[0];
                return [2 /*return*/, res.json({
                        userinfo: userinfo
                    })];
        }
    });
}); };
exports.createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, signature, address, response1, response2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("111");
                _a = req.body, name = _a.name, signature = _a.signature, address = _a.address;
                return [4 /*yield*/, database_1.client.query('INSERT INTO user1 (name, signature) VALUES ($1, $2)', [name, signature])];
            case 1:
                response1 = _b.sent();
                return [4 /*yield*/, database_1.client.query('INSERT INTO address (sig_id, street) VALUES ($1, $2)', [signature, address.street])];
            case 2:
                response2 = _b.sent();
                // console.log(response1)
                res.json({
                    message: 'User Added successfully',
                    body: {
                        user: { name: name, signature: signature, address: address }
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
exports.updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, uname, email, response;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("1112");
                id = parseInt(req.params.id);
                _a = req.body, uname = _a.uname, email = _a.email;
                console.log(id);
                console.log(uname);
                console.log(email);
                return [4 /*yield*/, database_1.client.query('UPDATE user1 SET uname = $1, email = $2 WHERE id = $3', [uname, email, id])];
            case 1:
                response = _b.sent();
                res.json({
                    message: 'User Upfdated successfully',
                    body: {
                        user: { uname: uname, email: email }
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, database_1.client.query('DELETE FROM user1 where id = $1', [
                        id
                    ])];
            case 1:
                _a.sent();
                res.json("User " + id + " deleted Successfully");
                return [2 /*return*/];
        }
    });
}); };
