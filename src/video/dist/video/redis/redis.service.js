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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheService = void 0;
const common_1 = require("@nestjs/common");
const Redis = require("ioredis");
let RedisCacheService = class RedisCacheService {
    redisClient;
    constructor(redisClient) {
        this.redisClient = redisClient;
        this.redisClient.on('connect', () => {
            console.log('[Redis] Connected for caching');
        });
        this.redisClient.on('error', (err) => {
            console.error('[Redis] Error:', err);
        });
    }
    async set(key, value, ttlSeconds) {
        const serialized = JSON.stringify(value);
        if (ttlSeconds) {
            await this.redisClient.set(key, serialized, 'EX', ttlSeconds);
        }
        else {
            await this.redisClient.set(key, serialized);
        }
    }
    async get(key) {
        const raw = await this.redisClient.get(key);
        return raw ? JSON.parse(raw) : null;
    }
    async delete(key) {
        await this.redisClient.del(key);
    }
};
exports.RedisCacheService = RedisCacheService;
exports.RedisCacheService = RedisCacheService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [Redis.Redis])
], RedisCacheService);
//# sourceMappingURL=redis.service.js.map