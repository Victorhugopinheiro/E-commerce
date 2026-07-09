import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { type CreateUserIdentificationInput } from "@/hooks/userIdentifications"

export interface CpfTypeInterface {
    cpf: string;
    firstName: string;
    lastName: string;
}

const cpfFormSchema = z.object({
    cpf: z.string().min(11, "O CPF deve conter 11 dígitos").max(11, "O CPF deve conter 11 dígitos").refine((cpf) => {
        const cpfRegex = /^\d{11}$/
        return cpfRegex.test(cpf)
    }, "CPF deve conter apenas números"),
    firstName: z.string().min(1, "O nome é obrigatório"),
    lastName: z.string().min(1, "O sobrenome é obrigatório"),
})


export type CpfType = z.infer<typeof cpfFormSchema>

export function useCpfForm({firstName, lastName, userCpf}:CreateUserIdentificationInput) {
    return useForm<CpfType>({
        resolver: zodResolver(cpfFormSchema),
        defaultValues: {
            cpf: userCpf ?? '',
            firstName: firstName ?? '',
            lastName: lastName ?? ''
        }
    })
}

