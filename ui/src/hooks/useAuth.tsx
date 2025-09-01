import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {jwtDecode} from "jwt-decode";


export const useAuth = (requiredRole: string) => {


    const [decodedToken, setDecodedToken] =  useState<{role: string}| null>(null)
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            router.push("/auth/login");
        }
        else{
             setDecodedToken(() => jwtDecode(token));
             if(decodedToken !== null && decodedToken?.role !== requiredRole){
                 router.push("/auth/login");
                 // todo add notification
             }

        }
    }, [requiredRole]);

    return {decodedToken};
}