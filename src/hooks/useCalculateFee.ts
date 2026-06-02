import { useQuery } from "@tanstack/react-query"
import api from "@/service/api"

import { useAddresses } from "./UseAddressesHook";


export interface DeliveryRange {
    min: number;
    max: number;
}

export interface Dimensions {
    height: number;
    width: number;
    length: number;
}

export interface ProductItem {
    id: string;
    quantity: number;
}

export interface Package {
    price: string;
    discount: string;
    format: string;
    dimensions: Dimensions;
    weight: string;
    insurance_value: string;
    products: ProductItem[];
}

export interface AdditionalServices {
    receipt: boolean;
    own_hand: boolean;
    collect: boolean;
}

export interface ShippingCompany {
    id: number;
    name: string;
    picture: string;
}

export interface ShippingQuote {
    id: number;
    name: string;
    price: string;
    custom_price: string;
    discount: string;
    currency: string;
    delivery_time: number;
    delivery_range: DeliveryRange;
    custom_delivery_time: number;
    custom_delivery_range: DeliveryRange;
    packages: Package[];
    additional_services: AdditionalServices;
    company: ShippingCompany;
}

export interface FinalData {
    message: string;
    success: boolean;
    data: ShippingQuote[]

}

export function useCalculateFee(authenticated: boolean | null) {

    const addressesData = useAddresses(authenticated)
    const primaryAddress = addressesData.data?.userAddresses?.find((address) => address.isPrimary)

    return useQuery({
        queryKey: ['calculateFee', authenticated],


        queryFn: async () => {
            if (!authenticated) throw new Error('authenticated is required')
            if (!primaryAddress) throw new Error('Primary address is required')

            const response = await api.post("/api/shipping/calculateShipping", {
                "destinationCep": "60010-000",
                "id": 1,
                "width": 12.5,
                "height": 8.0,
                "length": 15.0,
                "weight": 4.2,
                "quantity": 1,
                "value": 49.99
            })

            return response.data as FinalData
        }
    })


}