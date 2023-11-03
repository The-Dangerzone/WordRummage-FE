import React from "react";
import { useContext } from "react";
import { UserContext } from '../../Context/User';


const UserProfile = () => {

  const { validUser } = useContext(UserContext);

  return (

    <div>
      <h2>Percentage: {validUser.accuracy.percentage} %</h2>
    </div>

  );
};

export default UserProfile;