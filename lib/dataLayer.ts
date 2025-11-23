import { getPageData } from "./api";
import { LayoutConstant } from "./constants";

export async function getPageBlocks(slug?: string):
   Promise<{
      layout: string,
      metaTitle: string,
      metaDescription: string,
      blocks: any
   }> {
   const pageData = await getPageData(slug ? slug : '/');
   if (pageData)
      return {
         layout: LayoutConstant.PAGE,
         metaTitle: pageData.metaTitle,
         metaDescription: pageData.metaDescription,
         blocks: pageData.blocks
      }
   return {
      layout: LayoutConstant.NOT_FOUND,
      metaTitle: 'Page not found',
      metaDescription: '',
      blocks: []
   }
}
