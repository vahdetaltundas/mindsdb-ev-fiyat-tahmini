import { verifyJwtToken } from "@/utils/verifyJwtToken";
import { useRouter } from "next/router";

import React from "react";

const HomeComponent = ({ signInChech }) => {
  const router = useRouter();
  return (
    <div id="hero">
      <video autoPlay loop muted>
        <source src="/videos/video.mp4" />
      </video>
      <div className="content">
        <div className="container mx-auto">
          <h1 className="text-7xl mb-5 font-bold text-gray-100">
            Makine Öğrenmesi ile Ev Fiyatı Tahmini
          </h1>
          <h2 className="text-3xl text-gray-100">
            Siz ihtiyaçlarınız girin biz size fiyatı verelim
          </h2>
          {!signInChech ? (
            <button
              onClick={() => router.push("/auth/login")}
              className="text-white bg-gradient-to-br w-1/4 from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-base px-5 py-2.5 m-10"
            >
              Sign in
            </button>
          ) : (
            <button
              onClick={() => router.push("/predict")}
              className="text-white bg-gradient-to-br w-1/4 from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-base px-5 py-2.5 m-10"
            >
              Predict Page
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
