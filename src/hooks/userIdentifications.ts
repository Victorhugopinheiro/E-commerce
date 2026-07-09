import { useQuery } from "@tanstack/react-query"
import api from "@/service/api"

export interface UserIdentification {
    _id: string;
    userId: string;
    userCpf: string;
    firstName: string;
    lastName: string;
}

// For API responses
export interface GetUserIdentificationResponse {
    success: boolean;
    data: UserIdentification;
    message?: string;
}

// For validation/input
export interface CreateUserIdentificationInput {
    userCpf?: string;
    firstName?: string;
    lastName?: string;
}


export function useUserIdentifications() {


    return useQuery({
        queryKey: ['userIdentifications'],
        queryFn: async () => {
            try {
                const response = await api.get("/api/users/identification",)
                if (response.status === 200) {
                    return {
                        data: response.data.data as UserIdentification,
                        success: response.data.success as boolean,
                        message: response.data.message as string | undefined
                    }
                }



            } catch (error) {
                throw new Error('Failed to fetch user identifications. Please try again later.');
            }
        }
    })
}