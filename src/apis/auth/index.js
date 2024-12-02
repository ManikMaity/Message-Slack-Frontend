import axios from "@/config/axios.config";

export async function signupRequest({username, email, password}) {
    try {
        const response = await axios.post("/user/signup", {
            username,
            email,
            password
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error.response.data;
    }
}

export async function signinRequest({email, password}) {
    try {
        const response = await axios.post("/user/signin", {
            email,
            password
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error.response.data;
    }
}