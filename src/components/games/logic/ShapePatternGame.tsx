import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Shape {
    id: string
    image: string
}

interface ShapePatternGameProps {
    onComplete: () => void
}

const shapes: Shape[] = [
    { id: 'circle', image: '/placeholder.svg?height=80&width=80&text=⭕' },
    { id: 'square', image: '/placeholder.svg?height=80&width=80&text=🟥' },
    { id: 'triangle', image: '/placeholder.svg?height=80&width=80&text=🔺' },
]

const pattern: (string | null)[] = ['circle', 'square', 'triangle', 'circle', 'square', null]

const ShapePatternGame: React.FC<ShapePatternGameProps> = ({ onComplete }) => {
    const [currentPattern, setCurrentPattern] = useState<(string | null)[]>(pattern)
    const [selectedShape, setSelectedShape] = useState<string | null>(null)
    const [showResult, setShowResult] = useState(false)
    const navigate = useNavigate()

    const handleShapeClick = (shapeId: string) => {
        setSelectedShape(shapeId)
    }

    const handlePatternClick = (index: number) => {
        if (selectedShape && currentPattern[index] === null) {
            const newPattern = [...currentPattern]
            newPattern[index] = selectedShape
            setCurrentPattern(newPattern)
            setSelectedShape(null)
        }
    }

    const checkAnswer = () => {
        setShowResult(true)
        if (currentPattern.every((shape, index) => shape === pattern[index])) {
            setTimeout(() => {
                onComplete()
            }, 2000)
        }
    }

    const resetGame = () => {
        setCurrentPattern(pattern)
        setSelectedShape(null)
        setShowResult(false)
    }

    const isCorrect = currentPattern.every((shape, index) => shape === pattern[index])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-4 text-center">Заполни фигуру</h1>
                <div className="flex justify-center space-x-2 mb-6">
                    {currentPattern.map((shape, index) => (
                        <button
                            key={index}
                            onClick={() => handlePatternClick(index)}
                            className={`w-16 h-16 border-2 ${selectedShape ? 'border-blue-500' : 'border-gray-400'} flex items-center justify-center`}
                        >
                            {shape && (
                                <img
                                    src={shapes.find(s => s.id === shape)?.image}
                                    alt={shape}
                                    className="w-12 h-12 object-contain"
                                />
                            )}
                        </button>
                    ))}
                </div>
                <div className="flex justify-center space-x-4 mb-6">
                    {shapes.map((shape) => (
                        <button
                            key={shape.id}
                            onClick={() => handleShapeClick(shape.id)}
                            className={`w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center ${
                                selectedShape === shape.id ? 'border-4 border-blue-500' : ''
                            }`}
                        >
                            <img src={shape.image} alt={shape.id} className="w-16 h-16 object-contain" />
                        </button>
                    ))}
                </div>
                {!showResult ? (
                    <button
                        onClick={checkAnswer}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        disabled={currentPattern.some(shape => shape === null)}
                    >
                        Проверить
                    </button>
                ) : (
                    <div className="text-center">
                        <p className={`text-xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {isCorrect ? 'Правильно! Ты заполнил фигуру верно!' : 'Неправильно. Попробуй еще раз!'}
                        </p>
                        {!isCorrect && (
                            <button
                                onClick={resetGame}
                                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                            >
                                Играть снова
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShapePatternGame