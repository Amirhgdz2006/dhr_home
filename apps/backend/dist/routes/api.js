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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appController = __importStar(require("../controllers/appController"));
const categoryController = __importStar(require("../controllers/categoryController"));
const auth_1 = __importDefault(require("../middleware/auth"));
const checkOrigin_1 = __importDefault(require("../middleware/checkOrigin"));
const validators_1 = require("../validators");
const router = express_1.default.Router();
// Data endpoint
router.get('/data', checkOrigin_1.default, appController.getData);
// App endpoints
router.post('/app', (0, validators_1.validateBody)(validators_1.schemas.createAppSchema), auth_1.default, appController.createApp);
router.put('/app/:id', (0, validators_1.validateBody)(validators_1.schemas.updateAppSchema), auth_1.default, appController.updateApp);
router.delete('/app/:id', auth_1.default, appController.deleteApp);
// Category endpoints
router.post('/category', (0, validators_1.validateBody)(validators_1.schemas.createCategorySchema), auth_1.default, categoryController.createCategory);
router.put('/category/:id', (0, validators_1.validateBody)(validators_1.schemas.updateCategorySchema), auth_1.default, categoryController.updateCategory);
router.delete('/category/:id', auth_1.default, categoryController.deleteCategory);
exports.default = router;
//# sourceMappingURL=api.js.map