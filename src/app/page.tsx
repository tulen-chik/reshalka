"use client"
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CharacterSelection from '@/components/CharacterSelection'
import Games from "@/components/Games";

const App: React.FC = () => {
    const [character, setCharacter] = useState<string | null>(null)

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    character ?
                        <Games /> :
                        <CharacterSelection onSelectCharacter={setCharacter} />
                } />
                <Route path="/games" element={<Games />} />
                <Route path="/game-complete" element={
                    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
                        <h1 className="text-4xl font-bold mb-4">Поздравляем!</h1>
                        <p className="text-xl mb-8">Вы успешно прошли все игры!</p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                        >
                            Начать сначала
                        </button>
                    </div>
                } />
            </Routes>
        </Router>
    )
}

export default App