export class ClientData<T> {
    public total: number = 0;
    public datas: Array<T>;

    constructor() {
        this.datas = [];
    }
}