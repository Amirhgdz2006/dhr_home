"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Counter_1 = __importDefault(require("./Counter"));
const categorySchema = new mongoose_1.default.Schema({
    id: { type: Number },
    name: { type: String, required: true },
    order: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    publishedAt: { type: Date, default: Date.now }
});
categorySchema.pre('save', async function () {
    if (this.id)
        return;
    const counter = await Counter_1.default.findOneAndUpdate({ name: 'category' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
    this.id = counter.seq;
});
exports.default = mongoose_1.default.model('Category', categorySchema);
//# sourceMappingURL=Category.js.map