



import { useMutation, useQueryClient } from '@tanstack/react-query';
import {loginApi} from "@/api";
import type {AxiosResponse} from "axios";
import {Order, OrderBasicInfo} from "@/interfaces/orders";
import {LoginRequest, User} from "@/interfaces/users";
import {jwtDecode} from "jwt-decode";
import {useRouter} from "next/navigation";

export const useLogin =  () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation<AxiosResponse<User>, Error, LoginRequest>({
        mutationFn: loginApi,
        onSuccess: (data) => {
            localStorage.setItem("token", data.data.token);
            const decodedToken:{role: string} = jwtDecode(data.data.token);

            switch (decodedToken.role) {
                case "aircraft_operator":
                    router.push("/orders/request");
                    break;
                case "operations_manager":
                    router.push("/orders");
                    break;
            }
            queryClient.invalidateQueries({queryKey: ['currentUser']});
        },
    });
}