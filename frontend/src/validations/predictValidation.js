import * as Yup from "yup";

export const predictInitialValues = {
  area: "",
  bedrooms: "",
  bathrooms: "",
  stories: "",
  mainroad: "yes", // Varsayılan olarak "yes"
  guestroom: "yes",
  basement: "yes",
  hotwaterheating: "yes",
  airconditioning: "yes",
  parking: "",
  prefarea: "yes", // Varsayılan olarak "yes"
  furnishingstatus: "furnished",
};

export const predictValidationSchema = Yup.object({});
