import * as yup from "yup";

export const RegisterUser = yup
    .object({
        fullName: yup.string().required(),
        email: yup.string().email().required(),
        companyName: yup.string().required(),
        nik: yup.string().required(),
        jobLevel: yup.string().required(),
        employeeType: yup.string().required(),
        departemen: yup.string().required(),
        locationPoint: yup.string().required(),
        industry: yup.string().required(),
    })
    .required();
