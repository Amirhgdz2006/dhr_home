"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.findByUsername = void 0;
const User_1 = __importDefault(require("../models/User"));
const findByUsername = (username) => {
    return User_1.default.findOne({ username });
};
exports.findByUsername = findByUsername;
const create = (data) => {
    const user = new User_1.default(data);
    return user.save();
};
exports.create = create;
//# sourceMappingURL=userRepository.js.map