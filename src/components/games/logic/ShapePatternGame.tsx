import React, { useState } from 'react'
import GameProps from "@/types/GameProps"

interface Shape {
    id: string
    name: string
    image: string
}

interface GridCell {
    id: string
    shape: string | null
}

const shapes: Shape[] = [
    { id: 'circle', name: 'Круг', image: '/logic/circle.png' },
    { id: 'square', name: 'Квадрат', image: '/logic/kvadrat.png' },
    { id: 'triangle', name: 'Треугольник', image: '/logic/triangle.png' },
]

const initialGrid: GridCell[] = [
    { id: 'cell1', shape: 'circle' },
    { id: 'cell2', shape: 'square' },
    { id: 'cell3', shape: 'triangle' },
    { id: 'cell4', shape: 'square' },
    { id: 'cell5', shape: 'triangle' },
    { id: 'cell6', shape: 'circle' },
    { id: 'cell7', shape: 'triangle' },
    { id: 'cell8', shape: 'circle' },
    { id: 'cell9', shape: null },
]

const correctAnswer = 'square'

const ShapePatternGame: React.FC<GameProps> = ({ onComplete }) => {
    const [grid, setGrid] = useState<GridCell[]>(initialGrid)
    const [selectedShape, setSelectedShape] = useState<Shape | null>(null)
    const [showResult, setShowResult] = useState(false)

    const handleShapeClick = (shape: Shape) => {
        setSelectedShape(shape)
    }

    const handleCellClick = (cellIndex: number) => {
        if (selectedShape && grid[cellIndex].shape === null) {
            const newGrid = [...grid]
            newGrid[cellIndex].shape = selectedShape.id
            setGrid(newGrid)
            setSelectedShape(null)
        }
    }

    const checkAnswer = () => {
        setShowResult(true)
        if (grid[8].shape === correctAnswer) {
            setTimeout(() => {
                onComplete()
            }, 2000)
        }
    }

    const resetGame = () => {
        setGrid(initialGrid)
        setSelectedShape(null)
        setShowResult(false)
    }

    const isCorrect = grid[8].shape === correctAnswer

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-rose-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-4 text-center">Какой фигуры не хватает в последнем ряду?</h1>
                <div className="grid grid-cols-3 gap-2 mb-6">
                    {grid.map((cell, index) => (
                        <button
                            key={cell.id}
                            onClick={() => handleCellClick(index)}
                            className={`w-20 h-20 border-2 ${selectedShape ? 'border-blue-500' : 'border-gray-400'} flex items-center justify-center`}
                            disabled={cell.shape !== null}
                        >
                            {cell.shape && (
                                <img
                                    src={shapes.find(s => s.id === cell.shape)?.image}
                                    alt={shapes.find(s => s.id === cell.shape)?.name}
                                    className="w-16 h-16 object-contain"
                                />
                            )}
                        </button>
                    ))}
                </div>
                <div className="flex justify-center space-x-4 mb-6">
                    {shapes.map((shape) => (
                        <button
                            key={shape.id}
                            onClick={() => handleShapeClick(shape)}
                            className={`w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center ${
                                selectedShape?.id === shape.id ? 'border-4 border-blue-500' : ''
                            }`}
                        >
                            <img src={shape.image} alt={shape.name} className="w-16 h-16 object-contain" />
                        </button>
                    ))}
                </div>
                {!showResult ? (
                    <button
                        onClick={checkAnswer}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        disabled={grid[8].shape === null}
                    >
                        Проверить
                    </button>
                ) : (
                    <div className="text-center">
                        <p className={`text-xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {isCorrect ? 'Правильно! Ты нашел нужную фигуру!' : 'Неправильно. Попробуй еще раз!'}
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