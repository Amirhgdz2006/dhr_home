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
const appService = __importStar(require("../services/appService"));
const getData = async (req, res, next) => {
    try {
        const data = await appService.getData();
        res.json({
            data,
            meta: {
                pagination: {
                    page: 1,
                    pageSize: data.length,
                    pageCount: 1,
                    total: data.length
                }
            }
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getData = getData;
const createApp = async (req, res, next) => {
    try {
        const app = await appService.createApp(req.body);
        res.status(201).json({ data: app });
    }
    catch (err) {
        next(err);
    }
};
exports.createApp = createApp;
const updateApp = async (req, res, next) => {
    try {
        const updatedApp = await appService.updateApp(parseInt(req.params.id), req.body);
        if (!updatedApp) {
            res.status(404).json({ error: 'App not found' });
            return;
        }
        res.json({ data: updatedApp });
    }
    catch (err) {
        next(err);
    }
};
exports.updateApp = updateApp;
const deleteApp = async (req, res, next) => {
    try {
        const deletedApp = await appService.deleteApp(parseInt(req.params.id));
        if (!deletedApp) {
            res.status(404).json({ error: 'App not found' });
            return;
        }
        res.json({ message: 'App deleted successfully', data: deletedApp });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteApp = deleteApp;
//# sourceMappingURL=appController.js.map