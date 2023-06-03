import { User } from "./user";

export class UserList {
    private list: Array<User> = [];

    constructor() {}

    addUser(user: User) {
        this.list.push(user);

        console.log("Usuario agregado");
        console.log(this.list);

        return user;
    }

    updateName(id: string, username: string) {
        for (let user of this.list) {
            if (user.id === id) {
                user.username = username;
                break;
            }
        }

        console.log("===Usuario Actualizado==="); 
        console.log(this.list);
    }

    getList() {
        return this.list;
    }

    getUser(id: string) {
        return this.list.find(user => user.id === id);
    }

    getUsersByRoom(room: string) {
        return this.list.filter(user => user.room === room);
    }

    removeUser(id: string) {
        const userToDelete = this.getUser(id);

        this.list = this.list.filter(user => user.id !== id);
        
        console.log(`Cliente removido: ${userToDelete?.id}`);
        console.log(this.list)

        return userToDelete;
    }
}