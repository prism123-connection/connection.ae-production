import React from 'react'
import ProductTable from '../ProductTable'
import ProductRow from '../ProductRow'

const liveProductsData = [
    {
      id: 1,
      name: "iPhone 14 Pro Max 512GB (Gold)",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/bef4b1affa4355b9f547fa2feb52c86310197119",
      grade: "$1299",
      skus: "1000",
      liveStream: "02/04/2025 UTC 05:00 PM",
      status: "Scheduled",
    },
    {
        id: 2,
        name: "iPhone 13 512GB (Purple)",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/296644ad760d833296754747c7fe23749c7f2adf",
        grade: "$1100",
        skus: "2000",
        liveStream: "02/04/2025 UTC 05:00 PM",
        status: "Scheduled",
      },
]

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
  ];

const liveProductColumns = [
    { header: "Sl.No." },
    { header: "Product Name" },
    { header: "Grade" },
    { header: "SKUs" },
    { header: "Live stream" },
    { header: "Action" },
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

  const orderColumns = [
    { header: "Sl.No." },
    { header: "Product Name" },
    { header: "Selling price" },
    { header: "SKUs" },
    { header: "Customer" },
    { header: "Date purchased" },
    { header: "Actions" },
  ];


function SellingProduct() {
  return (
    <div className='w-full flex flex-col gap-5 '>
      <h1 className="text-2xl font-semibold mb-5">Selling Product "Live"</h1>

      <ProductTable columns={liveProductColumns}>
  {liveProductsData.map((product, index) => (
    <ProductRow key={product.id} type="live" index={index} data={product} />
  ))}
</ProductTable>

{/* // Inventory
<ProductTable columns={inventoryColumns}>
  {inventoryData.map((item, index) => (
    <ProductRow key={item.id} type="inventory" index={index} data={item} />
  ))}
</ProductTable>

// Orders
<ProductTable columns={orderColumns}>
  {ordersData.map((order, index) => (
    <ProductRow key={order.id} type="orders" index={index} data={order} />
  ))}
</ProductTable> */}
        
    </div>  
  )
}

export default SellingProduct