import { useParams } from "react-router-dom";

const Redirect = () => {
  const { code } = useParams();

  return <div>{code}</div>;
};

export default Redirect;
