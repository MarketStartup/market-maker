import { CourseType } from "@/models/courseType";
import { getHomePageData, getCoursesData, getPageData } from "./api";
import { LayoutConstant } from "./constants";

export async function getPageBlocks(slug?: string, subSlug?: string):
   Promise<{
      layout: string,
      metaTitle: string,
      metaDescription: string,
      blocks: any,
      pageTitle?: string,
      course?: CourseType
   }> {
   if (!slug) {
      const homePageData = await getHomePageData();
      if (homePageData)
         return {
            layout: LayoutConstant.PAGE,
            metaTitle: homePageData.metaTitle,
            metaDescription: homePageData.metaDescription,
            blocks: homePageData.blocks
         }
      return {
         layout: LayoutConstant.NOT_FOUND,
         metaTitle: 'Page not found',
         metaDescription: '',
         blocks: []
      }
   }

   if (subSlug) {
      const course = await getCoursesData(subSlug);
      if (course.length > 0) {
         const pageData = await getPageData('', LayoutConstant.COURSE_DETAIL);
         if (pageData)
            return {
               layout: LayoutConstant.PAGE,
               metaTitle: pageData.metaTitle,
               metaDescription: pageData.metaDescription,
               blocks: pageData.blocks,
               course: course[0]
            }
         return {
            layout: LayoutConstant.NOT_FOUND,
            metaTitle: 'Page not found',
            metaDescription: '',
            blocks: []
         }
      }
      return {
         layout: LayoutConstant.NOT_FOUND,
         metaTitle: 'Page not found',
         metaDescription: '',
         blocks: []
      }
   }

   const pageData = await getPageData(slug ? slug : '/');
   if (pageData)
      return {
         layout: LayoutConstant.PAGE,
         metaTitle: pageData.metaTitle,
         metaDescription: pageData.metaDescription,
         blocks: pageData.blocks,
         pageTitle: pageData.title
      }
   return {
      layout: LayoutConstant.NOT_FOUND,
      metaTitle: 'Page not found',
      metaDescription: '',
      blocks: []
   }
}
