import { adminInstance } from "../config/axiosConfig";

export const getStudents = async () => {
    try {
        const response = await adminInstance.get("/student");
        return response.data;
    } catch (error) {
        console.error("Login API error:", error);
        throw error;
    }
};

export const editStudent = async (studentId, data) => {
    try {
        const response = await adminInstance.put(`/student/${studentId}`, data);
        return response.data;
    } catch (error) {
        console.error("Login API error:", error);
        throw error;
    }
};

export const addStudent = async (formData) => {
    try {
        const response = await adminInstance.post(`/student`, formData);
        return response.data;
    } catch (error) {
        console.error("Login API error:", error);
        throw error;
    }
};

export const deleteStudent = async (studentId) => {
    try {
        const response = await adminInstance.delete(`/student/${studentId}`);
        return response.data;
    } catch (error) {
        console.error("Login API error:", error);
        throw error;
    }
};

export const getConfessionGroups = async () => {
    try {
        const response = await adminInstance.get("/confession-group");
        return response.data;
    } catch (error) {
        console.error("Getting confession group API error:", error);
        throw error;
    }
};

export const createConfessionGroup = async (data) => {
    console.log(data);
    try {
        const response = await adminInstance.post("/confession-group", data);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Create confession group API error:", error);
        throw error;
    }
};
export const updateConfessionGroup = async (groupId, data) => {
    try {
        const response = await adminInstance.put(`/confession-group/${groupId}`, data);
        return response.data;
    } catch (error) {
        console.error("update confession group API error:", error);
        throw error;
    }
};
export const deleteConfessionGroup = async (groupId) => {
    try {
        const response = await adminInstance.delete(`/confession-group/${groupId}`);
        return response.data;
    } catch (error) {
        console.error("delete confession group API error:", error);
        throw error;
    }
};
