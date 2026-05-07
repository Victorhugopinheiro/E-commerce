# 🎯 React Query - Melhores Práticas de Cache

## 1. Configuração Global Otimizada

```typescript
// main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,      // 5 min: dados ficam "frescos"
      gcTime: 1000 * 60 * 10,         // 10 min: tempo até deletar do cache
      retry: 1,                       // 1 tentativa em caso de erro
      refetchOnWindowFocus: true,     // Revalidar ao voltar aba
      refetchOnReconnect: true,       // Revalidar ao reconectar
    },
    mutations: {
      retry: 1,
    },
  },
})
```

---

## 2. Configuração por Query (Específica)

```typescript
// Dados que mudam frequentemente = staleTime baixo
const { data: user } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  staleTime: 1000 * 60,     // 1 min (atualiza rápido)
})

// Dados estáveis = staleTime alto
const { data: countries } = useQuery({
  queryKey: ['countries'],
  queryFn: fetchCountries,
  staleTime: 1000 * 60 * 60 * 24, // 24 horas (quase nunca muda)
})

// Dados em tempo real = sem cache
const { data: liveChat } = useQuery({
  queryKey: ['chat'],
  queryFn: fetchMessages,
  staleTime: 0, // Sempre "stale", refetch constantemente
  refetchInterval: 2000, // A cada 2 segundos
})
```

---

## 3. Invalidação de Cache (Quando Dados Mudam)

```typescript
// ❌ ERRADO: Refetch manual
async function addAddress(data) {
  await api.post('/address', data)
  // Esqueci de invalidar cache!
}

// ✅ CORRETO: Invalidar automaticamente
export function useMutateAddress(token: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (addressData) => 
      api.post('/address/addAddress', addressData),
    
    onSuccess: () => {
      // Força refetch automático
      queryClient.invalidateQueries({ 
        queryKey: ['addresses', token] 
      })
    },
  })
}
```

---

## 4. Padrões Avançados

### A) Otimistic Update (atualizar UI antes da resposta)
```typescript
const mutation = useMutation({
  mutationFn: (newAddress) => api.post('/address', newAddress),
  
  onMutate: (newAddress) => {
    // Backup dos dados antigos
    const previousData = queryClient.getQueryData(['addresses'])
    
    // Atualizar cache imediatamente
    queryClient.setQueryData(['addresses'], (old) => [
      ...old,
      newAddress
    ])
    
    return { previousData }
  },
  
  onError: (err, newAddress, context) => {
    // Rollback se der erro
    queryClient.setQueryData(['addresses'], context?.previousData)
  },
})
```

### B) Invalidação em Cascata
```typescript
onSuccess: () => {
  // Invalida tudo relacionado a endereços
  queryClient.invalidateQueries({ 
    queryKey: ['addresses'],
    exact: false  // Invalida ['addresses', token1], ['addresses', token2], etc
  })
  
  // E também invalidar pedidos (depende de endereços)
  queryClient.invalidateQueries({ queryKey: ['orders'] })
}
```

### C) Prefetch (carregar antes de usar)
```typescript
// Pré-carregar endereços antes do usuário navegar
queryClient.prefetchQuery({
  queryKey: ['addresses', token],
  queryFn: fetchAddresses,
})
```

---

## 5. Debugging - Ver o que está em Cache

```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// No App.tsx
<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

Agora você verá:
- ✅ Quais queries estão em cache
- ✅ Estado (fresh, stale, loading, error)
- ✅ Quais dados estão armazenados
- ✅ Histórico de requisições

---

## 6. Anti-padrões (NÃO FAZER)

❌ **Requisições simultâneas**
```typescript
// Evitar 3 requisições iguais
useAddresses(token) // Componente 1
useAddresses(token) // Componente 2
useAddresses(token) // Componente 3

// React Query desduplicará automaticamente ✅
```

❌ **Invalidar tudo constantemente**
```typescript
// Muito agressivo!
queryClient.invalidateQueries() 
```

❌ **Usar useQuery para mutations**
```typescript
// ❌ ERRADO
const { refetch } = useQuery({
  queryFn: () => api.post('/address', data), // POST em query?!
})

// ✅ CORRETO
useMutation({
  mutationFn: () => api.post('/address', data),
})
```

---

## 7. Seu Projeto Agora

```typescript
// ✅ UseAddressesHook.ts - Query (ler dados)
export function useAddresses(token: string | null) {
  return useQuery({
    queryKey: ['addresses', token],
    queryFn: () => api.get('/api/users/userDetails'),
    enabled: !!token,
    staleTime: 1000 * 60 * 10, // 10 min
  })
}

// ✅ useMutateAddress.ts - Mutation (modificar dados)
export function useMutateAddress(token: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => api.post('/address/addAddress', data),
    onSuccess: () => {
      // Invalida cache e força refetch
      queryClient.invalidateQueries({ 
        queryKey: ['addresses', token] 
      })
      toast.success('Endereço adicionado!')
    },
  })
}

// ✅ PlaceOrder.tsx - Consumidor
function PlaceOrder() {
  const { data: addresses } = useAddresses(token) // Lê do cache
  const mutateAddress = useMutateAddress(token)    // Modifica
  
  const onSubmit = (data) => {
    mutateAddress.mutate(data) // Automaticamente invalida cache
  }
}
```

---

## Resumo da Estratégia

| Situação | Ação |
|----------|------|
| Dados lidos por múltiplos componentes | Cache automático deduplica |
| Usuário cria novo endereço | Mutation + invalidação refetch |
| Usuário muda de aba | refetchOnWindowFocus revalida |
| Conexão volta | refetchOnReconnect revalida |
| Dados desatualizam | staleTime define quando revalidar |
| Quer ver cache em tempo real | React Query DevTools |

---

## Próximos Passos

1. ✅ Use `useMutation` para CRIAR/EDITAR/DELETAR
2. ✅ Use `useQuery` para LER dados
3. ✅ Sempre invalidar cache após mutation
4. ✅ Instale ReactQueryDevtools para debugar
5. ✅ Defina staleTime apropriado por tipo de dado
