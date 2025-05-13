export interface User {
    userId?: string;
    username?: string;
    email: string;
    avatar?: string;
    password: string;
    birthdate?: Date;
    registeredAt?: Date;
    name: string;
    passwordConfirm: string;
    role?: string;
}

export interface Tour {
    name?: string;
    slug?: string;
    duration: number;
    maxGroupSize: number;
    difficulty: string;
    ratingsAverage: number;
    ratingsQuantity: number;
    price: number;
    priceDiscount: number;
    summary: string;
    description?: string;
    imageCoVer: string;
    images: string[];
    createdAt: Date;
    startDates: Date[];
    secretTour: Boolean;
    startLocation: JSON;
    locations: JSON;
    guides: Object[];
}