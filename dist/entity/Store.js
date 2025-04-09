"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = exports.TypeStoreStatus = void 0;
const typeorm_1 = require("typeorm");
var TypeStoreStatus;
(function (TypeStoreStatus) {
    TypeStoreStatus["ACTIVE"] = "ACTIVE";
    TypeStoreStatus["IN_ACTIVE"] = "IN_ACTIVE";
    TypeStoreStatus["EXPIRED"] = "EXPIRED";
    TypeStoreStatus["DELETED"] = "DELETED";
    TypeStoreStatus["BLOCKED"] = "BLOCKED";
})(TypeStoreStatus || (exports.TypeStoreStatus = TypeStoreStatus = {}));
let Store = class Store {
};
exports.Store = Store;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Store.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Store.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Store.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Store.prototype, "hotline", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Store.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Store.prototype, "is_main", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TypeStoreStatus,
        default: TypeStoreStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Store.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Store.prototype, "logo_url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Store.prototype, "banner_url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Store.prototype, "website_url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Store.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Store.prototype, "user_id", void 0);
exports.Store = Store = __decorate([
    (0, typeorm_1.Entity)()
], Store);
//# sourceMappingURL=Store.js.map