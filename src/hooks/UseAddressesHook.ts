
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


export function useAddresses(authenticated: boolean | null) {
    return useQuery({
        queryKey: ['addresses', authenticated],
        queryFn: async () => {
            if (!authenticated) throw new Error('authenticated is required')
            const { data }  = await api.get('/api/users/userDetails', {
                headers: { Authorization: `Bearer ${authenticated}` }
            }) as { data: UseAddressesResult }
          
            return data
        },
        enabled: !!authenticated,
        staleTime: 1000 * 60 * 10,
    })


}