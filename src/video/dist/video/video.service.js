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
exports.VideoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const video_schema_1 = require("./model/video.schema");
const video_repository_1 = require("./video.repository");
const rxjs_1 = require("rxjs");
let VideoService = class VideoService {
    videoRepository;
    client;
    userService;
    constructor(videoRepository, client) {
        this.videoRepository = videoRepository;
        this.client = client;
    }
    onModuleInit() {
        this.userService =
            this.client.getService('UserService');
    }
    async getAll() {
        try {
            return await this.videoRepository.findAll();
        }
        catch (error) {
            console.error('Error fetching all videos:', error);
            throw new Error('Failed to fetch videos');
        }
    }
    async findById(id) {
        if (!id) {
            throw new common_1.BadRequestException('Video ID is required');
        }
        try {
            const result = await this.videoRepository.findById(id);
            if (!result) {
                throw new common_1.NotFoundException(`Video with ID ${id} not found`);
            }
            return result;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error(`Error finding video by ID ${id}:`, error);
            throw new Error('Failed to find video');
        }
    }
    async findByTitle(title) {
        if (!title) {
            throw new common_1.BadRequestException('Video ID is required');
        }
        try {
            const result = await this.videoRepository.findByTitle(title);
            if (!result) {
                throw new common_1.NotFoundException(`Video with ID ${title} not found`);
            }
            return result;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error(`Error finding video by ID ${title}:`, error);
            throw new Error('Failed to find video');
        }
    }
    async create(video) {
        if (!video.title || !video.owner) {
            throw new common_1.BadRequestException('Video title and owner ID are required');
        }
        try {
            return await this.videoRepository.create(video);
        }
        catch (error) {
            console.error('Error creating video:', error);
            throw new Error('Failed to create video');
        }
    }
    async deleteByTitle(title) {
        if (!title) {
            throw new common_1.BadRequestException('Video title is required');
        }
        try {
            const deletedVideo = await this.videoRepository.deleteByTitle(title);
            if (!deletedVideo) {
                throw new common_1.NotFoundException(`Video with title "${title}" not found`);
            }
            return deletedVideo;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error(`Error deleting video by title ${title}:`, error);
            throw new Error('Failed to delete video');
        }
    }
    async findByOwnerId(ownerId) {
        if (!ownerId) {
            throw new common_1.BadRequestException('Owner ID is required');
        }
        try {
            const videos = await this.videoRepository.findByOwner(ownerId);
            return videos;
        }
        catch (error) {
            console.error(`Error finding videos by owner ${ownerId}:`, error);
            throw new Error('Failed to find videos by owner');
        }
    }
    async updateById(id, updateVideoDto) {
        if (!id) {
            throw new common_1.BadRequestException('Video ID is required');
        }
        try {
            const updatedVideo = await this.videoRepository.updateById(id, updateVideoDto);
            if (!updatedVideo) {
                throw new common_1.NotFoundException(`Video with ID ${id} not found`);
            }
            return updatedVideo;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error(`Error updating video ${id}:`, error);
            throw new Error('Failed to update video');
        }
    }
    async findUserById(id) {
        if (!id) {
            throw new common_1.BadRequestException('User ID is required');
        }
        try {
            return await (0, rxjs_1.lastValueFrom)(this.userService.findUserById({ id }));
        }
        catch (error) {
            console.error(`Error finding user by ID ${id}:`, error);
            throw new common_1.NotFoundException('User not found');
        }
    }
};
exports.VideoService = VideoService;
exports.VideoService = VideoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(video_schema_1.Video.name)),
    __param(1, (0, common_1.Inject)('USER_PACKAGE')),
    __metadata("design:paramtypes", [video_repository_1.VideoRepository, Object])
], VideoService);
//# sourceMappingURL=video.service.js.map