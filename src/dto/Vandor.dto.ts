export interface CreateVandorInputs {
    name: string
    ownerName: string
    foodTypes: [string]
    pincode: string
    address: string
    phone: string
    email: string
    password: string
}

export interface VandorLoginInputs {
    email: string
    password: string
}

export interface UpdateVandorInputs {
    name: string
    address: string
    phone: string
    foodTypes: [string]
}

export interface VandorPayload {
    _id: string
    email: string
    name: string
    foodTypes: [string]
}
