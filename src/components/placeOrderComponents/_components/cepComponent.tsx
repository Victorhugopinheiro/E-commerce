import { useCpfForm, type CpfTypeInterface } from "@/types/zodTypes/cpfForm";

import api from "@/service/api";
import { Controller } from "react-hook-form"
import { toast } from "react-toastify"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { type CreateUserIdentificationInput } from "@/hooks/userIdentifications"



export default function CepComponent({firstName, lastName, userCpf}:CreateUserIdentificationInput ) {

    const form = useCpfForm({userCpf: userCpf ?? '', firstName: firstName ?? '', lastName: lastName ?? ''})

    async function onSubmit(data: CpfTypeInterface) {
        

        const result = await api.post("/api/users/cpf/validate", {
            userCpf: data.cpf,
            firstName: data.firstName,
            lastName: data.lastName
        })

        if(result.data.success) {
            toast.success("CPF validado com sucesso!")
        }

        if(!result.data.success) {
            toast.error("Erro ao validar CPF. Verifique os dados e tente novamente.")
        }


    }

    return (
        <div className="w-full flex items-center justify-center">


            <Card className="w-full ">
                <CardHeader>
                    <CardTitle>Dados  de faturamento</CardTitle>
                    <CardDescription>
                        Dados emitidos na nota fiscal
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="cpf"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            CPF
                                        </FieldLabel>
                                        <Input
                                            required
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Digite seu CPF"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="firstName"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Nome
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
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
                                name="lastName"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Sobrenome
                                        </FieldLabel>

                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
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
                    </form>
                </CardContent>
                <CardFooter>
                    <Field orientation="horizontal">

                        <Button type="submit" form="form-rhf-demo">
                            Cadastrar
                        </Button>
                    </Field>
                </CardFooter>
            </Card>


        </div>
    )
}