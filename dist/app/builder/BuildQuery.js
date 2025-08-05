"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BuildQuery {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) { }
    filter() { }
    sort() { }
    pagination() { }
    fields() { }
}
exports.default = BuildQuery;
