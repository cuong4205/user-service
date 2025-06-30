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
exports.VideoController = void 0;
const common_1 = require("@nestjs/common");
const video_service_1 = require("./video.service");
const uploadVideo_dto_1 = require("./model/uploadVideo.dto");
const ResourceNotFoundException_1 = require("../lib/common/exception/ResourceNotFoundException");
let VideoController = class VideoController {
    videoService;
    constructor(videoService) {
        this.videoService = videoService;
    }
    async getAll() {
        try {
            return await this.videoService.getAll();
        }
        catch (error) {
            console.log(error);
            throw new ResourceNotFoundException_1.ResourceNotFoundException('Videos not found');
        }
    }
    async findByTitle(title) {
        try {
            return await this.videoService.findByTitle(title);
        }
        catch (error) {
            console.log(error);
            throw new ResourceNotFoundException_1.ResourceNotFoundException('Video not found');
        }
    }
    async uploadVideo(uploadVideoDto) {
        try {
            return await this.videoService.create(uploadVideoDto);
        }
        catch (error) {
            console.log(error);
            throw new ResourceNotFoundException_1.ResourceNotFoundException('Video not created');
        }
    }
    async deleteVideo(title) {
        try {
            const deleted = await this.videoService.deleteByTitle(title);
            if (!deleted) {
                throw new ResourceNotFoundException_1.ResourceNotFoundException('Video not found');
            }
            return deleted;
        }
        catch (error) {
            console.log(error);
            throw new ResourceNotFoundException_1.ResourceNotFoundException('Video not found');
        }
    }
    async findByOwnerId(id) {
        try {
            return await this.videoService.findByOwnerId(id);
        }
        catch (error) {
            console.log(error);
            throw new ResourceNotFoundException_1.ResourceNotFoundException('Videos not found');
        }
    }
    async findUserById(id) {
        try {
            return await this.videoService.findUserById(id);
        }
        catch (error) {
            console.log(error);
            throw new ResourceNotFoundException_1.ResourceNotFoundException('User not found');
        }
    }
};
exports.VideoController = VideoController;
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('findByTitle'),
    __param(0, (0, common_1.Query)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "findByTitle", null);
__decorate([
    (0, common_1.Post)('upload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [uploadVideo_dto_1.UploadVideoDto]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "uploadVideo", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Query)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "deleteVideo", null);
__decorate([
    (0, common_1.Get)('find/owner'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "findByOwnerId", null);
__decorate([
    (0, common_1.Get)('find/user'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "findUserById", null);
exports.VideoController = VideoController = __decorate([
    (0, common_1.Controller)('videos'),
    __metadata("design:paramtypes", [video_service_1.VideoService])
], VideoController);
//# sourceMappingURL=video.controller.js.map