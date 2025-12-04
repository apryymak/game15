import React from 'react'

const Footer = () => {
    const MyStyles = {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000000',
        fontSize: '0.8rem',
        position: 'relative',
        top: 170,
        borderRadius: 25,
        padding: 10,
        backgroundColor: '#ffffff',
        width: 200,
        left: '50'
    }
    return (
        <p style={MyStyles}>&copy; 2025 Alex Pryymak.</p>
    )
}
export default Footer