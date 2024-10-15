import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GameProps from "@/types/GameProps";

interface Animal {
    id: string
    name: string
    image: string
}

interface Home {
    id: string
    animal: string | null
}

const animals: Animal[] = [
    { id: 'blackbird', name: 'Дрозд', image: '/placeholder.svg?height=80&width=80' },
    { id: 'beaver', name: 'Бобр', image: '/placeholder.svg?height=80&width=80' },
    { id: 'squirrel', name: 'Белка', image: '/placeholder.svg?height=80&width=80' },
    { id: 'fox', name: 'Лиса', image: '/placeholder.svg?height=80&width=80' },
]

const initialHomes: Home[] = [
    { id: 'home1', animal: null },
    { id: 'home2', animal: null },
    { id: 'home3', animal: null },
    { id: 'home4', animal: null },
]

const correctPlacements = {
    home1: 'blackbird',
    home2: 'beaver',
    home3: 'squirrel',
    home4: 'fox',
}

const AnimalHomesGame: React.FC<GameProps> = ({ onComplete }) => {
    const [homes, setHomes] = useState<Home[]>(initialHomes)
    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null)
    const [showResult, setShowResult] = useState(false)
    const navigate = useNavigate()

    const handleAnimalClick = (animal: Animal) => {
        setSelectedAnimal(animal)
    }

    const handleHomeClick = (homeIndex: number) => {
        if (selectedAnimal) {
            const newHomes = [...homes]
            if (newHomes[homeIndex].animal) {
                // If there's already an animal in this home, put it back in the selection
                const animalToRemove = newHomes[homeIndex].animal
                setSelectedAnimal(animals.find(a => a.id === animalToRemove) || null)
            }
            newHomes[homeIndex].animal = selectedAnimal.id
            setHomes(newHomes)
            setSelectedAnimal(null)
        }
    }

    const checkAnswers = () => {
        setShowResult(true)
        if (allCorrect) {
            // Вызываем onComplete, когда игра успешно завершена
            setTimeout(() => {
                onComplete()
            }, 2000) // Задержка в 2 секунды, чтобы игрок успел увидеть результат
        }
    }

    const resetGame = () => {
        setHomes(initialHomes)
        setSelectedAnimal(null)
        setShowResult(false)
    }

    const allCorrect = homes.every((home, index) => home.animal === correctPlacements[`home${index + 1}` as keyof typeof correctPlacements])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-brown-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                <h1 className="text-2xl font-bold mb-4 text-center">Подбери каждому животному свой домик</h1>
                <div className="relative w-full h-96 bg-cover bg-center mb-6" style={{backgroundImage: "url('/placeholder.svg?height=400&width=600')"}}>
                    {homes.map((home, index) => (
                        <button
                            key={home.id}
                            onClick={() => handleHomeClick(index)}
                            className={`absolute w-16 h-16 border-2 ${selectedAnimal ? 'border-blue-500' : 'border-gray-400'} flex items-center justify-center ${
                                index === 0 ? 'top-4 right-4' :
                                    index === 1 ? 'bottom-4 left-4' :
                                        index === 2 ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' :
                                            'bottom-4 right-4'
                            }`}
                        >
                            {home.animal && (
                                <img
                                    src={animals.find(a => a.id === home.animal)?.image}
                                    alt={animals.find(a => a.id === home.animal)?.name}
                                    className="w-full h-full object-contain"
                                />
                            )}
                        </button>
                    ))}
                </div>
                <div className="flex justify-center space-x-4 mb-6">
                    {animals.map((animal) => (
                        <button
                            key={animal.id}
                            onClick={() => handleAnimalClick(animal)}
                            className={`w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center ${
                                selectedAnimal?.id === animal.id ? 'border-4 border-blue-500' : ''
                            } ${homes.some(home => home.animal === animal.id) ? 'opacity-50' : ''}`}
                            disabled={homes.some(home => home.animal === animal.id)}
                        >
                            <img src={animal.image} alt={animal.name} className="w-16 h-16 object-contain" />
                        </button>
                    ))}
                </div>
                {!showResult ? (
                    <button
                        onClick={checkAnswers}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Проверить
                    </button>
                ) : (
                    <div className="text-center">
                        <p className={`text-xl font-bold mb-4 ${allCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {allCorrect ? 'Отлично! Все животные в своих домиках!' : 'Есть ошибки. Попробуй еще раз!'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AnimalHomesGame