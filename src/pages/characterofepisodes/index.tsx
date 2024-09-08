import Style from "./characterofepisode.module.css";
import { useParams, Link } from "react-router-dom";
import { useFetchOneEpisode } from "../../hooks/useFetchEpisode";
import { useFetchCharactersOfEpisode } from "../../hooks/useFetchCharacters";
import Spinner from "../../components/spinner";
const CharactersOfEpisode = () => {
  const { id } = useParams();
  const { episode } = useFetchOneEpisode(id as string);

  const { characters, loading } = useFetchCharactersOfEpisode(
    episode as Episode
  );
  return (
    <div className={Style.container}>
      <div className={Style.location_name_warpper}>
        <h1 className={Style.location_name}>{episode?.name}</h1>
      </div>
      <div>
        <p className={Style.sub_heading}>all the charactesr of this episode</p>

        <Spinner loading={loading} />

        <div className={Style.character_wrapper}>
          {characters?.map((character: User) => (
            <div key={character?.id} className={Style.character_card}>
              <img src={character?.image} className={Style.character_image} />
              <p className={Style.character_name}>{character?.name}</p>
              <Link
                to={`/profile/${character?.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <button className={Style.button}>View Profile</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharactersOfEpisode;
