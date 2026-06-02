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

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { type FinalData, type ShippingQuote } from "@/hooks/useCalculateFee"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import type { UseAddressesResult } from "@/hooks/UseAddressesHook"
import { ShowAddressComponent } from "./showAddressComponent"
import { useContext, useState } from "react"
import { toast } from "react-toastify"
import api from '@/service/api'
import { AuthContext } from "@/context/authContext"
import { useQueryClient } from "@tanstack/react-query"
import { ShopContext } from "@/context/ShopContext"

export type AddAddressComponentProps = {
    addresses?: UseAddressesResult | null
}

export const SelectAddressComponent = ({ addresses }: AddAddressComponentProps) => {

    const { token } = useContext(AuthContext)!
    const { setFee } = useContext(ShopContext)!

    const queryClient = useQueryClient()

    const shippingFee = queryClient.getQueryData(['calculateFee', token]) as FinalData

    const [openAddAddress, setOpenAddAddress] = useState(false)
    const [openSelectAddressDialog, setSelectAddressDialog] = useState(false)

    function handlingDialogsStates(openAddAddressState: boolean, openSelectAddressDialogState: boolean) {

        setOpenAddAddress(openAddAddressState)
        setSelectAddressDialog(openSelectAddressDialogState)

    }

    async function handleSelectAddress(idAddress: string, index?: number) {

        const findIndex = addresses?.userAddresses!.findIndex((address) => address._id === idAddress)

        if (findIndex === undefined || findIndex < 0) {
            toast.error("Endereço não encontrado.")
            return
        }

        try {

            const response = await api.post(`/api/address/changePrimaryAddress/${idAddress}`, {

            }, { headers: { Authorization: `Bearer ${token}` } })

            const findindex = addresses?.userAddresses!.findIndex((address) => address._id === idAddress)


            if (response.status === 200) {
                toast.success("Endereço selecionado com sucesso!")
                queryClient.invalidateQueries({ queryKey: ['addresses', token] })
                queryClient.invalidateQueries({ queryKey: ['calculateFee'] })
                const findLocalStorageFrete = localStorage.getItem("selectedShipping")
                const formatedFindLocalStorageFrete:ShippingQuote = findLocalStorageFrete ? JSON.parse(findLocalStorageFrete) : null
        
                setFee(formatedFindLocalStorageFrete.price ?? shippingFee?.data[1].price)
                return


            } else {
                toast.error("Erro ao selecionar endereço.")
            }



        } catch (error) {
            toast.error("Erro ao selecionar endereço.")
        }


    }


    return (
        <Card className="w-full ">
            <CardHeader>
                <CardTitle>Endereço de entrega encontrado.</CardTitle>
                <CardDescription className="flex"></CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 items-center">

                    {addresses && addresses.userAddresses!.length > 0 && addresses.userAddresses!.map((address) => {
                        if (address.isPrimary) {
                            return (
                                <div key={address._id} className="flex flex-col">
                                    <span>{address.street}, {address.city}, {address.state}, {address.zipCode}</span>

                                </div>
                            )
                        }
                    })}

                    <span className="text-sm -foreground border text-orange-400 border-orange-400 w-fit p-1 rounded">
                        Padrão
                    </span>
                </div>



                <Dialog open={openSelectAddressDialog} onOpenChange={(open) => setSelectAddressDialog(open)}>
                    <form>
                        <DialogTrigger asChild>
                            <Button variant="outline">Trocar</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-8/12 sm:max-h-8/12 md:max-w-6/12 md:max-h-6/12 ">
                            <DialogHeader className="border-b p-1">
                                <DialogTitle>Escolha um endereço</DialogTitle>
                                <DialogDescription>
                                    Selecione um endereço para entrega.
                                </DialogDescription>
                            </DialogHeader>
                            <RadioGroup onValueChange={(value) => handleSelectAddress(value)} defaultValue={`${0}`} className="w-fit">
                                <div className="flex flex-col  gap-3">

                                    <div className="flex items-center gap-3">
                                        <span className="text-sm border-r pr-2">
                                            {addresses?.userInfo.name}
                                        </span>

                                        <span>
                                            {addresses?.userInfo.phone}
                                        </span>
                                    </div>

                                    {addresses?.userAddresses!.map((address, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <RadioGroupItem value={`${address._id}`} id="r1" />
                                            <Label className="" htmlFor="r1">
                                                <div className="flex flex-row gap-0.5">
                                                    <span>{address!.street},</span>
                                                    <span> {address!.city},</span>
                                                    <span>{address.state},</span>
                                                    <span>{address.zipCode}</span>
                                                </div>
                                            </Label>
                                        </div>
                                    )).splice(0, 4)}

                                </div>
                            </RadioGroup>




                            <Button onClick={() => handlingDialogsStates(true, false)} variant="outline">Adicionar novo endereço</Button>






                        </DialogContent>
                    </form>
                </Dialog>



                {openAddAddress && (
                    <Dialog open={openAddAddress} onOpenChange={(open) => setOpenAddAddress(open)}>

                        <DialogContent>
                            <DialogTitle>Adicionar novo endereço</DialogTitle>
                            <DialogDescription>
                                Preencha os campos para adicionar um novo endereço.
                            </DialogDescription>

                            <DialogContent className="sm:max-w-10/12 lg:max-w-6/12  ">
                                <ShowAddressComponent handlingDialogsStates={handlingDialogsStates} />
                            </DialogContent>
                        </DialogContent>
                    </Dialog>
                )}

            </CardContent>
        </Card>
    )
}