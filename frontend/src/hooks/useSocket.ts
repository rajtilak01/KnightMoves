import { useEffect, useState } from "react"

const WS_URL = process.env.BASE_URL_BACKEND;

export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        if (!WS_URL) {
            console.error("WebSocket URL is not defined.");
            return;  
        }

        const ws = new WebSocket(WS_URL);
        console.log("WebSocket connection established:", ws);

        ws.onopen = () => {
            setSocket(ws);
        }

        ws.onclose = () => {
            setSocket(null);
        }

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        }

        return () => {
            ws.close();
        }
    }, [])
    return socket;
}