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
    street: z.string().min(1, "A rua é obrigatória"),
    number: z.string().min(1, "O número da casa é obrigatório"),
    city: z.string().min(1, "A cidade é obrigatória"),
    state: z.string().min(1, "O estado é obrigatório"),
    zipCode: z.string().min(1, "O CEP é obrigatório"),
    country: z.string().min(1, "O país é obrigatório"),
    phone: z.string().min(1, "O telefone é obrigatório"),

})

export type AddAddressType = z.infer<typeof formSchama>

export function AddAddress() {
    return useForm<AddAddressType>({
        resolver: zodResolver(formSchama),
        defaultValues: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            phone: '',
            number: ''
        }
    })
}
