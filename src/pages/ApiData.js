import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ApiData = () => {
  const { getAccessTokenSilently ,isAuthenticated} = useAuth0();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);


   useEffect(() => {
      const saveToken = async () => {
        if (isAuthenticated) {
          try {
            const token = await getAccessTokenSilently();
            console.log("Session Access Token:", token);
  
            localStorage.setItem("access_token", token);
          } catch (error) {
            console.error("Error getting access token:", error);
          }
        }
      };
  
      saveToken();
    }, [isAuthenticated, getAccessTokenSilently]);
  useEffect(() => {
const fetchData = async () => {
  try {

   const token = localStorage.getItem("access_token")

    console.log(token);

    const response = await fetch("https://localhost:7039/api/Department/get-all-departments", {
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
    });

    console.log("Response Status:", response.status);
    const responseText = await response.text();
    console.log("Response Body:", responseText);

    if (!response.ok) {
      throw new Error(`Failed to fetch API data: ${response.status}`);
    }

    const result = JSON.parse(responseText);
    setData(result);
  } catch (err) {
    setError(err.message);
  }
};

    fetchData();
  }, [getAccessTokenSilently]);

  return (
    <div>
      <h1>Secured API Data</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ApiData;
