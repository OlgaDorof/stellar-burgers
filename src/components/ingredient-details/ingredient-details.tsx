import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(selectIngredients);
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );
  /** TODO: взять переменную из стора */
  if (!ingredientData) {
    return <Preloader />;
  }
  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
