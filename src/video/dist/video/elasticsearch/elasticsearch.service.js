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
exports.CustomEsService = void 0;
const common_1 = require("@nestjs/common");
const elasticsearch_1 = require("@nestjs/elasticsearch");
let CustomEsService = class CustomEsService {
    esClient;
    constructor(esClient) {
        this.esClient = esClient;
    }
    async index(index, id, data) {
        const esIndex = await this.esClient.index({
            index,
            id,
            document: data,
        });
        if (!esIndex) {
            throw new common_1.NotFoundException('index not found');
        }
        return esIndex;
    }
    async update(index, id, data) {
        const esIndex = await this.esClient.update({
            index,
            id,
            doc: data,
        });
        if (!esIndex) {
            throw new common_1.NotFoundException('index not found');
        }
        return esIndex;
    }
    async delete(index, id) {
        const esIndex = await this.esClient.delete({
            index,
            id,
        });
        if (!esIndex) {
            throw new common_1.NotFoundException('index not found');
        }
        return esIndex;
    }
    async search(index, query) {
        const esIndex = await this.esClient.search({
            index,
            body: query,
        });
        if (!esIndex) {
            throw new common_1.NotFoundException('index not found');
        }
        return esIndex;
    }
    async get(index, id) {
        const esIndex = await this.esClient.get({
            index,
            id,
        });
        if (!esIndex) {
            throw new common_1.NotFoundException('index not found');
        }
        return esIndex;
    }
};
exports.CustomEsService = CustomEsService;
exports.CustomEsService = CustomEsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [elasticsearch_1.ElasticsearchService])
], CustomEsService);
//# sourceMappingURL=elasticsearch.service.js.map