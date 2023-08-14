import { useAddProductMutation } from '@/api/product';
import { IProduct } from '@/interfaces/product'
import { Button, Form, Input } from 'antd'
import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

type FieldType = {
    name: string;
    price: number;
}

const AddProduct = () => {
    const navigate = useNavigate()
    const [addProduct,{isLoading,isSuccess}]=useAddProductMutation();

    const onFinish = (values:IProduct)=>{
        addProduct(values).unwrap().then(()=>navigate("/admin/product"))
        
    }
  return (
    <div>
        <header>
            <h2 className='font-bold text-2xl'>Thêm sản phẩm</h2>
        </header>
        <Form
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
        {isLoading ? (<AiOutlineLoading className="animate-spin"/>):(
            "Thêm sản phẩm"
        )}
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}

export default AddProduct