import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function useLogin(closedialog: (value: boolean) => void, setUserSeted: React.Dispatch<React.SetStateAction<boolean>>) {
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
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
            } else {
                console.log('Failed to create user');
            }
        },
        onError: errorResponse => console.log(errorResponse),
    });

    return { googleLogin }
}