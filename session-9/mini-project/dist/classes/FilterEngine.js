"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterEngine = void 0;
class FilterEngine {
    filterByProperty(items, property, value) {
        return items.filter((item) => item[property] === value);
    }
}
exports.FilterEngine = FilterEngine;
