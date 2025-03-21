import { MetaFossil } from "../meta-fossil/meta-fossil.model";
import { Fossil } from "../fossil/fossil.model";

export class ColoredFossil extends MetaFossil {
    override data: number[][];
    infos: number[][][];

    constructor(
        id: number = 0,
        name: string = 'dummy',
        description: string = 'dummy',
        data: number[][] = [[0]]
    ) {
        super(id, name, description);
        this.data = data;
        this.infos = this.data.map(row => row.map(cell => []));
    }

    static copyFossil(fossil: Fossil): ColoredFossil {
        return new ColoredFossil(fossil.id, fossil.name, fossil.description, fossil.data.map(row => row.map(cell => cell ? 1 : 0)));
    }
}