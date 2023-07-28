import { useEffect, useState, useCallback } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import useRequest from "../../hooks/use-request";

const AvailableMeals = () => {
  const [mealsData, setMealsData] = useState([]);

  const saveMealsData = useCallback((data) => {
    const retrievedMeals = [];
    for (const key in data) {
      retrievedMeals.push({
        key,
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price
      });
    }
    setMealsData([...retrievedMeals]);
  }, []);

  const { isLoading, error, sendRequest } = useRequest();

  //load data from request when component initialises: useEffect
  useEffect(() => {
    const requestConfig = {
      url:
        "https://food-order-app-ac388-default-rtdb.firebaseio.com/food-order/availableMeals.json"
    };
    sendRequest(requestConfig, saveMealsData);
  }, [sendRequest, saveMealsData]);

  const mealsList = mealsData.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
