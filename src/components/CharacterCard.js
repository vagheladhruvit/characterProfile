// src/components/CharacterCard.js

import React from 'react';
import { useHistory } from 'react-router-dom';

function CharacterCard({ character }) {
    const history = useHistory();

    const handleDetailsClick = () => {
        history.push(`/characters/${character.id}`);
    };

    return (
        <div className='character-card'>
            <img className='characterImage' src={character.image} alt={character.name} />
            <ul>
                <li className='characterName'>{character.name}</li>
                <li className='characterType'>Type : &nbsp; {character.type}</li>
                <li className='characterTotalEpisodes'>Total Episodes :&nbsp; {character.episode.length}</li>
                <li className='characterLocation'>Location :&nbsp; {character.location.name}</li>
                <li className='CharacterDetailsText2'>
                    <button className='CharacterDetailsButton' onClick={handleDetailsClick}>
                        Details
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default CharacterCard;
