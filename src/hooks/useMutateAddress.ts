import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/service/api'
import type { AddressType } from '@/types/addressType'
import { toast } from 'react-toastify'

export function useMutateAddress(token: string | null) {
  const queryClient = useQueryClient()

  if(!token) {
    throw new Error('Token é necessário para mutação de endereço')
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
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data
    },
    
    onSuccess: () => {
      // 🎯 Invalidar cache para forçar refetch automático
      queryClient.invalidateQueries({ queryKey: ['addresses', token] })
      toast.success('Endereço adicionado com sucesso!')
    },
    
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Erro ao adicionar endereço'
      toast.error(message)
    },
  })
}
