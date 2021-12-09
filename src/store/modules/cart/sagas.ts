import { AxiosResponse } from 'axios';
import { all, call, select, takeLatest, put } from 'redux-saga/effects'
import { IState } from '../..';
import api from '../../../service/api';
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './action';
import { ActionTypes } from './types';

interface IStockResponse {
     id: number,
     quantity: number;
}

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>

function* checkProductStock({ payload }: CheckProductStockRequest) {
     const { product } = payload;

     const currentQuantity: number = yield select((state: IState) => {

          return state.cart.items.find(item => item.product.id === product.id)?.quantity || 0;
     })

     const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);

     if (availableStockResponse.data.quantity > currentQuantity) {
          yield put(addProductToCartSuccess(product))
          console.log("Deu Certo");
     }
     else {
          yield put(addProductToCartFailure(product.id))
          console.log("Falta de Estoque")
     }


};


export default all([

     takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)

])