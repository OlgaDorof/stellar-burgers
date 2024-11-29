import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  canselOrder,
  fetchOrderBurger,
  orderModalData,
  orderRequest
} from '../../slices/orderBurgerSlice';
import { selectIsAuthenticated, selectUser } from '../../slices/registerSlice';
import { deleteAllIngredients } from '../../slices/ingredientsSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { buns, currentIngredients } = useSelector(
    (state) => state.ingredients
  );
  const constructorItems = {
    bun: buns,
    ingredients: currentIngredients
  };

  const { orderRequest, orderModalData } = useSelector(
    (state) => state.orderBurger
  );

  const onOrderClick = () => {
    if (!user.name) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;
    const currentIngredientsname = currentIngredients.map(
      (ingredient) => ingredient._id
    );
    dispatch(
      fetchOrderBurger([constructorItems.bun._id, ...currentIngredientsname])
    );
  };
  const closeOrderModal = () => {
    dispatch(deleteAllIngredients());
    dispatch(canselOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
