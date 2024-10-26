import React, { useState } from 'react';
import GameProps from "@/types/GameProps";

interface Animal {
    id: number;
    name: string;
    isWild: boolean;
    imageUrl: string;
}

const animals: Animal[] = [
    { id: 1, name: 'Коза', isWild: false, imageUrl: '/world/goat.png' },
    { id: 2, name: 'Лошадь', isWild: false, imageUrl: '/world/horse.png' },
    { id: 3, name: 'Медведь', isWild: true, imageUrl: '/world/bear.png' },
    { id: 4, name: 'Волк', isWild: true, imageUrl: '/world/wolf.png' },
    { id: 5, name: 'Лиса', isWild: true, imageUrl: '/world/lisa.png' },
    { id: 6, name: 'Корова', isWild: false, imageUrl: '/world/cow.png' },
    { id: 7, name: 'Кот', isWild: false, imageUrl: '/world/cat.png' },
    { id: 8, name: 'Свинья', isWild: false, imageUrl: '/world/pig.png' },
];

const AnimalClassificationGame: React.FC<GameProps> = ({ onComplete }) => {
    const [selections, setSelections] = useState<{ [key: number]: 'wild' | 'domestic' | null }>({});
    const [showResult, setShowResult] = useState(false);

    const handleSelection = (animalId: number, type: 'wild' | 'domestic') => {
        setShowResult(false);
        setSelections(prev => ({
            ...prev,
            [animalId]: prev[animalId] === type ? null : type,
        }));
    };

    const checkAnswers = () => {
        setShowResult(true);
        const allCorrect = animals.every(animal => isCorrect(animal));

        if (allCorrect) {
            setTimeout(() => {
                onComplete(); // Call onComplete when all answers are correct
            }, 2000); // 2 second delay
        }
    };

    const isCorrect = (animal: Animal) => {
        return (animal.isWild && selections[animal.id] === 'wild') ||
            (!animal.isWild && selections[animal.id] === 'domestic');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                <h1 className="text-2xl font-bold mb-4 text-center">Определи диких и домашних животных</h1>
                <p className="mb-4 text-center">
                    Нажми на красный кружок для диких животных, на зеленый - для домашних.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {animals.map(animal => (
                        <div key={animal.id} className="flex flex-col items-center">
                            <img src={animal.imageUrl} alt={animal.name} className="w-24 h-24 object-cover mb-2" />
                            <p className="text-center mb-2">{animal.name}</p>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleSelection(animal.id, 'wild')}
                                    className={`w-6 h-6 rounded-full ${selections[animal.id] === 'wild' ? 'bg-red-500' : 'bg-gray-200'}`}
                                />
                                <button
                                    onClick={() => handleSelection(animal.id, 'domestic')}
                                    className={`w-6 h-6 rounded-full ${selections[animal.id] === 'domestic' ? 'bg-green-500' : 'bg-gray-200'}`}
                                />
                            </div>
                            {showResult && (
                                <p className={`mt-2 ${isCorrect(animal) ? 'text-green-600' : 'text-red-600'}`}>
                                    {isCorrect(animal) ? 'Верно!' : 'Неверно'}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    onClick={checkAnswers}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Проверить
                </button>

                {showResult && (
                    <div className="text-center mt-4">
                        <p className={`text-xl font-bold mb-4 ${animals.every(isCorrect) ? 'text-green-600' : 'text-red-600'}`}>
                            {animals.every(isCorrect) ? 'Отлично! Все ответы правильные!' : 'Есть ошибки. Попробуй еще раз!'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnimalClassificationGame;
