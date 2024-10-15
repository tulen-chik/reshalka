import React, { useState } from 'react'
import GameProps from "@/types/GameProps";

const TreeHeightGame: React.FC<GameProps> = ({ onComplete }) => {
    const [tallestTree, setTallestTree] = useState<string>('')
    const [shortestTree, setShortestTree] = useState<string>('')
    const [showResult, setShowResult] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setShowResult(true)

        // Trigger completion if the answers are correct
        if (isCorrect) {
            setTimeout(() => {
                onComplete(); // Call onComplete after a delay
            }, 2000); // Optional delay to let users see the result message
        }
    }

    const handlePlayAgain = () => {
        setTallestTree('')
        setShortestTree('')
        setShowResult(false)
    }

    const isCorrect = tallestTree === '2' && shortestTree === '3'

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-4 text-center">Логическая задача о деревьях</h1>
                <p className="mb-4 text-center">
                    На поляне росли три дерева: береза, елка и дуб. Дуб выше березы, а береза выше елки.
                    Какое дерево самое высокое, а какое самое низкое?
                </p>
                <div className="flex justify-around mb-6">
                    <div className="text-center">
                        <img src="/placeholder.svg?height=100&width=100" alt="Береза" className="w-24 h-24 mx-auto mb-2" />
                        <p>1. Береза</p>
                    </div>
                    <div className="text-center">
                        <img src="/placeholder.svg?height=100&width=100" alt="Дуб" className="w-24 h-24 mx-auto mb-2" />
                        <p>2. Дуб</p>
                    </div>
                    <div className="text-center">
                        <img src="/placeholder.svg?height=100&width=100" alt="Елка" className="w-24 h-24 mx-auto mb-2" />
                        <p>3. Елка</p>
                    </div>
                </div>
                {!showResult ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="tallest" className="block mb-1">Какое дерево самое высокое?</label>
                            <input
                                type="text"
                                id="tallest"
                                value={tallestTree}
                                onChange={(e) => setTallestTree(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="shortest" className="block mb-1">Какое дерево самое низкое?</label>
                            <input
                                type="text"
                                id="shortest"
                                value={shortestTree}
                                onChange={(e) => setShortestTree(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                            Проверить
                        </button>
                    </form>
                ) : (
                    <div className="text-center">
                        <p className={`text-xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {isCorrect ? 'Правильно!' : 'Попробуй еще раз!'}
                        </p>
                        <p className="mb-4">
                            Самое высокое дерево - дуб (2), а самое низкое - елка (3).
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TreeHeightGame
