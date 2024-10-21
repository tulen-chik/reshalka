import React from 'react'

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

export default CongratulatoryModal