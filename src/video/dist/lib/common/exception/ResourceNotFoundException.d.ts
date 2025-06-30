import { HttpException } from '@nestjs/common';
export declare class ResourceNotFoundException extends HttpException {
    constructor(error: string);
}
