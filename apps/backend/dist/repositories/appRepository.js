"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.create = exports.findByCategoryName = void 0;
const App_1 = __importDefault(require("../models/App"));
const findByCategoryName = (categoryName) => {
    return App_1.default.find({ category: categoryName });
};
exports.findByCategoryName = findByCategoryName;
const create = (data) => {
    const app = new App_1.default(data);
    return app.save();
};
exports.create = create;
const updateById = (id, data) => {
    return App_1.default.findOneAndUpdate({ id }, data, { new: true });
};
exports.updateById = updateById;
const deleteById = (id) => {
    return App_1.default.findOneAndDelete({ id });
};
exports.deleteById = deleteById;
//# sourceMappingURL=appRepository.js.map