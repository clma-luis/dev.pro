import { UserInterface } from "../interfaces/user.interface";

export class User implements UserInterface {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
}
