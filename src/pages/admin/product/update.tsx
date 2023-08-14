import { useAddProductMutation, useGetProductByidQuery, useUpdateProductMutation } from '@/api/product';
import { IProduct } from '@/interfaces/product'
import { Button, Form, Input, Skeleton } from 'antd'
import React, { useEffect } from 'react'
import { AiOutlineLoading } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';

type FieldType = {
    name: string;
    price: number;
}

const UpdateProduct = () => {
    const { idProduct } = useParams<{ idProduct: string }>();
    const { data: productdata, isLoading } = useGetProductByidQuery(idProduct || "")
    const navigate = useNavigate()
    const [UpdateProduct] = useUpdateProductMutation()
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            name: productdata?.name,
            price: productdata?.price
        })
    }, [productdata])
    const onFinish = (values: IProduct) => {
        UpdateProduct({...values,id:idProduct}).unwrap().then(() => navigate("/admin/product"))

    }
    return (
        <div>
            <header>
                <h2 className='font-bold text-2xl mb-14'>Sửa sản phẩm</h2>
            </header>
            {isLoading ? <Skeleton /> : <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Tên sản phẩm"
                    name="name"
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
                        { min: 3, message: 'Sản phẩm ít nhất 3 ký tự !' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Giá sản phẩm"
                    name="price"
                    rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button className='bg-blue-500' type="primary" htmlType="submit">
                        {isLoading ? (<AiOutlineLoading className="animate-spin" />) : (
                            "Sửa"
                        )}
                    </Button>
                </Form.Item>
            </Form>}

        </div>
    )
}

export default UpdateProduct