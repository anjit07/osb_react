import { ENV } from "src/constant/env";

export class LoggerWrapper {

    private static ENABLE_LOGGER: boolean = ENV.LOGGER;
    
    public static info(message: string, ...objects: any[]) {
        if (LoggerWrapper.ENABLE_LOGGER === true) {
            console.log(LoggerWrapper.prepareMesage("INFO", message, objects))
        }
    }

    public static debug(message: string, ...objects: any[]) {
        if (LoggerWrapper.ENABLE_LOGGER === true) {
            console.log(LoggerWrapper.prepareMesage("DEBUG", message, objects))
        }
    }


    public static error(message: string, ...objects: any[]) {
        if (LoggerWrapper.ENABLE_LOGGER === true) {
            console.error(LoggerWrapper.prepareMesage("ERROR", message, objects))
        }
    }


    private static prepareMesage(level: string, message: string, ...objects: any[]): string {

        let finalMessage = `${level}: ${message}`;
        objects.forEach(array => {
            array.forEach((obj: any) => {
                finalMessage = finalMessage.replace("[]", (typeof obj === 'object' ? JSON.stringify(obj) : obj));
            });
        });
        return finalMessage;

    }

}