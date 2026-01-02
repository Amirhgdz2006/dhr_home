"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteApp = exports.updateApp = exports.createApp = exports.getData = void 0;
const categoryRepository = __importStar(require("../repositories/categoryRepository"));
const appRepository = __importStar(require("../repositories/appRepository"));
const getData = async () => {
    const categories = await categoryRepository.findAllSorted();
    return Promise.all(categories.map(async (cat) => {
        const apps = await appRepository.findByCategoryName(cat.name);
        return {
            id: cat.id,
            documentId: cat._id.toString(),
            name: cat.name,
            order: cat.order,
            createdAt: cat.createdAt,
            updatedAt: cat.updatedAt,
            publishedAt: cat.publishedAt,
            apps: apps.map(app => ({
                id: app.id,
                documentId: app._id.toString(),
                name: app.name,
                englishName: app.englishName,
                description: app.description,
                url: app.url,
                keywords: app.keywords,
                icon_background_color: app.icon_background_color,
                icon: app.icon ? { url: app.icon.url } : null,
                createdAt: app.createdAt,
                updatedAt: app.updatedAt,
                publishedAt: app.publishedAt
            }))
        };
    }));
};
exports.getData = getData;
const createApp = (data) => {
    return appRepository.create(data);
};
exports.createApp = createApp;
const updateApp = (id, data) => {
    return appRepository.updateById(id, { ...data, updatedAt: new Date() });
};
exports.updateApp = updateApp;
const deleteApp = (id) => {
    return appRepository.deleteById(id);
};
exports.deleteApp = deleteApp;
//# sourceMappingURL=appService.js.map