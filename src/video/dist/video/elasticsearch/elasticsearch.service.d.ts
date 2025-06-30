import { ElasticsearchService } from '@nestjs/elasticsearch';
export declare class CustomEsService {
    private readonly esClient;
    constructor(esClient: ElasticsearchService);
    index(index: string, id: string, data: Record<string, unknown>): Promise<import("@elastic/elasticsearch/lib/api/types").WriteResponseBase>;
    update(index: string, id: string, data: Record<string, unknown>): Promise<import("@elastic/elasticsearch/lib/api/types").UpdateResponse<unknown>>;
    delete(index: string, id: string): Promise<import("@elastic/elasticsearch/lib/api/types").WriteResponseBase>;
    search(index: string, query: Record<string, unknown>): Promise<import("@elastic/elasticsearch/lib/api/types").SearchResponse<unknown, Record<string, import("@elastic/elasticsearch/lib/api/types").AggregationsAggregate>>>;
    get(index: string, id: string): Promise<import("@elastic/elasticsearch/lib/api/types").GetResponse<unknown>>;
}
