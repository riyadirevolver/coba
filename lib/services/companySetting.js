import ServiceAdapter from ".";

export async function getCompanySetting(company_id, token) {
    const { data } = await ServiceAdapter().get(
        `/company-setting?company_id=${company_id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data;
}
export async function addCompanySetting(payload, token) {
    const { data } = await ServiceAdapter().post("/company-setting", payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}
export async function updateCompanySetting(id, payload, token) {
    const { data } = await ServiceAdapter().patch(
        `/company-setting/${id}`,
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data;
}
export async function deleteCompanySetting(id, token) {
    const { data } = await ServiceAdapter().delete(`/company-setting/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}
