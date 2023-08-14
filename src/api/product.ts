import { IProduct } from '@/interfaces/product'
import { pause } from '@/utils/pause';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { Provider } from 'react-redux';
const productApi = createApi ({
    reducerPath: 'product',
    tagTypes: ['Product'],
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:3000",
        fetchFn: async (...args)=>{
             await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints:(builder)=>({
        getProducts:builder.query<IProduct[], void>({
            query:()=> `/products`,
            providesTags: ['Product']
        }),
        getProductByid:builder.query<IProduct, number | string>({
            query:(id)=> `/products/${id}`,
            providesTags: ['Product']
        }),
        removeProduct:builder.mutation<void, number>({
            query:(id)=> ({
                url:`/products/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product']
        }),
        addProduct:builder.mutation<IProduct, IProduct>({
            query:(product)=> ({
                url:`/products`,
                method: 'POST',
                body:product
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct:builder.mutation<IProduct, IProduct>({
            query:(product)=> ({
                url:`/products/${product.id}`,
                method: 'PATCH',
                body: product
            }),
            invalidatesTags: ['Product']
        })
    })
})
export const {
    useGetProductsQuery,
    useRemoveProductMutation,
    useAddProductMutation,
    useUpdateProductMutation,
    useGetProductByidQuery
} =productApi;
export const productReducer = productApi.reducer
export default productApi