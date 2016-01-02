import * as db from "../services/db";
import * as mtg from "../services/mtg"

export interface IDocument {
    _id?: string;
    version?: number;
}

export interface IPaint extends IDocument {
    title: string,
    description: string,
    year: string,
    picture: string,
    order: number,
    size: string,
    thumbnail: string
}

export class PaintsCollection extends db.DB {
    constructor() {
        super("paint.nedb");
    }

    createNew(painting: IPaint): Promise<IPaint> {
        //TODO parameters check
        //TODO check email format
        //TODO check already exist

        // return new Promise<IPaint>((resolve,reject)=>{
        //     super.insert<IPaint>(painting).then((paintCreated)=>{
        //         resolve(userCreated);
        //     }).catch((err)=>{
        //         reject(err);
        //     })
        // })
        return super.insert<IPaint>(painting);
    }

    // update(paintId: string, query: any): Promise<IPaint> {
    //     //TODO parameters check
    //     return super.update<IPaint>(paintId, query);
    // }

    findById(id: string): Promise<IPaint> {
        return super.findOne<IPaint>({ _id: id });

    };

    removeById(id: string): Promise<number> {
        return super.remove({ _id: id });
    };

    getAll(): Promise<IPaint[]> {
        return super.findAll<IPaint>({})
    };

    count(query: any): Promise<number> {
        return super.count(query);
    }
};