import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {getTokenParts} from "@/utils/authUtil";
import {Token} from "@/interfaces/common";

/**
 * A hook to check if the user logged in or not or if the token expired then redirects the user to login
 * @param requiredRole
 */
export const useAuth = (requiredRole: string) => {

    const [decodedToken, setDecodedToken] =  useState<Token| null>(null)
    const router = useRouter();
    useEffect(() => {

       const token = getTokenParts()
       setDecodedToken(() => token);
       if (!token) {
           router.push("/auth/login");
       }
       if (decodedToken !== null && decodedToken?.role.canonicalName !== requiredRole) {
           router.push("/auth/login");
       }

    }, [requiredRole]);

    return {decodedToken};
}