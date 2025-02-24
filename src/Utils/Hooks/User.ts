import { useMyContext } from "@/context/CodeAgeContext";
import { useEffect } from "react";


export const useUser = () => {

    const {user,setUser,userSeted} = useMyContext();

    useEffect(() => {
        const getUser = async () => {
            const value = localStorage.getItem("user");
            if (value) {
                const { email, sub } = JSON.parse(value);
                try {
                    const response = await fetch(`/api/user?email=${email}&id=${sub}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUser(data.users);
                    } else {
                        console.error("User not found");
                    }
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            }
        };

        getUser();
    }, [userSeted]);

    return { user };
};