import {Bounce, toast, ToastOptions} from "react-toastify";


export const showToast = (message: string, type: string = "success") =>{
    const options: ToastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    }
    console.log(message, type)
    if(type === 'success'){
        toast.success(message, options );
    }
    else if(type ==="error"){
        toast.error(message, options);
    }
}