import React, { useState } from 'react'
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
import { Menu } from 'lucide-react'
import CongratulatoryModal from "@/components/CongratulatoryModal";

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
    { component: PictureSequencingGame, name: 'Расставь по порядку' },
    { component: ProfessionMatchingGame, name: 'Профессии' },
    { component: DescriptionMatchingGame, name: 'Подбери описание' },
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


const Games: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<Game[] | null>(null)
    const [currentGameIndex, setCurrentGameIndex] = useState(0)
    const [showMenu, setShowMenu] = useState(false)
    const [showCongratulations, setShowCongratulations] = useState(false)

    const handleCategorySelect = (games: Game[]) => {
        setSelectedCategory(games)
        setCurrentGameIndex(0)
        setShowMenu(false)
    }

    const handleGameComplete = () => {
        if (selectedCategory && currentGameIndex < selectedCategory.length - 1) {
            setCurrentGameIndex(currentGameIndex + 1)
        } else {
            setShowCongratulations(true)
        }
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    const handleCongratulationsClose = () => {
        setShowCongratulations(false)
        setSelectedCategory(null)
        setCurrentGameIndex(0)
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

    const renderMenu = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Меню</h2>
                <button
                    onClick={() => {
                        setSelectedCategory(null)
                        setShowMenu(false)
                    }}
                    className="block w-full px-4 py-2 mb-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                >
                    Главное меню
                </button>
                <button
                    onClick={() => setShowMenu(false)}
                    className="block w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
                >
                    Закрыть
                </button>
            </div>
        </div>
    )

    return (
        <div className="relative">
            {!selectedCategory ? renderCategorySelection() : renderGame()}
            <button
                onClick={toggleMenu}
                className="fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-200"
            >
                <Menu size={50} />
            </button>
            {showMenu && renderMenu()}
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