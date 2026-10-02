import axios from '../src/config/axios';

export const getTopUsers = async () => {
    try {
        let resp = await axios.get('/top-users')
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};


export const getAnalytics=async (api_key = '') => {
    try {
        let resp = await axios.get(`/analytics?api_key=${api_key}`);
        return resp.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getUserPlans = async () => {
    try {
        let resp = await axios.get('/user-plans')
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};