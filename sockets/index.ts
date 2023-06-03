import { Socket, Server } from "socket.io";
import { UserList } from "../classes/user-list";
import { User } from "../classes/user";

export const UsersOnline = new UserList();

export const conectarCliente = (cliente: Socket) => {
    const user = new User(cliente.id);
    UsersOnline.addUser(user);
}

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        const userRemoved = UsersOnline.removeUser(cliente.id);
    });
}

/**Escuchar mensajes */
export const mensaje = (cliente: Socket, io: Server) => {
    cliente.on('mensaje', (payload: {from: User, body: string}) => {
        console.log('Mensaje recibido', payload);

        /**Una vez que se reciba el mensaje, se emite desde el servidor */
        io.emit('mensaje-nuevo', payload);
    });
}

/**Detectar y configurar usuario*/
export const setUser= (cliente: Socket, io: Server) => {
    cliente.on('set-user', (payload: {username: string}, callback: Function) => {
        
        console.log("Usuario detectado: ", payload.username); 

        UsersOnline.updateName(cliente.id, payload.username);
        
        callback({
            ok: true,
            msg: `Usuario configurado: ${payload.username}-${cliente.id}`,
        });
    });
}