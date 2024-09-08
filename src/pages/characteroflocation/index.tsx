import React from "react";
import Style from "./charactoroflocation.module.css";
import { useParams, Link } from "react-router-dom";
import { useFetchCharactersOfEpsiode } from "../../hooks/useFetchCharacters";
import { useFetchOneLocation } from "../../hooks/useFetchLocation";
const CharactersOfLocation = () => {
  const { id } = useParams();
  const { location } = useFetchOneLocation(id as string);

  const characterUrl = location?.residents || [];
  const { characters } = useFetchCharactersOfEpsiode(characterUrl);
  console.log(characters);
  return (
    <div className={Style.container}>
      <div>
        <h1>{location?.name}</h1>
      </div>
      <div>
        <p>all the charactesr of this location</p>

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

export default CharactersOfLocation;
