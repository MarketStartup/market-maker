import { RichText } from "../richText"

export default function GeneralInformation({ props }: { props: any }) {

   return (
      <div className="container py-16">
         <RichText data={props.content} />
      </div>
   )
}
