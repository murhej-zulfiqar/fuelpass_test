import nookies from "nookies";
import {jwtDecode} from "jwt-decode";
import {Token} from "@/interfaces/common";

export const getTokenParts =  () => {
    const token =  getCookie("authToken");
    if (!token) {
        return null;
    }
    const decodedToken: Token = jwtDecode(token);
    if(decodedToken.exp && (new Date().getTime() - (decodedToken.exp* 1000)  <= 0)){
        return decodedToken
    }
    return null
}


export const setCookie  =  (cookieName:string, cookieValue: string, cookieExpiration: number)=> {
    const cookieStore = nookies.get()
    if(cookieStore[cookieName] !== undefined) {
        nookies.destroy(null, cookieName)
    }
    nookies.set(null, cookieName,cookieValue, {maxAge: cookieExpiration, path: '/'})
}

export const getCookie  =  (cookieName: string) => {
    const cookiesStore = nookies.get()
    const cookieValue = cookiesStore[cookieName]
    if(!cookieValue){
        return null;
    }
    return cookieValue
}

export const logout   =  () => {
    const cookieStore = nookies.get()
    if(cookieStore["authToken"] !== undefined) {
        nookies.destroy(null, "authToken")
    }
}