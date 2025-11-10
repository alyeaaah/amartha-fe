import { IconLogo } from "@/assets/images/icons";
import { HTMLProps } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Typography, Menu } from 'antd';
import LayoutWrapper from "@/components/LayoutWrapper";

import { paths } from "@/router/paths";

import { useAtomValue } from "jotai";
import { userAtom } from "@/utils/store";
import Icon from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

interface LandingPageProps extends HTMLProps<HTMLDivElement> {
  className?: string;
  innerClassName?: string;
}

export const PublicHeader = ({ className, innerClassName }: LandingPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAtomValue(userAtom);

  const menuItems = [
    {
      key: paths.landingPage,
      label: <Link to={paths.landingPage}>Home</Link>,
    },
    {
      key: paths.aboutPage,
      label: <Link to={paths.aboutPage}>About</Link>,
    },
    {
      key: paths.animePage.index.template,
      label: <Link to={paths.animePage.index({}).$}>Anime</Link>,
    },
    {
      key: paths.loginPage,
      label: <Link to={paths.loginPage}>Login / Register</Link>,
    },
  ];
  if (user?.userStatus === 1) {
    navigate(paths.administrator.dashboard);
  }
  return (
    <Header className={`bg-[linear-gradient(to_right,#38144E,#92599D)] flex flex-col items-center h-24 ${className}`}>
      <LayoutWrapper className='h-full'>
        <div className={`border-white rounded-xl flex justify-between items-center h-full w-full px-4 ${innerClassName}`}>
          <Link to={paths.landingPage}>
            <Title level={3} className="!text-white !mb-0 flex flex-row">
              <IconLogo className="mr-2 w-32 h-16" />
            </Title>
          </Link>
          <div className="w-full ">
            <Menu
              overflowedIndicator={<Icon name="menu" />}
              className='bg-transparent font-light text-white text-sm flex justify-end items-center custom-menu border-none'
              mode="horizontal"
              defaultSelectedKeys={['/']}
              selectedKeys={[`/${location.pathname.split('/')[1]}`]}
              items={menuItems}
            />
          </div>
        </div>
      </LayoutWrapper>
    </Header>
  );
};