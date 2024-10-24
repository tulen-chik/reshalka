import React, { useState, useRef, useEffect } from 'react'
import NumberSequenceGame from './games/math/NumberSequenceGame'
import TreeHeightGame from './games/logic/TreeHeightGame'
import AnimalClassificationGame from './games/world/AnimalClassificationGame'
import AnimalHomesGame from './games/world/AnimalHomesGame'
import FruitVegetableBerryGame from "@/components/games/world/FruitVegetableBerryGame"
import DescriptionMatchingGame from "@/components/games/talk/DescriptionMatchingGame"
import AppleCountingGame from "@/components/games/math/AppleCountingGame"
import ChildrenCpuntingGame from "@/components/games/math/ChildrenCpuntingGame"
import PictureSequencingGame from "@/components/games/talk/PictureSequencingGame"
import SockCountingGame from "@/components/games/logic/SockCountingGame"
import ShapePatternGame from "@/components/games/logic/ShapePatternGame"
import ProfessionMatchingGame from "@/components/games/talk/ProfessionMatchingGame"
import { Home, Volume2, VolumeX } from 'lucide-react'
import Image from "next/image";

interface Game {
    component: React.ComponentType<{ onComplete: () => void }>
    name: string
}

const mathGames: Game[] = [
    { component: AppleCountingGame, name: 'Посчитай яблоки' },
    { component: ChildrenCpuntingGame, name: 'Посчитай детей' },
    { component: NumberSequenceGame, name: 'Заполни пропуски' },
]

const logicGames: Game[] = [
    { component: TreeHeightGame, name: 'Сравни размер деревьев' },
    { component: SockCountingGame, name: 'Посчитай носки' },
    { component: ShapePatternGame, name: 'Заполни фигуру' },
]

const worldGames: Game[] = [
    { component: AnimalClassificationGame, name: 'Классифицируй животных' },
    { component: FruitVegetableBerryGame, name: 'Фрукты, овощи и ягоды' },
    { component: AnimalHomesGame, name: 'Соотнеси домики' },
]

const talkGames: Game[] = [
    { component: ProfessionMatchingGame, name: 'Профессии' },
    { component: DescriptionMatchingGame, name: 'Подбери описание' },
    { component: PictureSequencingGame, name: 'Расставь по порядку' },
]

const categories = [
    { name: 'Математика', games: mathGames },
    { name: 'Логика', games: logicGames },
    { name: 'Окружающий мир', games: worldGames },
    { name: 'Развитие речи', games: talkGames },
]

interface CongratulatoryModalProps {
    category: string
    onClose: () => void
}

const CongratulatoryModal: React.FC<CongratulatoryModalProps> = ({ category, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-3xl font-bold mb-4 text-center text-green-600">Поздравляем!</h2>
                <p className="text-xl mb-6 text-center">
                    Вы успешно прошли все игры в категории "{category}"!
                </p>
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Вернуться к выбору категории
                    </button>
                </div>
            </div>
        </div>
    )
}

const Games: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<Game[] | null>(null)
    const [currentGameIndex, setCurrentGameIndex] = useState(0)
    const [showCongratulations, setShowCongratulations] = useState(false)
    const [isMusicPlaying, setIsMusicPlaying] = useState(true)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3
            audioRef.current.loop = true
            if (isMusicPlaying) {
                audioRef.current.play().catch(error => console.error("Audio playback failed:", error))
            } else {
                audioRef.current.pause()
            }
        }
    }, [isMusicPlaying])

    const handleCategorySelect = (games: Game[]) => {
        setSelectedCategory(games)
        setCurrentGameIndex(0)
    }

    const handleGameComplete = () => {
        if (selectedCategory && currentGameIndex < selectedCategory.length - 1) {
            setCurrentGameIndex(currentGameIndex + 1)
        } else {
            setShowCongratulations(true)
        }
    }

    const handleReturnToStart = () => {
        setSelectedCategory(null)
        setCurrentGameIndex(0)
    }

    const handleCongratulationsClose = () => {
        setShowCongratulations(false)
        setSelectedCategory(null)
        setCurrentGameIndex(0)
    }

    const toggleMusic = () => {
        setIsMusicPlaying(!isMusicPlaying)
    }

    const renderCategorySelection = () => (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Выбери категорию</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleCategorySelect(category.games)}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 text-lg font-semibold"
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    )

    const renderGame = () => {
        if (!selectedCategory) return null
        const CurrentGame = selectedCategory[currentGameIndex].component
        return (
            <CurrentGame onComplete={handleGameComplete} />
        )
    }

    return (
        <div className="relative">
            {!selectedCategory ? renderCategorySelection() : renderGame()}
            <button
                onClick={handleReturnToStart}
                className="fixed bottom-4 right-4 p-2 text-white rounded-full transition duration-200"
            >
                <Image height={150} width={150} src={"/menu.png"} alt={"menu"} />
            </button>
            {showCongratulations && selectedCategory && (
                <CongratulatoryModal
                    category={categories.find(cat => cat.games === selectedCategory)?.name || ''}
                    onClose={handleCongratulationsClose}
                />
            )}
        </div>
    )
}

export default Games