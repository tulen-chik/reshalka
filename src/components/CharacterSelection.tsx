import React from 'react'

interface CharacterSelectionProps {
    onSelectCharacter: (character: string) => void
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({ onSelectCharacter }) => {
    const characters: string[] = ['Мальчик', 'Девочка', 'Робот']

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
                <h1 className="text-3xl font-bold mb-6">Выбери своего персонажа</h1>
                <div className="flex flex-wrap justify-center gap-4">
                    {characters.map((character) => (
                        <button
                            key={character}
                            onClick={() => onSelectCharacter(character)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                        >
                            {character}
                        </button>
                    ))}
                </div>
            </div>
        </>

    )
}

export default CharacterSelection