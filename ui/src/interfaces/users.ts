export type LoginRequest = {
    username: string,
    password: string
}

export type User = {
    username: string,
    password: string,
    token: string,
    id: string,
    role: string,

}