"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class ResourceNotFoundException extends common_1.HttpException {
    constructor(error) {
        super(error, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.ResourceNotFoundException = ResourceNotFoundException;
//# sourceMappingURL=ResourceNotFoundException.js.map