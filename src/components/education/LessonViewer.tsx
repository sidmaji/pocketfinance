'use client'
import Button from '@/components/ui/Button'
import { Lesson } from '@/types/education'
import { CheckCircle, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { useState } from 'react'

interface LessonViewerProps {
    lesson: Lesson
    onComplete: (lessonId: string) => void
    onNext?: () => void
    onPrevious?: () => void
    hasNext: boolean
    hasPrevious: boolean
}

export default function LessonViewer({ lesson, onComplete, onNext, onPrevious, hasNext, hasPrevious }: LessonViewerProps) {
    const [progress, setProgress] = useState(lesson.progress)
    const [isCompleted, setIsCompleted] = useState(lesson.completed)

    const handleComplete = () => {
        setIsCompleted(true)
        setProgress(100)
        onComplete(lesson.id)
    }

    const simulateProgress = () => {
        if (progress < 100) {
            setProgress(Math.min(progress + 20, 100))
        }
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner':
                return 'bg-green-100 text-green-800'
            case 'intermediate':
                return 'bg-yellow-100 text-yellow-800'
            case 'advanced':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-primary p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold">{lesson.title}</h1>
                    {isCompleted && <CheckCircle className="h-8 w-8 text-green-300" />}
                </div>
                <p className="text-purple-100 mb-4">{lesson.description}</p>

                <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{lesson.duration} min</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>{lesson.difficulty}</span>
                </div>
            </div>

            <div className="p-6">
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Lesson Progress</span>
                        <span className="text-sm text-gray-500">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                <div className="prose max-w-none mb-8">
                    <div className="text-gray-700 leading-relaxed">{lesson.content}</div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">📚 Key Takeaways</h4>
                        <ul className="text-blue-700 text-sm space-y-1">
                            <li>• Understanding financial concepts builds confidence</li>
                            <li>• Practice with simulations before real-world application</li>
                            <li>• Every small step toward financial literacy matters</li>
                        </ul>
                    </div>

                    {progress < 100 && (
                        <div className="mt-6 text-center">
                            <Button onClick={simulateProgress} variant="outline">
                                Continue Reading
                            </Button>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <Button variant="outline" onClick={onPrevious} disabled={!hasPrevious} className="flex items-center">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                    </Button>

                    <div className="flex space-x-3">
                        {!isCompleted && progress >= 80 && (
                            <Button onClick={handleComplete} className="flex items-center">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark Complete
                            </Button>
                        )}

                        <Button onClick={onNext} disabled={!hasNext} variant={isCompleted ? 'primary' : 'outline'} className="flex items-center">
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
