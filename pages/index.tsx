import { IBanner, IHomeSection } from "@types";
import axios from "axios";
import { server } from "configs/server";
import { LayoutPrimary } from "layouts/LayoutPrimary";
import { HomeBanner } from "modules/HomeBanner";
import { HomeSection } from "modules/HomeSection";
import { GetServerSidePropsContext } from "next";

interface HomePageProps {
  banners: IBanner[];
  homeSections: IHomeSection[];
}

const HomePage = ({ banners, homeSections }: HomePageProps) => {
  return (
    <LayoutPrimary>
      <HomeBanner banners={banners} />
      {homeSections.map((homeSection) => (
        <HomeSection key={homeSection.homeSectionId} homeSection={homeSection} />
      ))}
    </LayoutPrimary>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { data } = (await axios.get(`${server}/api/home`)).data;
  return {
    props: {
      banners: data.banners,
      homeSections: data.homeSections,
    },
  };
};

export default HomePage;
