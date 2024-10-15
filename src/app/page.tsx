"use client"
import CharacterSelection from '@/components/CharacterSelection';
import Games from "@/components/Games";
import {useEffect, useState} from "react";

const App: React.FC = () => {
    const [character, setCharacter] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        character ?
            <Games /> :
            <CharacterSelection onSelectCharacter={setCharacter} />

    );
};

export default App;
