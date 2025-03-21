export class MetaFossil {
    id: number;
    name: string;
    description: string;
    data: any[][];

    constructor(
        id: number = 0,
        name: string = 'dummy',
        description: string = 'dummy',
        data: boolean[][] = [[false]]
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.data = data;
    }
}