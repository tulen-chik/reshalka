import React from 'react';

interface CongratulatoryModalProps {
    category: string;
    onClose: () => void;
}

const CongratulatoryModal: React.FC<CongratulatoryModalProps> = ({ category, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative overflow-hidden">
                <h2 className="text-3xl font-bold mb-4 text-center text-green-600">Поздравляем!</h2>
                <p className="text-xl mb-6 text-center">
                    Вы успешно прошли все игры в категории "{category}"!
                </p>
                <div className="flex justify-center">
                    <button onClick={onClose}
                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Вернуться к выбору категории
                    </button>
                </div>
                <div className="firework"></div>
                <div className="firework"></div>
                <div className="firework"></div>
                <div className="firework"></div>
                <div className="firework"></div>
                <div className="firework"></div>
            </div>
            <style>
                {`
                @keyframes firework {
0% { transform: translate(var(--x), var(--initialY)); width: var(--initialSize); opacity: 1; }
50% { width: 0.5vmin; opacity: 1; }
100% { width: var(--finalSize); opacity: 0; }
                }

                .firework,
                .firework::before,
                .firework::after {
                  --initialSize: 1vmin; /* Увеличен начальный размер */
                  --finalSize: 60vmin; /* Увеличен конечный размер */
                  --particleSize: 0.5vmin; /* Увеличен размер частиц */
                  --color1: yellow;
                  --color2: khaki;
                  --color3: white;
                  --color4: lime;
                  --color5: gold;
                  --color6: mediumseagreen;
                  --y: -30vmin;
                  --x: -50%;
                  --initialY: 60vmin;
                  content: "";
                  animation: firework 2s infinite;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, var(--y));
                  width: var(--initialSize);
                  aspect-ratio: 1;
                  background: radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 50% 0%,
                    radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 100% 50%,
                    radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 50% 100%,
                    radial-gradient(circle, var(--color4) var(--particleSize), #0000 0) 0% 50%;
                  background-size: var(--initialSize) var(--initialSize);
                  background-repeat: no-repeat;
                }

                .firework::before {
                  --x: -50%;
                  --y: -50%;
                  --initialY: -50%;
                  transform: translate(-50%, -50%) rotate(40deg) scale(1.3) rotateY(40deg);
                }

                .firework::after {
                  --x: -50%;
                  --y: -50%;
                  --initialY: -50%;
                  transform: translate(-50%, -50%) rotate(170deg) scale(1.15) rotateY(-30deg);
                }

                .firework:nth-child(2) {
                  --x: 30vmin;
                }

                .firework:nth-child(2),
                .firework:nth-child(2)::before,
                .firework:nth-child(2)::after {
                  --color1: pink;
                  --color2: violet;
                  --color3: fuchsia;
                  --color4: orchid;
                  --color5: plum;
                  --color6: lavender; --finalSize: 55vmin; /* Увеличен конечный размер */
                  left: 30%;
                  top: 60%;
                  animation-delay: -0.25s;
                }

                .firework:nth-child(3) {
                  --x: -30vmin;
                  --y: -50vmin;
                }

                .firework:nth-child(3),
                .firework:nth-child(3)::before,
                .firework:nth-child(3)::after {
                  --color1: cyan;
                  --color2: lightcyan;
                  --color3: lightblue;
                  --color4: PaleTurquoise;
                  --color5: SkyBlue;
                  --color6: lavender;
                  --finalSize: 50vmin; /* Увеличен конечный размер */
                  left: 70%;
                  top: 60%;
                  animation-delay: -0.4s;
                }
                `}
            </style>
        </div>
    );
};

export default CongratulatoryModal;
