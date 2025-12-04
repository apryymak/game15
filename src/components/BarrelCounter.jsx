import React, { useEffect, useState } from 'react'
import './BarrelCounter.css'

const BarrelDigit = ({ value }) => {
    const [faceHeight, setFaceHeight] = useState(20);
    const [radius, setRadius] = useState(31);

    useEffect(() => {
        const updateDimensions = () => {
            const isMobile = window.matchMedia('(max-width: 600px)').matches;
            const newHeight = isMobile ? 13 : 20;
            const newRadius = isMobile ? 20 : 31; // Approx for 13px height (13 / (2 * tan(18deg)) ~= 20)
            setFaceHeight(newHeight);
            setRadius(newRadius);
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return (
        <div className="barrel-container">
            <div
                className="barrel"
                style={{ transform: `rotateX(${value * -36}deg)` }}
            >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <div
                        key={num}
                        className="barrel-face"
                        style={{
                            height: `${faceHeight}px`,
                            transform: `rotateX(${num * 36}deg) translateZ(${radius}px)`
                        }}
                    >
                        {num}
                    </div>
                ))}
            </div>
        </div>
    )
}

const BarrelCounter = ({ value, digits = 3 }) => {
    // Pad value with leading zeros
    const stringValue = value.toString().padStart(digits, '0')
    const digitArray = stringValue.split('').map(Number)

    // If value exceeds digits, we just show the last 'digits' numbers or expand?
    // Let's expand if needed, but default to showing at least 'digits'
    const displayDigits = digitArray.length > digits ? digitArray : digitArray

    return (

        <div className="barrel-counter-frame">
            {displayDigits.map((digit, index) => (
                <BarrelDigit key={index} value={digit} />
            ))}
        </div>

    )
}

export default BarrelCounter
