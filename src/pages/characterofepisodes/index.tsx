import React from "react";
import Style from "./characterofepisode.module.css";
import { useParams, Link } from "react-router-dom";
import { useFetchOneEpisode } from "../../hooks/useFetchEpisode";
import { useFetchCharactersOfEpsiode } from "../../hooks/useFetchCharacters";
const CharactersOfEpisode = () => {
  const { id } = useParams();
  const { episode } = useFetchOneEpisode(id as string);

  const characterUrl = episode?.characters || [];
  const { characters } = useFetchCharactersOfEpsiode(characterUrl);
  console.log(characters);
  return (
    <div className={Style.container}>
      <div>
        <h1>{episode?.name}</h1>
      </div>
      <div>
        <p>all the charactesr of this episode</p>

        <div className={Style.character_wrapper}>
          {characters.map((character: User) => (
            <Link
              to={`/profile/${character.id}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <div key={character.id} className={Style.character_card}>
                <img src={character.image} className={Style.character_image} />
                <p className={Style.character_name}>{character.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharactersOfEpisode;
