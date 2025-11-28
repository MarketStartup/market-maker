import { getPageBlocks } from "@/lib/dataLayer";
import BlockRenderer from "@/lib/dataProvider";
import { LayoutConstant } from "@/lib/constants";
import { notFound } from "next/navigation";

export default async function Home() {
   const { layout, blocks } = await getPageBlocks();
   if (layout === LayoutConstant.NOT_FOUND)
      return notFound();

   return (
      blocks.map((block: any, idx: number) =>
         <div key={idx}>
            {BlockRenderer('', block)}
         </div>
      )
   );
}
