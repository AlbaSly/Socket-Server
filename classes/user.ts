export class User {
    id: string;
    username: string | null;
    room: string | null;
    
    constructor(id: string) {
        this.id  = id;
        this.username = null;
        this.room = null;
    }
}