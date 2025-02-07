import React, { useState } from 'react';
import GameProps from "@/types/GameProps";

interface Animal {
    id: string;
    name: string;
    image: string;
}

interface Home {
    id: string;
    animal: string | null;
}

const animals: Animal[] = [
    { id: 'blackbird', name: 'Дрозд', image: '/world/bird.png' },
    { id: 'beaver', name: 'Бобр', image: '/world/beaver.png' },
    { id: 'squirrel', name: 'Белка', image: '/world/squirrely.png' },
    { id: 'fox', name: 'Лиса', image: '/world/lisa1.png' },
];

const initialHomes: Home[] = [
    { id: 'home1', animal: null },
    { id: 'home2', animal: null },
    { id: 'home3', animal: null },
    { id: 'home4', animal: null },
];

const correctPlacements = {
    home1: 'blackbird',
    home2: 'beaver',
    home3: 'squirrel',
    home4: 'fox',
};

const AnimalHomesGame: React.FC<GameProps> = ({ onComplete }) => {
    const [homes, setHomes] = useState<Home[]>(initialHomes);
    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
    const [showResult, setShowResult] = useState(false);

    const handleAnimalClick = (animal: Animal) => {
        setShowResult(false);
        setSelectedAnimal(animal);
    };

    const handleHomeClick = (homeIndex: number) => {
        setShowResult(false);
        const newHomes = [...homes];
        const currentAnimal = newHomes[homeIndex].animal;

        if (selectedAnimal) {
            newHomes[homeIndex].animal = selectedAnimal.id;
            setSelectedAnimal(null);
        } else if (currentAnimal) {
            newHomes[homeIndex].animal = null;
        }

        setHomes(newHomes);
    };

    const checkAnswers = () => {
        setShowResult(true);
        const allCorrect = homes.every((home, index) => home.animal === correctPlacements[`home${index + 1}` as keyof typeof correctPlacements]);

        if (allCorrect) {
            setTimeout(() => {
                onComplete();
            }, 2000);
        }
    };

    const resetGame = () => {
        setHomes(initialHomes);
        setSelectedAnimal(null);
        setShowResult(false);
    };

    const isCorrect = (home: Home, index: number) => {
        return home.animal === correctPlacements[`home${index + 1}` as keyof typeof correctPlacements];
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-brown-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                <h1 className="text-2xl font-bold mb-4 text-center">Подбери каждому животному свой домик</h1>
                <div className="relative w-full h-96 bg-cover bg-center mb-6" style={{ backgroundImage: "url('/world/homes.png')" }}>
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
                    <div className="text-center mt-4">
                        <p className={`text-xl font-bold mt-4 ${homes.every((home, index) => isCorrect(home, index)) ? 'text-green-600' : 'text-red-600'}`}>
                        {homes.every((home, index) => isCorrect(home, index)) ? 'Отлично! Все животные в своих домиках!' : 'Есть ошибки. Попробуй еще раз!'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnimalHomesGame;
