
import { AddAddress, type AddAddressType } from "@/types/zodTypes/addAddressType"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Controller } from "react-hook-form"

import Tittle from "../Tittle"
import { FieldError, FieldGroup, } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { useMutateAddress } from "@/hooks/useMutateAddress"
import { useContext } from "react"
import { AuthContext } from "@/context/authContext"



interface ShowAddressComponentProps {
  handlingDialogsStates: (openAddAddressState: boolean, openSelectAddressDialogState: boolean) => void
}

export function ShowAddressComponent({ handlingDialogsStates }: ShowAddressComponentProps) {

  const { authenticated } = useContext(AuthContext)!

  const mutateAddress = useMutateAddress(authenticated ?? null)

  const form = AddAddress()


  async function onSubmit(data: AddAddressType) {
    try {
      await mutateAddress.mutateAsync({
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
        phone: data.phone,

      })

      if (mutateAddress.isSuccess) {
        toast.success('Endereço adicionado com sucesso!')
      }



    }

    catch (error: any) {
      console.error("Error adding address:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Erro ao adicionar endereço. Tente novamente.');
    }finally {
      handlingDialogsStates(false, true)
    }

  }



return (
  <div className="flex w-full justify-center items-center ">
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
      <div className="max-w-[600px] gap-2 flex flex-col justify-center items-center mx-auto">
        <Tittle title1="INFORMAÇÕES" title2="DE ENTREGA" />
       

        <FieldGroup className="">
          

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

          <div className="flex justify-between gap-2">
            <Button onClick={() => handlingDialogsStates(false, true)}>Cancelar</Button>
            <Button type="submit">Adicionar endereço</Button>
          </div>
        </FieldGroup>
      </div>
    </form>
  </div>
)
}
