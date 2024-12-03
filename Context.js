import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [userId, setUserId] = useState(null);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [vacationType, setVacationType] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [sights, setSights] = useState([]);
  const [eatingPlaces, setEatingPlaces] = useState([]);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        country,
        setCountry,
        city,
        setCity,
        vacationType,
        setVacationType,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        sights,
        setSights,
        eatingPlaces,
        setEatingPlaces,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
