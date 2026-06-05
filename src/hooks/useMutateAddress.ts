import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/service/api'
import type { AddressType } from '@/types/addressType'
import { toast } from 'react-toastify'

export function useMutateAddress(authenticated: boolean | null) {
  const queryClient = useQueryClient()

  if(!authenticated) {
    throw new Error('authenticated é necessário para mutação de endereço')
  }

  return useMutation({
    mutationFn: async (addressData: AddressType) => {
      const response = await api.post('/api/address/addAddress', {
        street: addressData.street,
        city: addressData.city,
        state: addressData.state,
        zipCode: addressData.zipCode,
        country: addressData.country,
        phone: addressData.phone,
      })
      return response.data
    },
    
    onSuccess: () => {
    
      queryClient.invalidateQueries({ queryKey: ['addresses', authenticated] })
      toast.success('Endereço adicionado com sucesso!')
    },
    
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Erro ao adicionar endereço'
      toast.error(message)
    },
  })
}
