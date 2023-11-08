import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { UserContext } from '../../Context/User';


const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { validUser } = useContext(UserContext);


    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <div>
                <img src={user.picture} alt={user.name} />
                {/* <h2>{user.name}</h2> */}
                <h2>{validUser.displayName}</h2>
                {/* <p>{user.email}</p> */}
            </div>
        )
    );
};

export default Profile;