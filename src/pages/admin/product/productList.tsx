import { useGetProductsQuery, useRemoveProductMutation } from '@/api/product';
import { IProduct } from '@/interfaces/product';
import { Table, Button, Skeleton, Popconfirm, Alert } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react'


const AdminProduct = () => {
    const { data: productdata, error, isLoading } = useGetProductsQuery();
    const [removeProduct,{isLoading:isRemoveLoading,isSuccess:isRemoveSuccess}] =useRemoveProductMutation()
    const confirm = (id:number)=>{
        removeProduct(id);
        
    }
    const dataSource = productdata?.map(({ id, name, price }: IProduct) => ({
        key: id,
        name,
        price
    }))

    const columns = [
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Address',
            render: ({ key: id }: any) => (
                <div className='flex space-x-4'>

                    <Button type="primary" className='bg-blue-500'>
                        <Link to={`/admin/product/${id}/edit`}>Sửa</Link>

                    </Button>
                    <Popconfirm
                        title="Xóa vĩnh viễn"
                        description="Bạn chắc chắn muốn xóa"
                        onConfirm={()=>confirm(id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type='primary' danger>Xóa</Button>
                    </Popconfirm>
                   
                </div>
            )
        }
    ];


    return (

        <div>
            <header className='flex justify-between items-center'>
                <h2 className='font-bold text-2xl'>Quản Lý Sản Phẩm </h2>
                <Button type='primary' className='bg-blue-500'><Link to={'add'}>Thêm sản phẩm</Link></Button>
            </header>
            {isRemoveSuccess && <Alert message="Success Text" type="success" />}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
            ;</div>
    )
}

export default AdminProduct
