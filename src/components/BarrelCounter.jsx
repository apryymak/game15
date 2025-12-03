import React, { useEffect, useState } from 'react'
import './BarrelCounter.css'

const BarrelDigit = ({ value }) => {

    const FACE_HEIGHT = 20;
    const RADIUS = 31; // Approx for 20px height (20 / (2 * tan(18deg)) ~= 30.77)

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
                            height: `${FACE_HEIGHT}px`,
                            transform: `rotateX(${num * 36}deg) translateZ(${RADIUS}px)`
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
