"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoModule = void 0;
const common_1 = require("@nestjs/common");
const video_service_1 = require("./video.service");
const mongoose_1 = require("@nestjs/mongoose");
const video_schema_1 = require("./model/video.schema");
const video_controller_1 = require("./video.controller");
const video_client_module_1 = require("./video-client.module");
const elasticsearch_module_1 = require("./elasticsearch/elasticsearch.module");
const redis_module_1 = require("./redis/redis.module");
const database_module_1 = require("../lib/common/mongodb/database.module");
let VideoModule = class VideoModule {
};
exports.VideoModule = VideoModule;
exports.VideoModule = VideoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: video_schema_1.Video.name, schema: video_schema_1.VideoSchema }]),
            elasticsearch_module_1.CustomEsModule,
            video_client_module_1.VideoClientsModule,
            redis_module_1.RedisModule,
            database_module_1.DatabaseModule,
        ],
        controllers: [video_controller_1.VideoController],
        providers: [video_service_1.VideoService],
        exports: [video_service_1.VideoService],
    })
], VideoModule);
//# sourceMappingURL=video.module.js.map