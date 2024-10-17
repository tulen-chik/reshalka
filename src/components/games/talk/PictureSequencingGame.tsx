import React, { useState } from 'react'
import GameProps from "@/types/GameProps"

interface Picture {
    id: string
    image: string
    order: number | null
}

const initialPictures: Picture[] = [
    { id: 'pic1', image: '/talk/1.png', order: null },
    { id: 'pic2', image: '/talk/2.png', order: null },
    { id: 'pic3', image: '/talk/3.png', order: null },
    { id: 'pic4', image: '/talk/4.png', order: null },
]

const correctOrder = ['pic3', 'pic2', 'pic1', 'pic4']

const PictureSequencingGame: React.FC<GameProps> = ({ onComplete }) => {
    const [pictures, setPictures] = useState<Picture[]>(initialPictures)
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
    const [showResult, setShowResult] = useState(false)

    const handleNumberClick = (number: number) => {
        setSelectedNumber(number)
    }

    const handlePictureClick = (pictureId: string) => {
        if (selectedNumber !== null) {
            const newPictures = pictures.map(pic =>
                pic.id === pictureId ? { ...pic, order: selectedNumber } : pic
            )
            setPictures(newPictures)
            setSelectedNumber(null)
        }
    }

    const checkAnswers = () => {
        setShowResult(true)
        const allCorrect = pictures.every((pic, index) => pic.order === index + 1)
        if (allCorrect) {
            setTimeout(() => {
                onComplete()
            }, 2000)
        }
    }

    const resetGame = () => {
        setPictures(initialPictures)
        setSelectedNumber(null)
        setShowResult(false)
    }

    const allCorrect = pictures.every((pic, index) => pic.id === correctOrder[pic.order! - 1])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                <h1 className="text-2xl font-bold mb-4 text-center">Расставь картинки по порядку</h1>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {pictures.map((picture) => (
                        <div key={picture.id} className="relative">
                            <img
                                src={picture.image}
                                alt={`Картинка ${picture.id}`}
                                className="w-full h-auto rounded-lg cursor-pointer"
                                onClick={() => handlePictureClick(picture.id)}
                            />
                            {picture.order && (
                                <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                                    {picture.order}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-center space-x-4 mb-6">
                    {[1, 2, 3, 4].map((number) => (
                        <button
                            key={number}
                            onClick={() => handleNumberClick(number)}
                            className={`w-12 h-12 rounded-full ${
                                selectedNumber === number ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            } flex items-center justify-center text-xl font-bold`}
                            disabled={pictures.some(pic => pic.order === number)}
                        >
                            {number}
                        </button>
                    ))}
                </div>
                {!showResult ? (
                    <button
                        onClick={checkAnswers}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        disabled={pictures.some(pic => pic.order === null)}
                    >
                        Проверить
                    </button>
                ) : (
                    <div className="text-center">
                        <p className={`text-xl font-bold mb-4 ${allCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {allCorrect ? 'Отлично! Все картинки расставлены правильно!' : 'Есть ошибки. Попробуй еще раз!'}
                        </p>
                        {!allCorrect && (
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

export default PictureSequencingGame