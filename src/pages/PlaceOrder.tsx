import { useContext } from "react"

import CartTotal from "../components/cart/CartTotal"
import AddressComponent from "../components/placeOrderComponents/addressComponent"

import api from "../service/api"
import { AuthContext } from "../context/authContext"
import { ShopContext } from "../context/ShopContext"
import { toast } from "react-toastify"

import { validateOrder, type ZodOrderTypes } from "@/types/zodTypes/orderType"

import { useAddresses } from "@/hooks/UseAddressesHook"
import { useMutateAddress } from "@/hooks/useMutateAddress"
import { useCalculateFee, } from "@/hooks/useCalculateFee"
import { useUserIdentifications } from "@/hooks/userIdentifications"

function PlaceOrder() {
  const { authenticated } = useContext(AuthContext)!
  const { cart } = useContext(ShopContext)!
  const mutateAddress = useMutateAddress(authenticated ?? null)
  const { data: addresses, isLoading, error } = useAddresses(authenticated!)
  const { data: shippingFee, isLoading: loadingFee } = useCalculateFee(authenticated!)
  const { data: userIdentifications } = useUserIdentifications()










  const form = validateOrder()

  async function PaymentAssas() {

    if (!addresses) {
      toast.error('Adicione um endereço de entrega antes de prosseguir com o pagamento.');
      return;
    }


    if (!userIdentifications?.data.userCpf || !userIdentifications?.data.firstName || !userIdentifications?.data.lastName) {
      toast.error('Adicione seus dados de identificação antes de prosseguir com o pagamento.');
      return;
    }

    if (!shippingFee?.data || shippingFee?.data.length === 0) {
      toast.error('Não foi possível calcular o frete. Verifique seu endereço e tente novamente.');
      return;
    }

    if (!addresses || addresses.userAddresses!.length === 0) {
      toast.error('Adicione um endereço de entrega antes de prosseguir com o pagamento.');
      return;
    }

    try {
      const response = await api.post("/api/orders/create-asaas", {
        items: cart,
        shippingAddress: {
          street: addresses.userAddresses![0]!.street,
          city: addresses.userAddresses![0].city,
          state: addresses.userAddresses![0]!.state,
          zipCode: addresses.userAddresses![0]!.zipCode,
          country: addresses.userAddresses![0]!.country,
          number: addresses.userAddresses![0]!.number,
          phone: addresses.userAddresses![0]!.phone
        },
        paymentMethod: "asaas"

      })

      alert("Pedido criado com sucesso! Você será redirecionado para a página de pagamento.")

      if (response.data.success) {
        const { checkoutUrl } = response.data;
        window.location.replace(checkoutUrl);
      }

    }
    catch (error) {
      toast.error('Erro ao criar pedido. Tente novamente.');
    }


  }

  async function Payment() {

    if (!addresses) {
      toast.error('Adicione um endereço de entrega antes de prosseguir com o pagamento.');
      return;
    }

    if (addresses.userAddresses!.length === 0) {
      toast.error('Adicione um endereço de entrega antes de prosseguir com o pagamento.');
      return;
    }

    try {
      const response = await api.post("/api/orders/create-stripe", {
        items: cart,
        shippingAddress: {
          street: addresses.userAddresses![0]!.street,
          city: addresses.userAddresses![0].city,
          state: addresses.userAddresses![0]!.state,
          zipCode: addresses.userAddresses![0]!.zipCode,
          country: addresses.userAddresses![0]!.country
        },
        paymentMethod: "stripe"

      })

      if (response.data.success) {
        const { sessionUrl } = response.data;
        window.location.replace(sessionUrl);
      }

    }
    catch (error) {
      toast.error('Erro ao criar pedido. Tente novamente.');
    }


  }


  async function onSubmit(data: ZodOrderTypes) {
    if (!authenticated) {
      toast.error('Usuário não autenticado. Faça login para adicionar um endereço.');
      return;
    }



    try {
      const responseMutateAddress = await mutateAddress.mutateAsync({
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
        phone: data.phone,
        number: data.number
      })

      if (!responseMutateAddress.success) {
        toast.error(responseMutateAddress.message || 'Erro ao adicionar endereço. Tente novamente.');
        return;
      }
      toast.success(responseMutateAddress.message || 'Endereço adicionado com sucesso!')




    }

    catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao adicionar endereço. Tente novamente.');
    }

  }




  return (
    <div className="flex bg-r w-full flex-col lg:flex-row lg:justify-center mx-auto">
      <AddressComponent
        addresses={addresses!}
        isLoading={isLoading}
        loadingFee={loadingFee}
        error={error}
        form={form}
        onSubmit={onSubmit}
        mutateAddress={mutateAddress}
        fretes={shippingFee?.data}
        userIdentifications={userIdentifications?.data}

      />


      <div className="flex flex-col justify-center items-center mx-auto items w-full max-w-[500px]">
        <CartTotal />

        <div className="flex flex-col gap-4 ">
        </div>

        <div className="w-full mt-10 flex justify-center">
          <button onClick={() => PaymentAssas()} type="submit" className="px-8 py-3 w-6/12 max-w-[300px] text-center rounded bg-black text-white text-xl">Pagar</button>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder