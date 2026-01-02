"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Counter_1 = __importDefault(require("./Counter"));
const appSchema = new mongoose_1.default.Schema({
    id: { type: Number },
    name: { type: String, required: true },
    englishName: { type: String },
    description: { type: String },
    url: { type: String },
    keywords: [String],
    icon_background_color: { type: String, default: null },
    icon: {
        url: String,
    },
    category: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    publishedAt: { type: Date, default: Date.now }
});
appSchema.pre('save', async function () {
    if (this.id)
        return;
    const counter = await Counter_1.default.findOneAndUpdate({ name: 'app' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
    this.id = counter.seq;
});
exports.default = mongoose_1.default.model('App', appSchema);
//# sourceMappingURL=App.js.map