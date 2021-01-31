/**
 * Cellar.js : Page de visualisation de la cave
 */
import React from 'react';
import './style.scss';

function Cellar(props) {
    return (
        <div className="cellarContainer"
        style={{
            backgroundImage:"url(images/cave.jpg)",
        }}>
            Cellar
        </div>
    );
}

export default Cellar;