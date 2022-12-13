// catchError getToken 
export const catchError = (error) => {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error} ;
};

export const getToken = () => localStorage.getItem('id_token');