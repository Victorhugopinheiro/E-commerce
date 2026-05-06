import { useContext, useEffect, useState } from "react"
import { assets } from "../assets/assets"
import CartTotal from "../components/cart/CartTotal"
import InputComponent from "../components/PlaceOrder/InputComponent"
import Tittle from "../components/Tittle"

import api from "../service/api"
import { AuthContext } from "../context/authContext"
import { ShopContext } from "../context/ShopContext"
import { toast } from "react-toastify"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Controller } from "react-hook-form"
import { validateOrder, type ZodOrderTypes } from "@/types/zodTypes/orderType"
import type { AddressType } from "@/types/addressType"
import { set } from "zod"


function PlaceOrder() {

  const [addresses, setAddresses] = useState<AddressType | null>(null)



  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  const { token, user } = useContext(AuthContext)!
  const { cart } = useContext(ShopContext)!



  useEffect(() => {

    if (!token) return

    async function fetchAddress() {
      try {
        const response = await api.get("/api/users/userDetails", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.data.userAddresses && response.data.userAddresses.length > 0) {
          console.log("User details response:", response.data.userAddresses);
          setAddresses(response.data.addresses?.[0] ?? null)

        }

      }
      catch (error) {
        console.error("Error fetching address:", error);
        toast.error('Erro ao buscar endereço. Tente novamente.');
      }
    }

    fetchAddress()




  }, [token])



  const form = validateOrder()

  async function Payment() {

    if (!addresses) {
      toast.error('Adicione um endereço de entrega antes de prosseguir com o pagamento.');
      return;
    }

    try {
      const response = await api.post("/api/orders/create-stripe", {
        items: cart,
        shippingAddress: {
          street: addresses!.street,
          city: addresses!.city,
          state: addresses!.state,
          zipCode: addresses!.zipCode,
          country: addresses!.country
        },
        paymentMethod: "stripe"

      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.data.success) {
        const { sessionUrl } = response.data;
        window.location.replace(sessionUrl);
      }

    }
    catch (error) {
      console.error("Error creating order:", error);
      toast.error('Erro ao criar pedido. Tente novamente.');
    }


  }


  async function onSubmit(data: ZodOrderTypes) {

    console.log('Dados do formulário:', data);

    try {

      const addAddressResponse = await api.post("/api/address/addAddress", {
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
        phone: data.phone
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (addAddressResponse.data.success) {
        setAddresses({
          street: data.street,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
          phone: data.phone
        })



        toast.success('Endereço adicionado com sucesso!')
      } else {
        toast.error('Erro ao adicionar endereço. Tente novamente.')
        return;
      }





    }

    catch (error: any) {
      console.error("Error adding address:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Erro ao adicionar endereço. Tente novamente.');
    }

  }


  async function addAddress({ city, country, phone, state, street, zipCode }: AddressType) {

    const response = await api.post("/api/address/addAddress", {
      street,
      city,
      state,
      zipCode,
      country,
      phone,

    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.data.success) {
      toast.success('Endereço adicionado com sucesso!')
    } else {
      toast.error('Erro ao adicionar endereço. Tente novamente.')
    }
  }

  return (
    <div className="flex bg-r flex-col lg:flex-row  lg:justify-center mx-auto">

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-6/12 flex-col lg:flex-row lg:justify-around lg:items-center">



        <div className="max-w-[600px] gap-2 flex flex-col justify-center items-center mx-auto">

          <Tittle title1="INFORMAÇÕES" title2="DE ENTREGA" />


          <div className="flex flex-row gap-2 w-full">
            <FieldGroup className="flex flex-row">
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Nome</FieldLabel>
                    <Input
                      className="h-9"
                      {...field}
                      id="firstName"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite seu nome"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}


              />

              <Controller
                name="secondName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Sobrenome</FieldLabel>
                    <Input
                      className="h-9"
                      {...field}
                      id="secondName"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite seu sobrenome"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}


              />





            </FieldGroup>


          </div>


          <FieldGroup className="">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    className="h-9"
                    {...field}
                    id="input-demo-disabled"
                    type="email"
                    placeholder="Email"

                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}


            />


            <Controller
              name="street"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Rua</FieldLabel>
                  <Input
                    className="h-9"
                    {...field}
                    id="input-demo-disabled"
                    type="text"
                    placeholder="Rua"

                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}


            />


            <div className="flex gap-2">
              <Controller
                name="city"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Cidade</FieldLabel>
                    <Input
                      className="h-9"
                      {...field}
                      id="input-demo-disabled"
                      type="text"
                      placeholder="Cidade"

                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}


              />


              <Controller
                name="state"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Estado</FieldLabel>
                    <Input
                      className="h-9"
                      {...field}
                      id="input-demo-disabled"
                      type="text"
                      placeholder="Estado"

                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}


              />



            </div>


            <div className="flex gap-2">
              <Controller
                name="zipCode"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>CEP</FieldLabel>
                    <Input
                      className="h-9"
                      {...field}
                      id="input-demo-disabled"
                      type="text"
                      placeholder="CEP"

                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}


              />


              <Controller
                name="country"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Pais</FieldLabel>
                    <Input
                      className="h-9"
                      {...field}
                      id="input-demo-disabled"
                      type="text"
                      placeholder="Pais"

                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}


              />



            </div>




            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Telefone</FieldLabel>
                  <Input
                    className="h-9"
                    {...field}
                    id="input-demo-disabled"
                    type="text"
                    placeholder="Telefone"

                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}


            />


            <Button>Adicionar endereço</Button>



          </FieldGroup>



        </div>
      </form>


      <div className="flex flex-col justify-center items-center mx-auto items w-full max-w-[500px]">


        <CartTotal />


        <div className="flex flex-col gap-4 ">



        </div>

        <div className="w-full mt-10 flex justify-center">
          <button onClick={() => Payment()} type="submit" className="px-8 py-3 w-6/12 max-w-[300px] text-center rounded bg-black text-white text-xl">Pagar</button>
        </div>

      </div>




    </div>
  )
}

export default PlaceOrder