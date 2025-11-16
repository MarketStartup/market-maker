export interface CourseType {
   id: string
   title: string
   description: string
   category: string
   price: number
   image: string
   instructor: string
   rating: number
   students: number
   duration: string
   level: string
}

export const coursesData: CourseType[] = [
   {
      id: '1',
      title: 'Web Development Fundamentals',
      description: 'Learn the basics of HTML, CSS, and JavaScript to build stunning web applications.',
      category: 'Web Development',
      price: 49.99,
      image: '/web-development-classroom.jpg',
      instructor: 'Sarah Johnson',
      rating: 4.8,
      students: 5234,
      duration: '8 weeks',
      level: 'Beginner',
   },
   {
      id: '2',
      title: 'React.js Mastery',
      description: 'Master React and build modern single-page applications with hooks and context.',
      category: 'Frontend',
      price: 59.99,
      image: '/react-programming.png',
      instructor: 'Mike Chen',
      rating: 4.9,
      students: 3891,
      duration: '10 weeks',
      level: 'Intermediate',
   },
]