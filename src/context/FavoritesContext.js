import React, {createContext, useState, useEffect} from 'react';


//Create context

export const FavoritesContext = createContext();

export const FavoritesProvider = (props) => {
    
        //create state
        const [favorites, setFavorites] = useState([]);
    
        //get data from LocalStorage
        useEffect(() => {
            const getFavorites = async () => {
                const favorites = await JSON.parse(localStorage.getItem('favorites'));
                if(favorites){
                    setFavorites(favorites);
                }
            }
            getFavorites();
        }, []);

        //save data to LocalStorage
        useEffect(() => {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }, [favorites])
        
        return (
            <FavoritesContext.Provider value={{favorites: favorites, setFavorites: setFavorites}}>
                {props.children}
            </FavoritesContext.Provider>
        )

}



