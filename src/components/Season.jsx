import React from 'react'
import './Season.css'

const Season = ({ season }) => {
    const seasons = ['spring', 'summer', 'autumn', 'winter'];

    return (
        <>
            {seasons.map((s) => (
                <div
                    key={s}
                    className={`season-background ${s} ${season === s ? 'active' : ''}`}
                ></div>
            ))}
        </>
    )
}

export default Season
