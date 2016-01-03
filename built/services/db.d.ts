export declare class DB {
    private db;
    constructor(collection: string);
    insert<T>(doc: T): Promise<T>;
    findOneById<T>(id: string): Promise<T>;
    findOne<T>(query: any): Promise<T>;
    remove(query: any): Promise<number>;
    findAll<T>(query: any): Promise<T[]>;
    count(query: any): Promise<number>;
    update<T>(id: string, doc: T): Promise<T>;
}
