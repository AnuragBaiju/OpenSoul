import { userInstance } from "../config/axiosConfig";

export const getConfessionGroups = async () => {
    try {
        const response = await userInstance.get("/confession-groups");
        return response.data;
    } catch (error) {
        console.error("Login API error:", error);
        throw error;
    }
};
