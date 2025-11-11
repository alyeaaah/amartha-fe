import { clientEnv } from "@/env";
import { FooterComponent } from "@/components/Footer";
// import { PublicHeader } from "@/pages/Public/LandingPage/components/HeaderLandingPage";
import { Layout } from "antd";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import { PublicHeader } from "@/components/Header";

export const PublicLayout = () => {
  return (
    <>
      <Layout className="min-h-screen bg-white text-white public-page">
        {/* Top Navbar */}
        {/* {location.pathname != "" && location.pathname != "/" && location.pathname != clientEnv.BASENAME && <PublicHeader className="border-b-8 border-[#01548D] rounded-b-2xl shadow-2xl fixed w-full z-20 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-2 after:bg-[#007CAD] after:rounded-b-3xl" />} */}
        {location.pathname != "" && location.pathname != "/" && location.pathname != clientEnv.BASENAME && <PublicHeader className="rounded-b-2xl sticky" />}
        {/* <div className="h-24"></div> */}
        <Outlet />
        <FooterComponent className='bg-[#12002d] py-16 text-white' />
      </Layout>
    </>
  );
};
