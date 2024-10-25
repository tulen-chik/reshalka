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
import Image from "next/image";
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
                <>
                    <CongratulatoryModal
                        category={categories.find(cat => cat.games === selectedCategory)?.name || ''}
                        onClose={handleCongratulationsClose}
                    />
                    <div className="pyro absolute inset-0 pointer-events-none">
                        <div className="before"></div>
                        <div className="after"></div>
                    </div>
                    <style>
                        {`
                .pyro > .before, .pyro > .after {
                    position: absolute;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    box-shadow: -120px -218.66667px blue, 248px -16.66667px #00ff84, 
                                190px 16.33333px #002bff, -113px -308.66667px #ff009d, 
                                -109px -287.66667px #ffb300, -50px -313.66667px #ff006e, 
                                226px -31.66667px #ff4000, 180px -351.66667px #ff00d0, 
                                -12px -338.66667px #00f6ff, 220px -388.66667px #99ff00, 
                                -69px -27.66667px #ff0400, -111px -339.66667px #6200ff, 
                                155px -237.66667px #00ddff, -152px -380.66667px #00ffd0, 
                                -50px -37.66667px #00ffdd, -95px -175.66667px #a6ff00, 
                                -88px 10.33333px #0d00ff, 112px -309.66667px #005eff, 
                                69px -415.66667px #ff00a6, 168px -100.66667px #ff004c, 
                                -244px 24.33333px #ff6600, 97px -325.66667px #ff0066, 
                                -211px -182.66667px #00ffa2, 236px -126.66667px #b700ff, 
                                140px -196.66667px #9000ff, 125px -175.66667px #00bbff, 
                                118px -381.66667px #ff002f, 144px -111.66667px #ffae00, 
                                36px -78.66667px #f600ff, -63px -196.66667px #c800ff, 
                                -218px -227.66667px #d4ff00, -134px -377.66667px #ea00ff, 
                                -36px -412.66667px #ff00d4, 209px -106.66667px #00fff2, 
                                91px -278.66667px #000dff, -22px -191.66667px #9dff00, 
                                139px -392.66667px #a6ff00, 56px -2.66667px #0099ff, 
                                -156px -276.66667px #ea00ff, -163px -233.66667px #00fffb, 
                                -238px -346.66667px #00ff73, 62px -363.66667px #0088ff, 
                                244px -170.66667px #0062ff, 224px -142.66667px #b300ff, 
                                141px -208.66667px #9000ff, 211px -285.66667px #ff6600, 
                                181px -128.66667px #1e00ff, 90px -123.66667px #c800ff, 
                                189px 70.33333px #00ffc8, -18px -383.66667px #00ff33, 
                                100px -6.66667px #ff008c;
                    animation: bang 1s ease-out infinite backwards, 
                               gravity 1s ease-in infinite backwards, 
                               position 5s linear infinite backwards;
                }

                .pyro > .after {
                    animation-delay: 1.25s, 1.25s, 1.25s;
                    animation-duration: 1.25s, 1.25s, 6.25s;
                }

                @keyframes bang {
                    from {
                        box-shadow: 0 0 white, 0 0 white, 0 0 white, 0 0 white,
                                    0 0 white, 0 0 white, 0 0 white, 0 0 white,
                                    0 0 white, 0 0 white, 0 0 white, 0 0 white,
                                    0 0 white, 0 0 white, 0 0 white, 0 0 white,
                                    0 0 white, 0 0 white, 0 0 white, 0 0 white,
                                    0 0 white, 0 0 white, 0 0 white, 0 0 white;
                    }
                }

                @keyframes gravity {
                    to {
                        transform: translateY(200px);
                        opacity: 0;
                    }
                }

                @keyframes position {
                    0%, 19.9% {
                        margin-top: 10%;
                        margin-left: 40%;
                    }
                    20%, 39.9% {
                        margin-top: 40%;
                        margin-left: 30%;
                    }
                    40%, 59.9% {
                        margin-top: 20%;
                        margin-left: 70%;
                    }
                    60%, 79.9% {
                        margin-top: 30%;
                        margin-left: 20%;
                    }
                    80%, 99.9% {
                        margin-top: 30%;
                        margin-left: 80%;
                    }
                }
                `}
                    </style>
                </>
            )}
        </div>
    )
}

export default Games