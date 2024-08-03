
export interface register {
    name: string;
    lastName: string;
    address: string;
    users: string;
    passsword: string;
}

export interface login {
    email: string;
    password: string;
}


export interface user {
    name: string;
    token: string;
}
