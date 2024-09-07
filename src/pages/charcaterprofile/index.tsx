import { useFetchCharacter } from "../../hooks/useFetchCharacters";
import { useFetchEpisode } from "../../hooks/useFetchEpisode";
import { useFetchLocation } from "../../hooks/useFetchLocation";
import Style from "./profile.module.css";
import { useParams } from "react-router-dom";
const Profile = () => {
  const { id } = useParams();
  const { character } = useFetchCharacter(id as string);
  const episodeUrl = character?.episode || [];
  const locationUrl = character?.location?.url || "";
  const { location } = useFetchLocation(locationUrl);
  const { episodes } = useFetchEpisode(episodeUrl);

  console.log(location);
  return (
    <div className={Style.container}>
      <div className={Style.profile_wrapper}>
        <div className={Style.character_image}>
          <img src={character?.image} alt={character?.name} />
        </div>
        <div className={Style.character_info}>
          <h1> Name:{character?.name}</h1>
          <h1> Spices:{character?.species}</h1>
          <h1>Gender:{character?.gender}</h1>
          <h1>
            Location:{location?.name} {location?.dimension}{" "}
            {location?.residents?.length}
          </h1>
        </div>
      </div>

      <div>
        <h1 className={Style.heading}>Episode Features In:</h1>
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
