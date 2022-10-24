import { CircleLoader } from 'react-spinners'
import { CSSProperties } from "react";

const override: CSSProperties = {
   display: "block",
   margin: "0 auto",
   marginTop: "200px",
};

const Spinner = () => {

   return (
      <CircleLoader color="#36d7b7" size={100} cssOverride={override} />
   )
}

export default Spinner