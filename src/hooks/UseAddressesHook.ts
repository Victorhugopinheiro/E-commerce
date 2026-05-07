import { AuthContext } from "@/context/authContext"
import api from "@/service/api"
import type { AddressType } from "@/types/addressType"
import { useQuery } from "@tanstack/react-query"




export function useAddresses(token: string | null) {
    return useQuery({
        queryKey: ['addresses', token],
        queryFn: async () => {
            if (!token) throw new Error('Token is required')
            const { data } = await api.get('/api/users/userDetails', {
                headers: { Authorization: `Bearer ${token}` }
            })
            return data as AddressType
        },
        enabled: !!token,
        staleTime: 1000 * 60 * 10,
    })


}