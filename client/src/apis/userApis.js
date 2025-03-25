import { userInstance } from "../config/axiosConfig";

export const getConfessionGroups = async () => {
    try {
        const response = await userInstance.get("/other-groups");
        return response.data;
    } catch (error) {
        console.error("get confession groups API error:", error);
        throw error;
    }
};
export const getAllConfessionGroups = async () => {
    try {
        const response = await userInstance.get("/confession-groups");
        return response.data?.confessionGroups;
    } catch (error) {
        console.error("get confession groups API error:", error);
        throw error;
    }
};

export const joinGroup = async (groupId) => {
    try {
        const response = await userInstance.post(`/join-group/${groupId}`);
        return response.data;
    } catch (error) {
        console.error("join group API error:", error);
        throw error;
    }
};

export const getGroupById = async (groupId) => {
    try {
        const response = await userInstance.get(`/confession-groups/${groupId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("get group API error:", error);
        throw error;
    }
};

export const postConfession = async (groupId, text) => {
    try {
        const response = await userInstance.post(`/confession/${groupId}`, { text });
        return response.data;
    } catch (error) {
        console.error("post confession API error:", error);
        throw error;
    }
};

// post comment

export const postComment = async (confessionId, text) => {
    try {
        const response = await userInstance.post(`/confession/${confessionId}/comment`, { text });
        return response.data;
    } catch (error) {
        console.error("post comment API error:", error);
        throw error;
    }
};
