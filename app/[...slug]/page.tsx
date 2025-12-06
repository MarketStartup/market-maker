import { getPageBlocks } from "@/lib/dataLayer";
import { LayoutConstant } from "@/lib/constants";
import { notFound } from "next/navigation";
import BlockRenderer from "@/lib/dataProvider";

const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL || 'http://localhost:3001'
type Props = {
   params: Promise<{ slug?: string[] }>,
};

export async function generateMetadata({ params }: Props) {
   const { slug: slugArray } = await params;
   const slug = slugArray?.[0] ?? '';
   const subSlug = slugArray?.[1] ?? '';

   const { metaTitle, metaDescription } = await getPageBlocks(slug, subSlug);
   const canonicalUrl = BASE_URL + slug

   return {
      title: metaTitle,
      description: metaDescription,
      alternates: {
         canonical: canonicalUrl
      },

      metadataBase: new URL(BASE_URL),
      openGraph: {
         title: metaTitle,
         description: metaDescription,
         url: canonicalUrl,
         siteName: 'Festive Treats | HDFC',
         type: 'website',
         locale: 'en',
         images: [
            {
               url: `${BASE_URL}/favicon.ico`,
               width: 1200,
               height: 630,
               alt: metaTitle,
            }
         ]
      },
   };
};

export default async function Page({ params }: Props) {
   const { slug: slugArray } = await params;
   const slug = slugArray?.[0] ?? '';
   const subSlug = slugArray?.[1] ?? '';

   const { layout, pageTitle, blocks, course } = await getPageBlocks(slug, subSlug);
   if (layout === LayoutConstant.NOT_FOUND)
      return notFound();

   return (
      blocks.map((block: any, idx: number) =>
         <div key={idx}>
            {BlockRenderer(slug, block, pageTitle, course)}
         </div>
      )
   );
}
