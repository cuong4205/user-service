import * as Redis from 'ioredis';
export declare class RedisCacheService {
    private readonly redisClient;
    constructor(redisClient: Redis.Redis);
    set(key: string, value: unknown, ttlSeconds?: number): Promise<void>;
    get<T = any>(key: string): Promise<T | null>;
    delete(key: string): Promise<void>;
}
