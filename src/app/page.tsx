"use client"
import CharacterSelection from '@/components/CharacterSelection';
import Games from "@/components/Games";
import Charecter from '@/types/Charecter';
import {useEffect, useState} from "react";

const App: React.FC = () => {
    const [character, setCharacter] = useState<Charecter | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (character) {
            document.body.style.cursor = `url(${character.image}), auto`
        } else {
            document.body.style.cursor = 'default'
        }

        return () => {
            document.body.style.cursor = 'default'
        }
    }, [character])

    return (
        character ?
            <Games /> :
            <CharacterSelection onSelectCharacter={setCharacter} />

    );
};

export default App;
