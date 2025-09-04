



import { useMutation, useQueryClient } from '@tanstack/react-query';
import {loginApi} from "@/api";
import type {AxiosResponse} from "axios";
import {Order, OrderBasicInfo} from "@/interfaces/orders";
import {LoginRequest, User} from "@/interfaces/users";
import {jwtDecode} from "jwt-decode";
import {useRouter} from "next/navigation";
import {setCookie} from "@/utils/authUtil";
import {Token} from "@/interfaces/common";
import {BasicRoles} from "@/constants";
import {setTokenHeader} from "@/api/instance";
import {Bounce, toast} from "react-toastify";
import {showToast} from "@/utils/toasts";

/**
 * A hook to login the user and generate the user token in the backend and store it in the cookie
 * then redirects the user to the authorized page depending on the role
 */
export const useLogin =  () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation<AxiosResponse<User>, Error, LoginRequest>({
        mutationFn: loginApi,
        onSuccess: (data) => {
            showToast("Logged in successfully!");
            const decodedToken: Token = jwtDecode(data.data.token);
            setCookie("authToken", data.data.token, decodedToken.exp || 24 * 60 * 60 *1000)
            setTokenHeader(data.data.token)
            switch (decodedToken.role.canonicalName) {
                case BasicRoles.AIRCRAFT_OPERATOR:
                    router.push("/orders/request");
                    break;
                case BasicRoles.OPERATIONS_MANAGER:
                    router.push("/orders");
                    break;
            }
            queryClient.invalidateQueries({queryKey: ['currentUser']});
        },
        onError: (error) => {
            const message = error.message || "Failed to login";
            showToast(message,"error");
            console.log(error);
        }
    });
}