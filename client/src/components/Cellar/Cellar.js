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
            <h1>cellar</h1>
        </div>
    );
}

export default Cellar;