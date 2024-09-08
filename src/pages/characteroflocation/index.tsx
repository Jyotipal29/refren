import React from "react";
import Style from "./charactoroflocation.module.css";
import { useParams, Link } from "react-router-dom";
import { useFetchCharactersOfEpsiode } from "../../hooks/useFetchCharacters";
import { useFetchOneLocation } from "../../hooks/useFetchLocation";
import LocationSvg from "../../assets/location.svg";

const CharactersOfLocation = () => {
  const { id } = useParams();
  const { location } = useFetchOneLocation(id as string);

  const characterUrl = location?.residents || [];
  const { characters } = useFetchCharactersOfEpsiode(characterUrl);
  console.log(characters);
  return (
    <div className={Style.container}>
      <div className={Style.location_name_warpper}>
        <img
          src={LocationSvg}
          className={Style.name_image}
          alt={location?.name}
        />
        <h1 className={Style.location_name}>{location?.name}</h1>
      </div>
      <div>
        <p className={Style.sub_heading}>all the characters of this location</p>

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

export default CharactersOfLocation;
