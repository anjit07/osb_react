

export class StorageUtils {


    public static get(key: string): any {

        return localStorage.getItem(key) ? StorageUtils.parse(localStorage.getItem(key)) : null;
    }

    public static set(key: string, value: any): void {

        localStorage.setItem(key, typeof value == 'object' ? JSON.stringify(value) : value);
    }

    public static remove(key:any): void {

        if (localStorage[key]) {
            localStorage.removeItem(key);
        } else {
            console.log("Item value not found which you try to remove from session");
        }
    }


    private static parse(value: any): any {
        try {

            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }

}