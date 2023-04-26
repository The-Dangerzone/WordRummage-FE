import { useContext } from "react";
import { SettingsContext } from "../../Context/Settings";

const TitleScreen = (props) => {

  const { isLoggedIn, setIsLoggedIn }= useContext(SettingsContext);

  const handleClick = () => {
    setIsLoggedIn(!isLoggedIn);
  }
  
  return (
    <>
      <h1>Title Screen</h1>
      <p>Is logged in? {isLoggedIn.toString()}</p>
      <button onClick={handleClick}>Click Me!</button>
    </>
  );
}

export default TitleScreen;