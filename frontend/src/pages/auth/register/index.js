import ErrorMessage from "@/components/errorMessage";
import {
  registerInitialValues,
  registerValidationSchema,
} from "@/validations/registerValidation";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const Register = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      try {
        const response=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/register`,{
          username : values.username,
          email : values.email,
          password: values.password
        })
        toast.success("Kayıt Başarılı.")
        router.push("/auth/login");
      } catch (error) {
        console.error("Error = ",error);
        toast.error("Kayıt olunamadı!");
      }
    },
  });

  return (
    <div id="hero">
      <video autoPlay loop muted>
        <source src="/videos/video.mp4" />
      </video>
      <div className="content">
        <div className="container">
          <section className="">
            <div className="flex flex-col items-center justify-center mx-auto">
              <Link href="/">
                <img className="w-48 h-40" src="/img/Logo.png" alt="logo" />
              </Link>
              <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl text-left font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Create your Free Account
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={formik.handleSubmit}
                  >
                    <div>
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-left text-gray-900"
                      >
                        Your username
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Vahdet Altundaş"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.username && formik.errors.username ? (
                        <ErrorMessage errorMessage={formik.errors.username} />
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-left text-gray-900"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="name@company.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <ErrorMessage errorMessage={formik.errors.email} />
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-left text-gray-900"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <ErrorMessage errorMessage={formik.errors.password} />
                      ) : null}
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Sign up
                    </button>
                    <p className="text-sm font-light text-left text-gray-500">
                      Already have an account?{"  "}
                      <Link
                        href="/auth/login"
                        className="font-medium text-primary-500 hover:underline"
                      >
                        Sign in here
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Register;
