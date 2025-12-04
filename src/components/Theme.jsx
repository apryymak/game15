import React from 'react';
import './Theme.css';

const Theme = ({ theme }) => {
    const themes = ['spring', 'summer', 'autumn', 'winter'];

    return (
        <>
            {themes.map((t) => (
                <div
                    key={t}
                    className={`theme-background ${t} ${theme === t ? 'active' : ''}`}
                ></div>
            ))}

            {theme === 'autumn' && (
                <>
                    <div className="falling-leaf" style={{ left: '2%', animationDelay: '0s', animationDuration: '25s, 6s, 5s', animationName: 'fall, rotate, sway', fontSize: '2.5rem' }}>🍁</div>
                    <div className="falling-leaf" style={{ left: '98%', animationDelay: '5s', animationDuration: '28s, 5s, 7s', animationName: 'fall, rotate-reverse, sway-reverse', fontSize: '3.2rem' }}>🍁</div>
                    <div className="falling-leaf" style={{ left: '8%', animationDelay: '10s', animationDuration: '22s, 7s, 6s', animationName: 'fall, rotate-reverse, sway', fontSize: '2.2rem' }}>🍁</div>
                    <div className="falling-leaf" style={{ left: '92%', animationDelay: '15s', animationDuration: '26s, 4s, 8s', animationName: 'fall, rotate, sway-reverse', fontSize: '3.8rem' }}>🍁</div>
                </>
            )}

            {theme === 'winter' && (
                <>
                    <div className="falling-snow" style={{ left: '5%', animationDelay: '0s', animationDuration: '20s, 6s, 5s', animationName: 'fall, rotate, sway', fontSize: '1.5rem' }}>❄️</div>
                    <div className="falling-snow" style={{ left: '95%', animationDelay: '5s', animationDuration: '25s, 5s, 7s', animationName: 'fall, rotate-reverse, sway-reverse', fontSize: '1.9rem' }}>❄️</div>
                    <div className="falling-snow" style={{ left: '10%', animationDelay: '10s', animationDuration: '18s, 7s, 6s', animationName: 'fall, rotate-reverse, sway', fontSize: '1.3rem' }}>❄️</div>
                    <div className="falling-snow" style={{ left: '90%', animationDelay: '15s', animationDuration: '22s, 4s, 8s', animationName: 'fall, rotate, sway-reverse', fontSize: '2.3rem' }}>❄️</div>
                    <div className="falling-snow" style={{ left: '20%', animationDelay: '2s', animationDuration: '23s, 5s, 6s', animationName: 'fall, rotate, sway', fontSize: '1.6rem' }}>❄️</div>
                    <div className="falling-snow" style={{ left: '80%', animationDelay: '7s', animationDuration: '21s, 6s, 5s', animationName: 'fall, rotate-reverse, sway-reverse', fontSize: '1.8rem' }}>❄️</div>
                    <div className="falling-snow" style={{ left: '30%', animationDelay: '12s', animationDuration: '26s, 4s, 7s', animationName: 'fall, rotate, sway', fontSize: '1.4rem' }}>❄️</div>
                    <div className="falling-snow" style={{ left: '70%', animationDelay: '17s', animationDuration: '19s, 7s, 4s', animationName: 'fall, rotate-reverse, sway-reverse', fontSize: '2.0rem' }}>❄️</div>
                    <div className="falling-snow" style={{ left: '40%', animationDelay: '4s', animationDuration: '24s, 5s, 6s', animationName: 'fall, rotate, sway', fontSize: '1.7rem' }}>❄️</div>
                    <div className="falling-snow" style={{ left: '60%', animationDelay: '9s', animationDuration: '27s, 6s, 5s', animationName: 'fall, rotate-reverse, sway-reverse', fontSize: '1.5rem' }}>❄️</div>
                    <div className="falling-snow" style={{ left: '15%', animationDelay: '14s', animationDuration: '20s, 4s, 7s', animationName: 'fall, rotate, sway', fontSize: '2.1rem' }}>❄️</div>
                    <div className="falling-snow" style={{ left: '85%', animationDelay: '1s', animationDuration: '25s, 7s, 4s', animationName: 'fall, rotate-reverse, sway-reverse', fontSize: '1.2rem' }}>❄️</div>
                    <div className="falling-snow" style={{ left: '25%', animationDelay: '6s', animationDuration: '22s, 5s, 6s', animationName: 'fall, rotate, sway', fontSize: '1.9rem' }}>❄️</div>
                    <div className="falling-snow" style={{ left: '75%', animationDelay: '11s', animationDuration: '18s, 6s, 5s', animationName: 'fall, rotate-reverse, sway-reverse', fontSize: '1.4rem' }}>❄️</div>
                    <div className="falling-snow" style={{ left: '35%', animationDelay: '16s', animationDuration: '28s, 4s, 7s', animationName: 'fall, rotate, sway', fontSize: '2.2rem' }}>❄️</div>
                    <div className="falling-snow" style={{ left: '65%', animationDelay: '3s', animationDuration: '21s, 7s, 4s', animationName: 'fall, rotate-reverse, sway-reverse', fontSize: '1.6rem' }}>❄️</div>
                    <div className="falling-snow" style={{ left: '50%', animationDelay: '8s', animationDuration: '24s, 5s, 6s', animationName: 'fall, rotate, sway', fontSize: '1.8rem' }}>❄️</div>
                    <div className="falling-snow" style={{ left: '45%', animationDelay: '13s', animationDuration: '26s, 6s, 5s', animationName: 'fall, rotate-reverse, sway-reverse', fontSize: '1.3rem' }}>❄️</div>
                    <div className="falling-snow" style={{ left: '55%', animationDelay: '18s', animationDuration: '23s, 4s, 7s', animationName: 'fall, rotate, sway', fontSize: '2.0rem' }}>❄️</div>
                    <div className="falling-snow" style={{ left: '5%', animationDelay: '19s', animationDuration: '29s, 7s, 4s', animationName: 'fall, rotate-reverse, sway-reverse', fontSize: '1.5rem' }}>❄️</div>
                </>
            )}
        </>
    );
};

export default Theme;
