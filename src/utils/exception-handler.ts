export class EXceptionHandler {
    public static MESSAGE: string = "";

    static subscribers: Set<() => void> = new Set();

    public static exception(error: any) {
        EXceptionHandler.messageHelpper(error);
    }

    private static messageHelpper(error: any): void {
        if (error?.code && error.code === "ERR_NETWORK") {
            EXceptionHandler.setMessage("Service unavailable 503");
        } else if (error?.message) {
            EXceptionHandler.setMessage(error?.message);
        } else {
            EXceptionHandler.setMessage("Server error occurred");
        }
    }

    public static getMessage(): string {
        return EXceptionHandler.MESSAGE;
    }

    public static setMessage(message: string) {
        EXceptionHandler.MESSAGE = message;
        this.notifySubscribers();
    }

    // Add a new subscriber (callback function)
    static subscribe(callback: () => void) {
        this.subscribers.add(callback);
    }

    // Remove a subscriber
    static unsubscribe(callback: () => void) {
        this.subscribers.delete(callback);
    }

    static notifySubscribers() {
        this.subscribers.forEach((callback) => callback());
    }
}
