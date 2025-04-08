import React from 'react'
import ProductTable from '../ProductTable'
import ProductRow from '../ProductRow'

const inventoryData = [
    {
        id: 1,
        name: "iPhone 14 Pro Max 512...",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/a227c4235a179fa3e59e43e6706af4fac334d72a",
        price: "$1299",
        skus: "1000",
        category: "Electronics",
        dateAdded: "02 April, 2025",
    },
    {
        id: 2,
        name: "iPhone 13 512GB (Purple)",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/d0d5a026f7f288bbabff9a620ff83a488a9add94",
        price: "$1100",
        skus: "2000",
        category: "Electronics",
        dateAdded: "02 April, 2025",
    },
];

const inventoryColumns = [
    { header: "Sl.No." },
    { header: "Product Name" },
    { header: "Selling price" },
    { header: "SKUs" },
    { header: "Category" },
    { header: "Date added" },
    { header: "Actions" },
];




function MyProduct() {
    return (
        <div className='w-full flex flex-col gap-5 '>
            <h1 className="text-2xl font-semibold ">Your product listings</h1>
            <span className="text-base  mb-5">Find all the products you’ve listed on Connection</span>

            <ProductTable columns={inventoryColumns}>
                {inventoryData.map((item, index) => (
                    <ProductRow key={item.id} type="inventory" index={index} data={item} />
                ))}
            </ProductTable>

        </div>
    )
}

export default MyProduct