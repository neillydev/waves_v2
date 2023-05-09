const getAPI = () => {
    if(process.env.NODE_ENV === 'development') {
        return 'http://localhost:8022';
    }
    else if (process.env.NODE_ENV === 'production') {
        return 'http://localhost:8022';
    }
};

export default getAPI;