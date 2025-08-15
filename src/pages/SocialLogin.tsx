import { apiClient } from "@/shared/api/client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SocialLogin:React.FC = () => {
    const { provider } = useParams();
    const code = new URL(document.location.toString()).searchParams.get("code");

    useEffect(() => {
        if (!provider) {
            console.error('Provider not found in URL');
            return;
        }

        apiClient.post(`/public/social/${provider}`, {
            code: code
        }).then(res => {
            console.log('Social login response:', res);
            localStorage.setItem('accessToken', res.data.accessToken)
            localStorage.setItem('refreshToken', res.data.refreshToken)
            window.location.href = '/'
        }).catch(error => {
            console.error('Social login error:', error);
        });
    }, [code])

    return null
}

export default SocialLogin