import { useFetchCharacter } from "../../hooks/useFetchCharacters";
import { useFetchEpisode } from "../../hooks/useFetchEpisode";
import { useFetchLocation } from "../../hooks/useFetchLocation";
import Style from "./profile.module.css";
import { useParams } from "react-router-dom";
import LocationSvg from "../../assets/location.svg";
import Spinner from "../../components/spinner";
const Profile = () => {
  const { id } = useParams();
  const { character, loading } = useFetchCharacter(id as string);

  const episodeUrl = character?.episode || [];

  const { characterlocation } = useFetchLocation(character as User);
  const { episodes } = useFetchEpisode(episodeUrl);

  console.log(characterlocation);

  return (
    <div className={Style.container}>
      <Spinner loading={loading} />

      <div className={Style.profile_wrapper}>
        <div className={Style.character_image}>
          <img
            src={character?.image}
            alt={character?.name}
            className={Style.image}
          />
        </div>
        <div className={Style.character_info}>
          <h1 className={Style.character_name}>{character?.name}</h1>
          <div className={Style.location_wrapper}>
            <img src={LocationSvg} className={Style.location_svg} />
            <span className={Style.location_name}>
              {characterlocation?.name}{" "}
            </span>

            <span className={Style.location_name}>
              <span>Dimension:</span> {characterlocation?.dimension}
            </span>
            <span className={Style.location_name}>
              <span>Residents:</span>
              {characterlocation?.residents?.length}
            </span>
          </div>
          <div className={Style.character_other_info}>
            <span className={Style.pill}> {character?.species}</span>
            <span className={Style.pill}>{character?.gender}</span>
          </div>
        </div>
      </div>

      <div>
        <h1 className={Style.heading}>Episodes Featured In</h1>
        <div className={Style.episode}>
          {episodes?.map((episode: Episode) => (
            <div key={episode?.id} className={Style.card}>
              <p className={Style.card_name}>{episode?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
