"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Counter_1 = __importDefault(require("./Counter"));
const userSchema = new mongoose_1.default.Schema({
    id: { type: Number, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
userSchema.pre('save', async function () {
    if (this.id)
        return;
    const counter = await Counter_1.default.findOneAndUpdate({ name: 'user' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
    this.id = counter.seq;
});
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map