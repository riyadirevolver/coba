import * as yup from "yup";

export const companyForm = yup
    .object({
        fullName: yup.string().required(),
        email: yup.string().email().required(),
        companyName: yup.string().required(),
        industry: yup.string().required(),
    })
    .required();
export const editCompanyForm = yup
    .object({
        companyName: yup.string().required(),
        industry: yup.string().required(),
    })
    .required();
