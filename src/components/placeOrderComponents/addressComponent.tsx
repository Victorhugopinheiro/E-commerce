import { Controller } from "react-hook-form"
import type { UseFormReturn } from "react-hook-form"
import { type ZodOrderTypes } from "@/types/zodTypes/orderType"
import Tittle from "../Tittle"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import type { AddressType } from "@/types/addressType"
import { SelectAddressComponent } from "./SelectAddressComponent"
import type { UseAddressesResult } from "@/hooks/UseAddressesHook"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import type { ShippingQuote } from "@/hooks/useCalculateFee"
import { toast } from "react-toastify"
import { useContext } from "react"
import { ShopContext } from "@/context/ShopContext"
interface AddressComponentProps {
  addresses: UseAddressesResult | null
  isLoading: boolean
  error: Error | null
  form: UseFormReturn<ZodOrderTypes>
  onSubmit: (data: ZodOrderTypes) => void
  mutateAddress: any
  fretes?: ShippingQuote[] | null
  loadingFee?: boolean
}

export default function AddressComponent({
  addresses,
  isLoading,
  error,
  form,
  onSubmit,
  mutateAddress,
  fretes,
  loadingFee
}: AddressComponentProps) {
  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>Erro ao carregar endereço: {error.message}</div>
  }

  const { setFee } = useContext(ShopContext)!

  function handleAddAddress(value: string | null) {

    if (!value) {
      toast.error("Selecione um endereço para calcular o frete")
      return
    }

    const findFrete = fretes?.find((frete) => frete.id === parseInt(value))

    if (!findFrete) {
      toast.error("Frete não encontrado")
      return
    }



    localStorage.setItem("selectedShipping", JSON.stringify(findFrete))
    console.log("6. localStorage saved:", localStorage.getItem("selectedShipping"))

    setFee(findFrete.price)



  }

  return (
    <div className="flex flex-col w-full justify-center items-center mx-auto ">
      <div className="flex w-full   lg:w-12/12 flex-col max-w-[400px] lg:flex-row lg:justify-around lg:items-center">

        {!addresses ? (
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
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
        ) : (
          <SelectAddressComponent addresses={addresses} />
        )}

      </div>

      <div className="w-full mt-10 flex justify-center">

        <Card size="sm" className="mx-auto w-full max-w-sm">
          <CardHeader>
            <CardTitle>Escolha seu envio</CardTitle>
            <CardDescription>
              Fretes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup onValueChange={(e) => handleAddAddress(e)} className="w-full">

              {loadingFee ? (
                <div>Calculando frete...</div>
              ) : (<>
              </>)}

              {fretes && fretes.length > 0 && fretes.map((frete, index) => {



                return (
                  <div key={frete.id} className="flex w-full items-center gap-3">
                    <RadioGroupItem value={`${frete.id}`} id="r3" />
                    <div className="flex text-gray-700 w-full justify-between items-center px-2 py-1 rounded">
                      <div className="flex flex-col  gap-2">
                        <Label className="" htmlFor="r3">{frete.name}</Label>
                        <span className="ml-2 text-sm ">
                          Receba em {frete.delivery_time} dias úteis
                        </span>
                      </div>
                      <span className="ml-2 text-sm ">
                        {frete.currency}{frete.price}
                      </span>
                    </div>
                  </div>
                )
              }).splice(0, 3)}
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              Action
            </Button>
          </CardFooter>
        </Card>


      </div>
    </div>
  )
}
