import { Socket, Server } from "socket.io";

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
}

/**Escuchar mensajes */
export const mensaje = (cliente: Socket, io: Server) => {
    cliente.on('mensaje', (payload: {de: string, cuerpo: string}) => {
        console.log('Mensaje recibido', payload);

        /**Una vez que se reciba el mensaje, se emite desde el servidor */
        io.emit('mensaje-nuevo', payload);
    });
}