'use client'
import Button from '@/components/ui/Button'
import { LearningModule } from '@/types/education'
import { Award, BookOpen, Clock } from 'lucide-react'

interface ModuleCardProps {
    module: LearningModule
    onStart: (moduleId: string) => void
}

export default function ModuleCard({ module, onStart }: ModuleCardProps) {
    const progressPercentage = (module.completedLessons / module.lessons.length) * 100

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h3>
                    <p className="text-gray-600 mb-4">{module.description}</p>
                </div>
                {module.badge && (
                    <div className="ml-4">
                        <Award className="h-8 w-8 text-yellow-500" />
                    </div>
                )}
            </div>

            <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{module.lessons.length} lessons</span>
                </div>
                <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{module.totalDuration} min</span>
                </div>
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-500">
                        {module.completedLessons}/{module.lessons.length} completed
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </div>

            <Button onClick={() => onStart(module.id)} className="w-full" variant={module.completedLessons > 0 ? 'outline' : 'primary'}>
                {module.completedLessons === 0 ? 'Start Module' : module.completedLessons === module.lessons.length ? 'Review Module' : 'Continue Learning'}
            </Button>
        </div>
    )
}
