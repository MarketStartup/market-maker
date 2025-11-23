import AboutUs from '@/components/about/aboutUs';
import MissionVision from '@/components/about/missionVision';
import Team from '@/components/about/team';
import ContactFormWrapper from '@/components/contact/contactUsWrapper';
import CourseListing from '@/components/course/courseListing';
import Feature from '@/components/home/feature';
import HomeBanner from '@/components/home/homeBanner';
import WhyChooseUs from '@/components/home/whyChooseUs';
import Banner from '@/components/shared/banner';
import Faq from '@/components/shared/faq';
import PromoBanner from '@/components/shared/promoBanner';

export default function BlockRenderer(block: any) {
   switch (block.blockType) {
      case "homeBanner":
         return <HomeBanner props={block} />;
      case "banner":
         return <Banner props={block} />;
      case "promoBanner":
         return <PromoBanner props={block} />;
      case "feature":
         return <Feature props={block} />;
      case "whyChooseUs":
         return <WhyChooseUs props={block} />;
      case "faq":
         return <Faq props={block} />;
      case "aboutUs":
         return <AboutUs props={block} />;
      case "missionVision":
         return <MissionVision props={block} />;
      case "team":
         return <Team props={block} />;
      case "contactForm":
         return <ContactFormWrapper />;
      case "courseListing":
         return <CourseListing />;
      default:
         return null;
   }
}
