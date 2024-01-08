import {
  loginInitialValues,
  loginValidationSchema,
} from "@/validations/loginValidation";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import cookie from "cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ErrorMessage from "@/components/errorMessage";
import { useSession, signIn, getSession} from "next-auth/react"

const index = () => {
  const {data:session}=useSession();
  const router = useRouter();
  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
          {
            email: values.email,
            password: values.password,
          }
        );
        document.cookie = cookie.serialize("authToken", response.data.token, {
          maxAge: 60 * 60 * 24, // Örnek: 1 gün
          path: "/", // Cookie'nin geçerli olacağı yol
        });
        toast.success("Login successful.");
        router.push("/");
      } catch (error) {
        console.error("Error: ", error);
        toast.error("Email or password is wrong.");
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
            <div className="flex flex-col items-center mx-auto">
              <Link href="/">
                <img className="w-48 h-40" src="/img/Logo.png" alt="logo" />
              </Link>
              <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl text-left font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Sign in to your account
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={formik.handleSubmit}
                  >
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
                      Sign in
                    </button>
                  </form>
                  <button
                  onClick={()=>signIn("github")}
                    type="button"
                    className="text-white w-full bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center me-2 mb-2"
                  >
                    <svg
                      className="w-4 h-4 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Sign in with Github
                  </button>
                  <p className="text-sm font-light text-gray-500">
                    Don’t have an account yet?{" "}
                    <Link
                      href="/auth/register"
                      className="font-medium text-primary-500 hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/predict",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
export default index;
