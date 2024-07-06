import { io } from "socket.io-client"

export const initalizingSokcet = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    }

    return io("https://backend-code-4nwl.onrender.com", options);
}
