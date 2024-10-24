import React from 'react'
import Image from "next/image";
import Character from "@/types/Charecter";

interface CharacterSelectionProps {
    onSelectCharacter: (character: Character) => void
}

const characters: Character[] = [
    { id: 'cheb', name: 'Чебурашка', image: '/characters/cheb.png' },
    { id: 'croc', name: 'Крокодил Гена', image: '/characters/croc.png' },
    { id: 'hare', name: 'Заяц', image: '/characters/hare.png' },
]


const CharacterSelection: React.FC<CharacterSelectionProps> = ({ onSelectCharacter }) => {

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
                <h1 className="text-3xl font-bold mb-6">Выбери своего персонажа</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {characters.map((character) => (
                        <div
                            key={character.id}
                            className="flex flex-col items-center cursor-pointer transform transition-transform hover:scale-105"
                            onClick={() => onSelectCharacter(character)}
                        >
                            <Image
                                src={character.image}
                                alt={character.name}
                                width={400}
                                height={400}
                                className="w-40 h-40 rounded-full border-4 border-white shadow-lg mb-2"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}

export default CharacterSelection