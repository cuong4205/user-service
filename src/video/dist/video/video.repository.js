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
exports.VideoRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const video_schema_1 = require("./model/video.schema");
let VideoRepository = class VideoRepository {
    videoModel;
    esService;
    redisService;
    constructor(videoModel) {
        this.videoModel = videoModel;
    }
    async findAll() {
        const result = await this.esService.search('videos', {
            query: { match_all: {} },
        });
        const videos = result.hits.hits.map((hit) => hit._source);
        await this.redisService.set('videos', JSON.stringify(videos));
        return videos;
    }
    async findById(id) {
        const cached = await this.redisService.get(`video:${id}`);
        if (cached) {
            return JSON.parse(cached);
        }
        const result = await this.esService.get('videos', id);
        if (result.found) {
            await this.redisService.set(`video:${id}`, JSON.stringify(result._source), 60);
            return result._source;
        }
        return null;
    }
    async findByTitle(title) {
        const cached = await this.redisService.get('videos: ${title');
        if (cached) {
            return JSON.parse(cached);
        }
        const result = await this.esService.get('videos', title);
        if (result.found) {
            await this.redisService.set(`video:${title}`, JSON.stringify(result._source), 60);
            return result._source;
        }
        return null;
    }
    async create(video) {
        const newVideo = new this.videoModel(video);
        await this.esService.index('videos', newVideo.id, {
            title: newVideo.title,
            description: newVideo.description,
            url: newVideo.url,
        });
        await this.redisService.delete('videos');
        return newVideo.save();
    }
    async deleteByTitle(title) {
        const deleted = await this.videoModel
            .findOneAndDelete({ title: new RegExp(title, 'i') })
            .lean()
            .exec();
        if (deleted) {
            await this.esService.delete('videos', deleted.id);
            await this.redisService.delete(`video:${deleted.id}`);
            await this.redisService.delete('videos');
        }
        return deleted;
    }
    async findByOwner(ownerId) {
        const result = await this.esService.search('videos', {
            query: { match: { owner: ownerId } },
        });
        return result.hits.hits.map((hit) => hit._source);
    }
    async updateById(id, update) {
        const video = await this.findById(id);
        if (!video) {
            return null;
        }
        await this.esService.update('videos', id, update);
        await this.redisService.delete(`video:${id}`);
        return this.videoModel.findByIdAndUpdate(id, update, { new: true }).exec();
    }
};
exports.VideoRepository = VideoRepository;
exports.VideoRepository = VideoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(video_schema_1.Video.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VideoRepository);
//# sourceMappingURL=video.repository.js.map