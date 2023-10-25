import { Card, ListGroup } from 'react-bootstrap';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHouses } from '../redux/housesSlice';
import { Link } from "react-router-dom";

function HouseContainer() {
    const dispatch = useDispatch();
    const houses = useSelector(state => state.houses);

    const sortedHouses = [...houses].sort((a,b) => {
        if (a.city < b.city) return -1;
        if (a.city > b.city) return 1;
        if (a.street_name < b.street_name) return -1;
        if (a.street_name > b.street_name) return 1;
        return a.house_number - b.house_number;
    })

    useEffect(() => {
        dispatch(fetchHouses());
    }, [dispatch]);


    return (
        <ListGroup>
            {sortedHouses.map(house => (
                <ListGroup.Item key={house.id}>
                    <Link to={`/houses/${house.id}`}>
                        {house.house_number} {house.street_name}, {house.city}, {house.zip_code}
                    </Link>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default HouseContainer;