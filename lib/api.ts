import { CacheConstant } from "./constants";

export const getPageData = async (slug: string) => {
   try {
      const url = new URL(`${process.env.NEXT_PUBLIC_CMS_URL}/api/pages?where[slug][equals]=${slug}`);
      const response = await fetch(url, {
         next: {
            revalidate: Number.parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || "0"),
            tags: [CacheConstant.revalidateTag]
         }
      });
      const res = await response.json();
      return res?.docs[0];
   } catch (error) {
      console.error(error);
      throw error;
   }
};