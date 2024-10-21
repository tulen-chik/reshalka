import React, { useState } from 'react'

interface Profession {
    id: string
    name: string
    image: string
}

interface Description {
    id: string
    text: string
    profession: string | null
}

const professions: Profession[] = [
    { id: 'doctor', name: 'Врач', image: '/talk/vrach.png' },
    { id: 'cook', name: 'Повар', image: '/talk/chef.png' },
    { id: 'icecream', name: 'Продавец мороженого', image: '/talk/icecream.png' },
    { id: 'artist', name: 'Художник', image: '/talk/painter.png' },
]

const initialDescriptions: Description[] = [
    { id: 'desc1', text: 'Лечит людей:', profession: null },
    { id: 'desc2', text: 'Готовит обед:', profession: null },
    { id: 'desc3', text: 'Продает мороженое:', profession: null },
    { id: 'desc4', text: 'Рисует картины:', profession: null },
]

const correctPlacements = {
    desc1: 'doctor',
    desc2: 'cook',
    desc3: 'icecream',
    desc4: 'artist',
}

interface ProfessionMatchingGameProps {
    onComplete: () => void
}

const ProfessionMatchingGame: React.FC<ProfessionMatchingGameProps> = ({ onComplete }) => {
    const [descriptions, setDescriptions] = useState<Description[]>(initialDescriptions)
    const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null)
    const [showResult, setShowResult] = useState(false)

    const handleProfessionClick = (profession: Profession) => {
        setSelectedProfession(profession)
    }

    const handleDescriptionClick = (descIndex: number) => {
        const newDescriptions = [...descriptions]
        if (selectedProfession) {
            if (newDescriptions[descIndex].profession) {
                setSelectedProfession(professions.find(p => p.id === newDescriptions[descIndex].profession) || null)
            }
            newDescriptions[descIndex].profession = selectedProfession.id
            setSelectedProfession(null)
        } else if (newDescriptions[descIndex].profession) {
            setSelectedProfession(professions.find(p => p.id === newDescriptions[descIndex].profession) || null)
            newDescriptions[descIndex].profession = null
        }
        setDescriptions(newDescriptions)
    }

    const checkAnswers = () => {
        setShowResult(true)
        const allCorrect = descriptions.every((desc) => desc.profession === correctPlacements[desc.id as keyof typeof correctPlacements])
        if (allCorrect) {
            setDescriptions(initialDescriptions);
            setTimeout(() => {
                onComplete()
            }, 2000)
        }
    }

    const resetGame = () => {
        setDescriptions(initialDescriptions)
        setSelectedProfession(null)
        setShowResult(false)
    }

    const allCorrect = descriptions.every((desc) => desc.profession === correctPlacements[desc.id as keyof typeof correctPlacements])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-rose-200 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                <h1 className="text-2xl font-bold mb-4 text-center">Кто кем работает?</h1>
                <div className="grid grid-cols-1 gap-4 mb-6">
                    {descriptions.map((desc, index) => (
                        <div key={desc.id} className="flex items-center">
                            <div className="flex-grow p-2 bg-rose-100 rounded mr-2">
                                {desc.text}
                            </div>
                            <button
                                onClick={() => handleDescriptionClick(index)}
                                className={`w-16 h-16 border-2 ${selectedProfession ? 'border-blue-500' : 'border-gray-400'} flex items-center justify-center`}
                            >
                                {desc.profession && (
                                    <img
                                        src={professions.find(p => p.id === desc.profession)?.image}
                                        alt={professions.find(p => p.id === desc.profession)?.name}
                                        className="w-full h-full object-contain"
                                    />
                                )}
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center space-x-4 mb-6">
                    {professions.map((profession) => (
                        <button
                            key={profession.id}
                            onClick={() => handleProfessionClick(profession)}
                            className={`w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center ${
                                selectedProfession?.id === profession.id ? 'border-4 border-blue-500' : ''
                            } ${descriptions.some(desc => desc.profession === profession.id) ? 'opacity-50' : ''}`}
                            disabled={descriptions.some(desc => desc.profession === profession.id)}
                        >
                            <img src={profession.image} alt={profession.name} className="w-16 h-16 object-contain" />
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
                            {allCorrect ? 'Отлично! Все профессии подобраны правильно!' : 'Есть ошибки. Попробуй еще раз!'}
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

export default ProfessionMatchingGame