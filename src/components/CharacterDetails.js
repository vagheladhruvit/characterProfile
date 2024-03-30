// src/components/CharacterDetails.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CharacterDetails() {
    const { characterId } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
                const data = await response.json();
                setCharacter(data);
            } catch (error) {
                console.error('Error fetching character details:', error);
            }
        };

        fetchCharacterDetails();
    }, [characterId]);

    if (!character) {
        return <div>Loading...</div>;
    }

    return (
        <div className='character-details'>

            <img className='characterDetailsImage' src={character.image} alt={character.name} />
            <p className='characterDetailsName'>{character.name}</p>


            <p className='characterDetailsStatus'>Status :&nbsp; {character.status}</p>
            <p className='characterDetailsSpecies'>Species :&nbsp; {character.species}</p>
            <p className='characterDetailsGender'>Gender :&nbsp; {character.gender}</p>
            <p className='characterDetailsOrigin'>Origin :&nbsp; {character.origin.name}</p>
            <p className='characterDetailsLocation'>Location :&nbsp; {character.location.name}</p>

            <h3 className='characterDetailsEpisode'>Episodes : &nbsp;</h3>
            <ul className='characterDetailsUl'>
                {character.episode.map(episode => (
                    <li className='characterDetailsLi' key={episode}>{episode}</li>
                ))}
            </ul>

            <p className='characterDetailsURL'>URL :&nbsp;   {character.url}</p>
            <p className='characterDetailsCreated'>Created :&nbsp; {character.created}</p>

        </div>
    );
}

export default CharacterDetails;
