import {redirect} from "next/navigation";
import {Token} from "@/interfaces/common";
import {BasicRoles} from "@/constants";
import {jwtDecode} from "jwt-decode";
import {cookies} from "next/headers";

// I used this page to redirect to the actual pages depending on token and role
export default async function Home() {

    const cookieStore = await cookies();
    const tokenString = cookieStore.get("authToken")?.value

    if(!tokenString){
        redirect("/auth/login")
    }
    const decodedToken: Token = jwtDecode(tokenString);
    if(!(decodedToken.exp && (new Date().getTime() - (decodedToken.exp* 1000)  <= 0))){
        redirect("/auth/login")
    }

    switch (decodedToken.role.canonicalName){
        case BasicRoles.OPERATIONS_MANAGER:
            redirect("/orders");
            break;
        case BasicRoles.AIRCRAFT_OPERATOR:
            redirect("/orders/request");
            break;
        default:
            redirect("/auth/login");
            break;
    }
}
