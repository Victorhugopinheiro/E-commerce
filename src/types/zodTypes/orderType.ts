import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";


export interface ZodOrderTypes {
    firstName: string;
    secondName: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    paymentMethod: string;

}

const formSchama = z.object({
    firstName: z.string().min(1, "O nome é obrigatório"),
    secondName: z.string().min(1, "O sobrenome é obrigatório"),
    email: z.string().min(1, "O email é obrigatório").email("Email inválido"),
    street: z.string().min(1, "A rua é obrigatória"),
    city: z.string().min(1, "A cidade é obrigatória"),
    state: z.string().min(1, "O estado é obrigatório"),
    zipCode: z.string().min(1, "O CEP é obrigatório"),
    country: z.string().min(1, "O país é obrigatório"),
    phone: z.string().min(1, "O telefone é obrigatório"),
    paymentMethod: z.string().min(1, "O método de pagamento é obrigatório")

})

export type orderProps = z.infer<typeof formSchama>


export function validateOrder() {
    return useForm<orderProps>({
        resolver: zodResolver(formSchama),
        defaultValues: {
            firstName: '',
            secondName: '',
            email: '',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            phone: '',
            paymentMethod:'stripe'
        }
    })
}
