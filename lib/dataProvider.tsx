import dynamic from 'next/dynamic';

import { CourseType } from '@/models/courseType';

const AboutUs = dynamic(() => import('@/components/about/aboutUs'));
const MissionVision = dynamic(() => import('@/components/about/missionVision'));
const Team = dynamic(() => import('@/components/about/team'));
const ContactFormWrapper = dynamic(() => import('@/components/contact/contactUsWrapper'));
const CourseListing = dynamic(() => import('@/components/course/courseListing'));
const Feature = dynamic(() => import('@/components/home/feature'));
const HomeBanner = dynamic(() => import('@/components/home/homeBanner'));
const WhyChooseUs = dynamic(() => import('@/components/home/whyChooseUs'));
const Banner = dynamic(() => import('@/components/shared/banner'));
const Faq = dynamic(() => import('@/components/shared/faq'));
const PromoBanner = dynamic(() => import('@/components/shared/promoBanner'));
const CourseDetailBanner = dynamic(() => import('@/components/course/courseDetailBanner'));
const CourseDetail = dynamic(() => import('@/components/course/courseDetail'));

export default function BlockRenderer(slug: string, block: any, course?: CourseType) {
   switch (block.blockType) {
      case "homeBanner":
         return <HomeBanner props={block} />;
      case "banner":
         return <Banner props={block} />;
      case "courseDetailBanner":
         return <CourseDetailBanner slug={slug} course={course} />;
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
         return <CourseListing slug={slug} />;
      case "courseDetail":
         return <CourseDetail course={course} />;
      default:
         return null;
   }
}
