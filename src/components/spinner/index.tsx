import FadeLoader from "react-spinners/FadeLoader";
type CSSProperties = {
  display: string;
  margin: string;
  borderColor: string;
};

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "black",
};

const Spinner = ({ loading }: any) => {
  return (
    <div>
      <FadeLoader
        color="black"
        loading={loading}
        cssOverride={override}
        // size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
