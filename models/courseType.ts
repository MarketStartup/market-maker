export interface CourseType {
   id: string
   title: string
   slug: string
   description: string
   image: {
      url: string
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
         url: string
         alt: string
      }
   }
   thisCourseIncludes: {
      id: string
      title: string
   }[]
   whatYouLearnPoints: {
      id: string
      title: string
   }[]
   skills: {
      id: string
      title: string
   }[]
   curriculums: {
      id: string
      sectionTitle: string
      lessons: {
         id: string
         lessonTitle: string
         lessonDuration: string
      }[]
   }[]
   reviews: CourseReviewType[]
   batches: {
      docs: CourseBatchType[]
   },
   updatedAt: string
}
export interface CourseReviewType {
   id: string
   rating: string
   reviewer: string
   review: string
}

export interface CourseBatchType {
   id: string;
   name: string;
   startDate: string;
   endDate: string;
}