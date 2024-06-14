import React from 'react';
import kyoboImage from '../assets/교보문고.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function PopupAd({ onClose}) {
    return (
        <div className="fixed bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg z-50 w-64">
            <p className="text-sm mb-2">새 책을 사고 싶다면?</p>
            <a
                href="https://www.kyobobook.co.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 block"
            >
                <img src={kyoboImage} alt="교보문고" className="mb-2 w-1/2 h-auto mx-auto"/>
            </a>
            <div className="flex justify-between items-center">
                <a
                    href="https://www.kyobobook.co.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline mb-2 block text-sm"
                >
                    교보문고로 이동
                </a>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
        </div>
    );
}

export default PopupAd;