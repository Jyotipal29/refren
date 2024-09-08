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
      <div className={Style.location_name_warpper}>
        <h1 className={Style.location_name}>{episode?.name}</h1>
      </div>
      <div>
        <p className={Style.sub_heading}>all the charactesr of this episode</p>

        <div className={Style.character_wrapper}>
          {characters.map((character: User) => (
            <div key={character.id} className={Style.character_card}>
              <img src={character.image} className={Style.character_image} />
              <p className={Style.character_name}>{character.name}</p>
              <Link
                to={`/profile/${character.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <button className={Style.button}>view profile</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharactersOfEpisode;
