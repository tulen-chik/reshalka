import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface AppleCountingGameProps {
    onComplete: () => void
}

const AppleCountingGame: React.FC<AppleCountingGameProps> = ({ onComplete }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [showResult, setShowResult] = useState(false)
    const navigate = useNavigate()

    const question = {
        text: 'Яблоки в саду поспели,\nМы отведать их успели\nПять румяных, наливных,\nДва с кислинкой.\nСколько их?',
        image: '/placeholder.svg?height=200&width=200',
        answers: ['7', '8', '3'],
        correctAnswer: '7'
    }

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer)
    }

    const checkAnswer = () => {
        setShowResult(true)
        if (selectedAnswer === question.correctAnswer) {
            setTimeout(() => {
                onComplete()
            }, 2000)
        }
    }

    const resetGame = () => {
        setSelectedAnswer(null)
        setShowResult(false)
    }

    const isCorrect = selectedAnswer === question.correctAnswer

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-4 text-center">Яблочки</h1>
                <img src={question.image} alt="Яблоня" className="mx-auto mb-4 w-48 h-48 object-contain" />
                <p className="text-lg mb-6 whitespace-pre-line text-center">{question.text}</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {question.answers.map((answer) => (
                        <button
                            key={answer}
                            onClick={() => handleAnswerClick(answer)}
                            className={`p-2 rounded-lg ${
                                selectedAnswer === answer
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        >
                            {answer}
                        </button>
                    ))}
                </div>
                {!showResult ? (
                    <button
                        onClick={checkAnswer}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        disabled={!selectedAnswer}
                    >
                        Проверить
                    </button>
                ) : (
                    <div className="text-center">
                        <p className={`text-xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {isCorrect ? 'Правильно!' : 'Неправильно. Попробуй еще раз!'}
                        </p>
                        {!isCorrect && (
                            <button
                                onClick={resetGame}
                                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                            >
                                Попробовать снова
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AppleCountingGame