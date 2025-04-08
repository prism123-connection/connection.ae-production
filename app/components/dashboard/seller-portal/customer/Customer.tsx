import React from 'react'
import ProductTable from '../ProductTable'
import ProductRow from '../ProductRow'

const ordersData = [
    {
        id: 1,
        name: "iPhone 14 Pro Max 512...",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/a227c4235a179fa3e59e43e6706af4fac334d72a",
        price: "$1299",
        skus: "1000",
        customer: {
            name: "Rose",
            avatar: "URL_AVATAR",
        },
        purchaseDate: "02 April, 2025",
    },
    {
        id: 2,
        name: "iPhone 14 Pro Max 512...",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/a227c4235a179fa3e59e43e6706af4fac334d72a",
        price: "$1299",
        skus: "1000",
        customer: {
            name: "Rose",
            avatar: "URL_AVATAR",
        },
        purchaseDate: "02 April, 2025",
    },
    {
        id: 32,
        name: "iPhone 14 Pro Max 512...",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/a227c4235a179fa3e59e43e6706af4fac334d72a",
        price: "$1299",
        skus: "1000",
        customer: {
            name: "Rose",
            avatar: "URL_AVATAR",
        },
        purchaseDate: "02 April, 2025",
    },
    {
        id: 5,
        name: "iPhone 14 Pro Max 512...",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/a227c4235a179fa3e59e43e6706af4fac334d72a",
        price: "$1299",
        skus: "1000",
        customer: {
            name: "Rose",
            avatar: "URL_AVATAR",
        },
        purchaseDate: "02 April, 2025",
    },
];

const orderColumns = [
    { header: "Sl.No." },
    { header: "Product Name" },
    { header: "Deal Amount" },
    { header: "SKUs" },
    { header: "Customer" },
    { header: "Date" },
    { header: "Actions" },
];


function Customers() {
    return (
        <div className='w-full flex flex-col gap-5 '>
            <h1 className="text-2xl font-semibold ">Your customers</h1>
            <span className="text-base  mb-5">Find all the customers who purchased from you on Connection</span>

            <ProductTable columns={orderColumns}>
                {ordersData.map((order, index) => (
                    <ProductRow key={order.id} type="orders" index={index} data={order} />
                ))}
            </ProductTable>

        </div>
    )
}

export default Customers