import * as yup from'yup'

export const departementSettingValidatation = yup.object({
	selfie:yup.boolean(),
	jobDepartemenId:yup.string().uuid().required()
})