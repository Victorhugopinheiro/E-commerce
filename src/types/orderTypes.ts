export interface OrderTypes{
    _id: string;
    userId: string;
    items: {
        productId: string;
        quantity: number;
        size?: string;
        price?: number;
        _id: string;
    }[];
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: string;
    paymentStatus: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    date: Number;
    createdAt: string;
    updatedAt: string;
    }