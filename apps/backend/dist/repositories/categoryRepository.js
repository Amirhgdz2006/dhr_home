"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.create = exports.findAllSorted = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const findAllSorted = () => {
    return Category_1.default.find().sort({ order: 1 });
};
exports.findAllSorted = findAllSorted;
const create = (data) => {
    const category = new Category_1.default(data);
    return category.save();
};
exports.create = create;
const updateById = (id, data) => {
    return Category_1.default.findOneAndUpdate({ id }, data, { new: true });
};
exports.updateById = updateById;
const deleteById = (id) => {
    return Category_1.default.findOneAndDelete({ id });
};
exports.deleteById = deleteById;
//# sourceMappingURL=categoryRepository.js.map