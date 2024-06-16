export interface GetUsersResponse {
    userList: UserType[];
}

export interface UserType {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
}