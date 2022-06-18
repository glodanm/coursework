import instance from './AxiosConfig';

const api = {
    getItems() {
        return instance.get(`/stopwatch`);
    },
};

export default api;
