export class DataManager {
    private static instance: DataManager = null;
    private data: any = {};

    private constructor() {
    }

    public static getInstance(): DataManager {
        if (this.instance === null) {
            this.instance = new DataManager();
        }
        return this.instance;
    }

    public SetData(key: string, value: any) {
        this.data[key] = value;
    }

    public GetData(key: string, defaultValue: any = null): any {
        if (key in this.data) {
            return this.data[key];
        }
        this.SetData(key, defaultValue);
        return defaultValue;
    }
    public static DataUser = {
        highScore: 0,
    }
}
