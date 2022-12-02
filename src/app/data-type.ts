export interface SignUp {
    name: string,
    email: string,
    password: string
}

export interface Login {
    email: string,
    password: string
}

export interface Product {
    id:number,
    category:string,
    image: string,
    name: string,
    price: number,
    color:string,
    description:string
}