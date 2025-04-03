import React from 'react'
import { EcommerceProductCard } from '../main/ProductCard';

const products = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c294479147fb98a8501bd8b224b5735f97c19f58",
      title: "HAVIT HV-G92 Gamepad",
      price: 120,
      originalPrice: 160,
      rating: 5,
      reviews: 88,
      discount: 40,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bc4214fc345cbcc392ba2adc1b5ec88b6e6df170",
      title: "AK-900 Wired Keyboard",
      price: 960,
      originalPrice: 1160,
      rating: 4,
      reviews: 75,
      discount: 35,
      isLive: true,
      skus: 1000,
    },
    {
        image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/gamepad/f/r/u/elite-ops-wireless-with-type-c-charging-evofox-original-imah6dzhjzwvubxx.jpeg?q=90&crop=false",
        title: "HAVIT HV-G92 Gamepad",
        price: 120,
        originalPrice: 160,
        rating: 5,
        reviews: 88,
        discount: 40,
      },
      {
        image: "https://rukminim2.flixcart.com/image/850/1000/ksaoqkw0/keyboard/gaming-keyboard/b/y/s/usb-wired-keyboard-fighter-with-rainbow-color-led-ergonomic-original-imag5w4kabwu4ggn.jpeg?q=20&crop=false",
        title: "AK-900 Wired Keyboard",
        price: 960,
        originalPrice: 1160,
        rating: 4,
        reviews: 75,
        discount: 35,
      },
      {
        image: "https://5.imimg.com/data5/YV/OI/MY-3203416/acer-lcd-monitor.jpg",
        title: "IPS LCD Gaming Monitor",
        price: 370,
        originalPrice: 400,
        rating: 5,
        reviews: 99,
        discount: 30,
      },
      {
        image: "https://images-cdn.ubuy.co.in/67c19877b912df7c506426c6-gtracing-gtwd-200-ergonomic-gaming-chair.jpg",
        title: "S-Series Comfort Chair",
        price: 375,
        originalPrice: 400,
        rating: 4.5,
        reviews: 99,
        discount: 25,
      },
      {
        image: "https://m.media-amazon.com/images/I/41JVi+qpPyL._SY300_SX300_.jpg",
        title: "Logitech MX Master 3 Mouse",
        price: 95,
        originalPrice: 120,
        rating: 4.7,
        reviews: 123,
        discount: 21,
      },
      {
        image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/aw-series/aw3225qf/media-gallery/monitor-alienware-aw3225qf-white-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=804&wid=765&qlt=100,1&resMode=sharp2&size=765,804&chrss=full",
        title: "Dell UltraSharp 27 Monitor",
        price: 680,
        originalPrice: 740,
        rating: 4.6,
        reviews: 67,
        discount: 8,
      },
  ];

function SimilarProduct() {
  return (
      <section className='w-full mt-10'>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-semibold text-black">
            View Similar Products
          </h2>
          <button className="text-neutral-50 rounded text-sm cursor-pointer bg-[#111] px-12 py-2 max-sm:px-6 max-sm:py-2 hover:bg-[#333] transition-colors hidden">
            View All
          </button>
        </div>
        <div className="grid grid-cols-[repeat(4,1fr)] gap-[30px] max-md:grid-cols-[repeat(2,1fr)] max-sm:grid-cols-[1fr]">
          {products.map((product, index) => (
            <EcommerceProductCard key={index} {...product} />
          ))}
        </div>
      </section>
  )
}

export default SimilarProduct