import React from "react";
import { useState } from "react";
import styles from "../../styles/styles.module.css";
import axios from "axios";
import { useFormik } from "formik";
import {
  predictInitialValues,
  predictValidationSchema,
} from "@/validations/predictValidation";

const Predict = () => {
  const formik = useFormik({
    initialValues: predictInitialValues,
    validationSchema: predictValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}predict`,
          {
            area: values.area,
            bedrooms: values.bedrooms,
            bathrooms: values.bathrooms,
            stories: values.stories,
            mainroad: values.mainroad,
            guestroom: values.guestroom,
            basement: values.basement,
            hotwaterheating: values.hotwaterheating,
            airconditioning: values.airconditioning,
            parking: values.parking,
            prefarea: values.prefarea,
            furnishingstatus: "furnished",
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Tahmin yapılamadı:", error);

      }
    },
  });
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}></div>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <label>
          Alan:
          <input
            type="text"
            name="area"
            value={formik.values.area}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          Yatak Odası Sayısı:
          <input
            type="text"
            name="bedrooms"
            value={formik.values.bedrooms}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          Banyo Sayısı:
          <input
            type="text"
            name="bathrooms"
            value={formik.values.bathrooms}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          Kat Sayısı:
          <input
            type="text"
            name="stories"
            value={formik.values.stories}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          Ana Yol Üzerinde Mi?
          <select
            name="mainroad"
            value={formik.values.mainroad}
            onChange={formik.handleChange}
          >
            <option value="">Seçiniz</option>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
          </select>
        </label>
        <label>
          Misafir Odası Var Mı?
          <select
            name="guestroom"
            value={formik.values.guestroom}
            onChange={formik.handleChange}
          >
            <option value="">Seçiniz</option>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
          </select>
        </label>
        <label>
          Bodrum Var Mı?
          <select
            name="basement"
            value={formik.values.basement}
            onChange={formik.handleChange}
          >
            <option value="">Seçiniz</option>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
          </select>
        </label>
        <label>
          Sıcak Su Isıtma Var Mı?
          <select
            name="hotwaterheating"
            value={formik.values.hotwaterheating}
            onChange={formik.handleChange}
          >
            <option value="">Seçiniz</option>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
          </select>
        </label>
        <label>
          Klima Var Mı?
          <select
            name="airconditioning"
            value={formik.values.airconditioning}
            onChange={formik.handleChange}
          >
            <option value="">Seçiniz</option>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
          </select>
        </label>
        <label>
          Park Yeri Var Mı?
          <select
            name="parking"
            value={formik.values.parking}
            onChange={formik.handleChange}
          >
            <option value="">Seçiniz</option>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
          </select>
        </label>
        <label>
          Tercih Edilen Bölge?
          <select
            name="prefarea"
            value={formik.values.prefarea}
            onChange={formik.handleChange}
          >
            <option value="">Seçiniz</option>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
          </select>
        </label>
        <label>
          Mobilya Durumu?
          <select
            name="furnishingstatus"
            value={formik.values.furnishingstatus}
            onChange={formik.handleChange}
          >
            <option value="">Seçiniz</option>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
          </select>
        </label>
        <button className={styles.calculateButton} type="submit">
          Hesapla
        </button>
      </form>
    </div>
  );
};

export default Predict;
