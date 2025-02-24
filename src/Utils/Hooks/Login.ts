import { useMyContext } from "@/context/CodeAgeContext";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function useLogin(closedialog:(value: boolean) => void){
    const {loginLoading,setLoginLoading} = useMyContext();
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setLoginLoading(true);
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer' + tokenResponse?.access_token } },
            );
            closedialog(false);
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo.data),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user', JSON.stringify(data.data));
                window.location.reload();
                setLoginLoading(false);
            }else{
                console.log('Failed to create user');
                setLoginLoading(false);
            }
        },
        onError: errorResponse => console.log(errorResponse),
    });

    return {googleLogin}
}