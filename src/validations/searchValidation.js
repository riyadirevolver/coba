import * as Yup from "yup";

const searchValidation = Yup.object().shape({
  search: Yup.string().nullable(true),
});

export default searchValidation;
