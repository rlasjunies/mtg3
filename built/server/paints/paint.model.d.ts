import * as db from "../services/db";
export interface IDocument {
    _id?: string;
    version?: number;
}
export interface IPaint extends IDocument {
    title: string;
    description: string;
    year: string;
    picture: string;
    order: number;
    size: string;
    thumbnail: string;
}
export declare class PaintsCollection extends db.DB {
    constructor();
    createNew(painting: IPaint): Promise<IPaint>;
    findById(id: string): Promise<IPaint>;
    removeById(id: string): Promise<number>;
    getAll(): Promise<IPaint[]>;
    count(query: any): Promise<number>;
}
