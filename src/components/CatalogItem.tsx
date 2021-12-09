import { IProduct } from "../store/modules/cart/types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";


import { addProductToCartRequest } from "../store/modules/cart/action";
import { IState } from "../store";

interface CatalogItemProps {
     product: IProduct;
}

export function CatalogItem({ product }: CatalogItemProps) {
     const dispatch = useDispatch();

     const hasFailedStockCheck = useSelector<IState, boolean>(state => {
          return state.cart.failedStockCheck.includes(product.id);
     })

     const handleAddProductToCart = useCallback(() => {
          dispatch(addProductToCartRequest(product));
     }, [dispatch, product]);

     return (
          <article >
               <strong>{product.title}</strong> {" _ "}
               <span> {product.price}</span>{" "}
               <button className=" button'
"
                    onClick={() => handleAddProductToCart()}>
                    Comprar
               </button>

               {hasFailedStockCheck && <span style={{ color: 'red' }} > Falta de Estoque </span>}
          </article>
     )
}

export default CatalogItem;