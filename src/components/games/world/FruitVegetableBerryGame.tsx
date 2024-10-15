import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameProps from "@/types/GameProps";

interface Item {
    id: number;
    name: string;
    type: 'fruit' | 'vegetable' | 'berry';
    imageUrl: string;
}

const items: Item[] = [
    { id: 1, name: 'Морковь', type: 'vegetable', imageUrl: '/carrot.svg' },
    { id: 2, name: 'Клубника', type: 'berry', imageUrl: '/strawberry.svg' },
    { id: 3, name: 'Яблоко', type: 'fruit', imageUrl: '/apple.svg' },
    { id: 4, name: 'Виноград', type: 'fruit', imageUrl: '/grapes.svg' },
    { id: 5, name: 'Груша', type: 'fruit', imageUrl: '/pear.svg' },
    { id: 6, name: 'Капуста', type: 'vegetable', imageUrl: '/cabbage.svg' },
    { id: 7, name: 'Апельсин', type: 'fruit', imageUrl: '/orange.svg' },
    { id: 8, name: 'Картофель', type: 'vegetable', imageUrl: '/potato.svg' },
];

const FruitVegetableBerryGame: React.FC<GameProps> = ({ onComplete }) => {
    const [selections, setSelections] = useState<{ [key: number]: 'red' | 'green' | 'blue' | null }>({});
    const [showResult, setShowResult] = useState(false);

    const handleSelection = (itemId: number, color: 'red' | 'green' | 'blue') => {
        setSelections(prev => ({
            ...prev,
            [itemId]: prev[itemId] === color ? null : color,
        }));
    };

    const isCorrect = (item: Item) => {
        return (item.type === 'fruit' && selections[item.id] === 'red') ||
            (item.type === 'vegetable' && selections[item.id] === 'green') ||
            (item.type === 'berry' && selections[item.id] === 'blue');
    };

    const checkAnswers = () => {
        setShowResult(true);
        const allCorrect = items.every(item => isCorrect(item)); // Check answers after selection updates

        if (allCorrect) {
            setTimeout(() => {
                onComplete(); // Call onComplete when all answers are correct
            }, 2000); // 2 second delay for completion
        }

        // Reset the showResult state after some delay
        setTimeout(() => {
            setShowResult(false);
        }, 4000);
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                <h1 className="text-2xl font-bold mb-4 text-center">Фрукты, овощи и ягоды</h1>
                <p className="mb-4 text-center">
                    Рядом с фруктом вставьте звездочку красного цвета, рядом с овощами - синего цвета, рядом с ягодами - красного цвета.
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    {items.map(item => (
                        <div key={item.id} className="flex flex-col items-center">
                            <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-contain mb-2" />

                            <div className="flex space-x-2">
                                <button onClick={() => handleSelection(item.id, 'red')}
                                        className={`text-3xl ${selections[item.id] === 'red' ? 'text-red-500' : 'text-gray-300'}`}>
                                    &#9733; {/* Red star for fruit */}
                                </button>
                                <button onClick={() => handleSelection(item.id, 'green')}
                                        className={`text-3xl ${selections[item.id] === 'green' ? 'text-green-500' : 'text-gray-300'}`}>
                                    &#9733; {/* Green star for vegetables */}
                                </button>
                                <button onClick={() => handleSelection(item.id, 'blue')}
                                        className={`text-3xl ${selections[item.id] === 'blue' ? 'text-blue-500' : 'text-gray-300'}`}>
                                    &#9733; {/* blue star for berries */}
                                </button>
                            </div>

                            {showResult && (
                                <p className={`mt-2 ${isCorrect(item) ? 'text-green-600' : 'text-red-600'}`}>
                                    {isCorrect(item) ? 'Верно!' : 'Неверно'}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {!showResult ? (
                    <button onClick={checkAnswers} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Проверить
                    </button>
                ) : (
                    <div className="text-center">
                        <p className={`text-xl font-bold mb-4 ${items.every(isCorrect) ? 'text-green-600' : 'text-red-600'}`}>
                            {items.every(isCorrect) ? 'Отлично! Все ответы правильные!' : 'Есть ошибки. Попробуй еще раз!'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FruitVegetableBerryGame;
