export interface CourseType {
   id: string
   title: string
   slug: string
   description: string
   image: {
      url: string,
      alt: string
   }
   rating: number
   review: number
   student: number
   price: number
   comparePrice: number
   category: string
   duration: string
   level: string
   instructor: {
      name: string
      bio: string
      image?: {
         url: string,
         alt: string
      }
   }
   whatYouLearnPoints: {
      id: string
      title: string
   }[]
   skills: {
      id: string
      title: string
   }[]
   reviews: CourseReviewType[]
}
export interface CourseReviewType {
   id: string
   rating: string
   reviewer: string
   review: string
}