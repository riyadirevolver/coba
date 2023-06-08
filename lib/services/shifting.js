import ServiceAdapter from ".";

// get shifting
export async function getShifting(company_id, token) {
    const {data}  = await ServiceAdapter().get(
        `/shifting?company_id=${company_id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
   
    return data;
}

// add shifting
export const AddShifting = async (data,company_id, token) => {
    const { data: response } = await ServiceAdapter().post(`/shifting?company_id=${company_id}`, data,{
        headers:{
            Authorization: `Bearer ${token} `,
        }
    });
    return response;
};

// edit shifting
export const updateShifting = async (id, data, token) => {
    const { data: response } = await ServiceAdapter().patch(
        `/shifting/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
};

export const deleteShifting = async (id, token) => {
    const { data: response } = await ServiceAdapter().delete(
        `/shifting/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
};
