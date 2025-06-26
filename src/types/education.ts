export interface Lesson {
    id: string
    title: string
    description: string
    content: string
    duration: number
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    category: string
    completed: boolean
    progress: number
}

export interface Quiz {
    id: string
    lessonId: string
    questions: Question[]
    passingScore: number
    userScore?: number
    completed: boolean
}

export interface Question {
    id: string
    question: string
    type: 'multiple-choice' | 'true-false' | 'text'
    options?: string[]
    correctAnswer: string | number
    explanation: string
}

export interface LearningModule {
    id: string
    title: string
    description: string
    icon: string
    lessons: Lesson[]
    totalDuration: number
    completedLessons: number
    progress: number
    badge?: string
}

export interface UserProgress {
    userId: string
    completedLessons: string[]
    completedQuizzes: string[]
    badges: string[]
    totalPoints: number
    streakDays: number
    lastActivity: Date
}
