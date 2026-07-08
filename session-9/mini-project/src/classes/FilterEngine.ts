export class FilterEngine<T> {
    filterByProperty(items: T[], property: keyof T, value: any): T[] {
        return items.filter((item) => item[property] === value);
    }
}