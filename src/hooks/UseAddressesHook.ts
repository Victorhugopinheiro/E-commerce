
import api from "@/service/api"
import type { AddressType } from "@/types/addressType"
import { useQuery } from "@tanstack/react-query"


export interface UseAddressesResult {
    userAddresses: AddressType[] | null
    userInfo: {
        name: string
        phone: string
    }
}


export function useAddresses(token: string | null) {
    return useQuery({
        queryKey: ['addresses', token],
        queryFn: async () => {
            if (!token) throw new Error('Token is required')
            const { data }  = await api.get('/api/users/userDetails', {
                headers: { Authorization: `Bearer ${token}` }
            }) as { data: UseAddressesResult }
          
            return data
        },
        enabled: !!token,
        staleTime: 1000 * 60 * 10,
    })


}