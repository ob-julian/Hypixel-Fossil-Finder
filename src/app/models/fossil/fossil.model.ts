import { MetaFossil } from '../meta-fossil/meta-fossil.model';

export class Fossil extends MetaFossil {
    override data: boolean[][];

    constructor(
        id: number = 0,
        name: string = 'dummy',
        description: string = 'dummy',
        data: boolean[][] = [[false]]
    ) {
        super(id, name, description);
        this.data = data;
    }
}