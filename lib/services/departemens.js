import ServiceAdapter from ".";

export async function getDepartemens(companyId, token) {
    const { data } = await ServiceAdapter().get(
        `/job-departements?company_id=${companyId}&$limit=100`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data;
}

export async function getDataDepartemens(token) {
    const { data } = await ServiceAdapter().get(
        "/job-departements?$limit=100", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

// add departements
export const AddDepartements = async (data, token) => {
    const { data: response } = await ServiceAdapter().post("/job-departements", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

// edit departements
export const EditDepartements = async (id, data, token) => {
    const { data: response } = await ServiceAdapter().patch(
        `/job-departements/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    return response;
}

// delete departements
export const DeleteDepepartements = async (id, token) => {
    const { data: response } = await ServiceAdapter().delete(`/job-departements/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}
