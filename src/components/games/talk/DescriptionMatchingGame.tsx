import React, { useState } from 'react'

interface Item {
    id: string
    name: string
    image: string
}

interface Description {
    id: string
    text: string
    item: string | null
}

const items: Item[] = [
    { id: 'mouse', name: 'Мышь', image: '/talk/mouse.png' },
    { id: 'candy', name: 'Конфета', image: '/talk/candy.png' },
    { id: 'apple', name: 'Яблоко', image: '/talk/apple.png' },
]

const initialDescriptions: Description[] = [
    { id: 'desc1', text: 'Красное, круглое, сочное', item: null },
    { id: 'desc2', text: 'Маленькая, пугливая, серая', item: null },
    { id: 'desc3', text: 'Сладкая, продолговатая, разноцветная', item: null },
]

const correctPlacements = {
    desc1: 'apple',
    desc2: 'mouse',
    desc3: 'candy',
}

interface DescriptionMatchingGameProps {
    onComplete: () => void
}

const DescriptionMatchingGame: React.FC<DescriptionMatchingGameProps> = ({ onComplete }) => {
    const [descriptions, setDescriptions] = useState<Description[]>(initialDescriptions)
    const [selectedItem, setSelectedItem] = useState<Item | null>(null)
    const [showResult, setShowResult] = useState(false)

    const handleItemClick = (item: Item) => {
        setSelectedItem(item)
    }

    const handleDescriptionClick = (descIndex: number) => {
        const newDescriptions = [...descriptions]
        if (selectedItem) {
            // If an item is selected, place it in the description
            if (newDescriptions[descIndex].item) {
                // If there's already an item, replace it
                setSelectedItem(items.find(i => i.id === newDescriptions[descIndex].item) || null)
            }
            newDescriptions[descIndex].item = selectedItem.id
            setSelectedItem(null)
        } else if (newDescriptions[descIndex].item) {
            // If no item is selected and there's an item in the description, remove it
            setSelectedItem(items.find(i => i.id === newDescriptions[descIndex].item) || null)
            newDescriptions[descIndex].item = null
        }
        setDescriptions(newDescriptions)
    }

    const checkAnswers = () => {
        setShowResult(true)
        const allCorrect = descriptions.every((desc, index) => desc.item === correctPlacements[desc.id as keyof typeof correctPlacements])
        if (allCorrect) {
            setDescriptions(initialDescriptions);
            setTimeout(() => {
                onComplete()
            }, 2000)
        }
    }

    const resetGame = () => {
        setDescriptions(initialDescriptions)
        setSelectedItem(null)
        setShowResult(false)
    }

    const allCorrect = descriptions.every((desc, index) => desc.item === correctPlacements[desc.id as keyof typeof correctPlacements])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-pink-300 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                <h1 className="text-2xl font-bold mb-4 text-center">О каких предметах говорится в описании?</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {descriptions.map((desc, index) => (
                        <div key={desc.id} className="flex items-center">
                            <div className="flex-grow p-2 bg-pink-100 rounded mr-2">
                                {desc.text}
                            </div>
                            <button
                                onClick={() => handleDescriptionClick(index)}
                                className={`w-16 h-16 border-2 ${selectedItem ? 'border-blue-500' : 'border-gray-400'} flex items-center justify-center`}
                            >
                                {desc.item && (
                                    <img
                                        src={items.find(i => i.id === desc.item)?.image}
                                        alt={items.find(i => i.id === desc.item)?.name}
                                        className="w-full h-full object-contain"
                                    />
                                )}
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center space-x-4 mb-6">
                    {items.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item)}
                            className={`w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center ${
                                selectedItem?.id === item.id ? 'border-4 border-blue-500' : ''
                            } ${descriptions.some(desc => desc.item === item.id) ? 'opacity-50' : ''}`}
                            disabled={descriptions.some(desc => desc.item === item.id)}
                        >
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
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
                            {allCorrect ? 'Отлично! Все предметы подобраны правильно!' : 'Есть ошибки. Попробуй еще раз!'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DescriptionMatchingGame