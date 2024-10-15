import React, { useState, useRef } from 'react'
import GameProps from "@/types/GameProps";

interface NumberItem {
    id: string
    content: string
}

interface SequenceItem {
    id: string
    content: string | null
}

const NumberSequenceGame: React.FC<GameProps> = ({ onComplete }) => {
    const [numbers, setNumbers] = useState<NumberItem[]>([
        { id: 'item1', content: '2' },
        { id: 'item2', content: '4' },
        { id: 'item3', content: '6' },
        { id: 'item4', content: '8' },
    ])
    const [sequence, setSequence] = useState<SequenceItem[]>([
        { id: 'slot1', content: '1' },
        { id: 'slot2', content: null },
        { id: 'slot3', content: '3' },
        { id: 'slot4', content: null },
        { id: 'slot5', content: '5' },
        { id: 'slot6', content: null },
        { id: 'slot7', content: '7' },
        { id: 'slot8', content: null },
        { id: 'slot9', content: '9' },
    ])
    const [selectedNumber, setSelectedNumber] = useState<NumberItem | null>(null)
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [allPlaced, setAllPlaced] = useState<boolean>(false)
    const nextId = useRef(6)

    const handleNumberClick = (number: NumberItem) => {
        setSelectedNumber(number)
    }

    const handleSlotClick = (index: number) => {
        if (selectedNumber) {
            const newSequence = [...sequence]
            const newNumbers = [...numbers]

            if (newSequence[index].content) {
                newNumbers.push({ id: `item${nextId.current}`, content: newSequence[index].content as string })
                nextId.current++
            }

            newSequence[index].content = selectedNumber.content
            const updatedNumbers = newNumbers.filter(num => num.id !== selectedNumber.id)

            setSequence(newSequence)
            setNumbers(updatedNumbers)
            setSelectedNumber(null)

            checkGameState(newSequence, updatedNumbers)
        }
    }

    const checkGameState = (newSequence: SequenceItem[], newNumbers: NumberItem[]) => {
        const isCorrect = newSequence.every((item, index) => parseInt(item.content as string) === index + 1)
        const isAllPlaced = newNumbers.length === 0

        if (isCorrect) {
            setGameOver(true)
            setTimeout(() => {
                onComplete(); // Called when the game is completed successfully
            }, 2000); // Optional delay to let users see the success message
        } else if (isAllPlaced) {
            setAllPlaced(true)
        } else {
            setAllPlaced(false)
        }
    }

    const handlePlayAgain = () => {
        setNumbers([
            { id: 'item1', content: '2' },
            { id: 'item2', content: '4' },
            { id: 'item3', content: '6' },
            { id: 'item4', content: '8' },
        ])
        setSequence([
            { id: 'slot1', content: '1' },
            { id: 'slot2', content: null },
            { id: 'slot3', content: '3' },
            { id: 'slot4', content: null },
            { id: 'slot5', content: '5' },
            { id: 'slot6', content: null },
            { id: 'slot7', content: '7' },
            { id: 'slot8', content: null },
            { id: 'slot9', content: '9' },
        ])
        setSelectedNumber(null)
        setGameOver(false)
        setAllPlaced(false)
        nextId.current = 6
    }

    if (gameOver) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 pb-16">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-3xl font-bold mb-4 text-green-600">Ура! Ты правильно восполнил числовой ряд!</h2>
                </div>
            </div>
        )
    }

    if (allPlaced) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 pb-16">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-3xl font-bold mb-4 text-yellow-600">Почти получилось!</h2>
                    <p className="text-xl mb-4">Все числа расставлены, но порядок неправильный. Попробуй переставить их.</p>
                    <button
                        onClick={handlePlayAgain}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200"
                    >
                        Продолжить
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4 pb-16">
            <h1 className="text-3xl font-bold mb-6">Восполни числовой ряд</h1>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {sequence.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => handleSlotClick(index)}
                            className={`w-12 h-12 flex items-center justify-center text-xl font-bold rounded ${
                                item.content
                                    ? (selectedNumber && selectedNumber.content === item.content)
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-yellow-200 hover:bg-yellow-300'
                                    : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        >
                            {item.content || '_'}
                        </button>
                    ))}
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                    {numbers.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleNumberClick(item)}
                            className={`w-12 h-12 flex items-center justify-center text-white text-xl font-bold rounded ${
                                selectedNumber && selectedNumber.id === item.id
                                    ? 'bg-blue-600'
                                    : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        >
                            {item.content}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NumberSequenceGame
