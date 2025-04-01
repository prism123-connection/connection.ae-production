import React from 'react'
import { ProductImage } from './ProductImage'
import { ProductTimer } from './ProductTimes'
import ProductActions from './ProductAction'

function ProductContent() {
  return (
    <article className="bg-white flex items-center gap-5 overflow-hidden justify-center mt-5">
    <div className="self-stretch min-w-60 w-full">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <ProductImage
          src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/e73656d7d67e6e813e762711ac69240991982123?placeholderIfAbsent=true"
          alt="AK-900 Wired Keyboard"
        />

        <section className=" ml-5 max-w-[50%] relative ">
          <div className="flex w-full flex-col max-md:max-w-full">
            <div className="self-stretch flex w-full flex-col items-stretch  pl-1.5 max-md:max-w-full">
              <header className="flex gap-[40px_104px] flex-wrap max-md:max-w-full max-md:mr-0.5">
                <div className="min-w-60 text-base font-normal w-full">
                  <h1 className="text-black text-[32px] font-semibold">
                    AK-900 Wired Keyboard
                  </h1>
                  <p className="text-[rgba(150,150,150,1)] mt-[17px]">
                    By Stephen M
                  </p>
                  <p className="text-[rgba(39,39,39,1)] mt-[17px]">
                    1000 SKUs | Compact keyboard featuring custom HyperX
                    mechanical switches.
                  </p>
                </div>
                <div className="flex gap-3 absolute right-0">
                  <button
                    className="bg-[rgba(237,240,248,1)] flex items-center gap-[11px] w-10 p-3 rounded-lg"
                    aria-label="Share"
                  >
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/412b04836b40d434a678cfbb9acc6a82850806a9?placeholderIfAbsent=true"
                      alt="Share"
                      className="aspect-[1.14] object-contain w-4 self-stretch my-auto"
                    />
                  </button>
                  <button
                    className="bg-[rgba(237,240,248,1)] flex items-center gap-[11px] w-10 h-10 p-3 rounded-lg"
                    aria-label="Like"
                  >
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/55728dac6b1a823761aa023152b52c4f8891e50a?placeholderIfAbsent=true"
                      alt="Like"
                      className="aspect-[1] object-contain w-4 self-stretch my-auto"
                    />
                  </button>
                </div>
              </header>

              <div className="w-full shrink-0 max-w-full h-[0.5px] mt-10 border-[rgba(228,228,228,1)] border-solid border-1" />

              <div className="flex items-center gap-[40px_64px] font-semibold whitespace-nowrap mt-8">
                <div className="self-stretch text-[32px] text-[rgba(34,92,202,1)] my-auto">
                  $80
                </div>
                <div className="self-stretch flex gap-2 text-sm text-black my-auto">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/155a3f0d2f057a71204764cdfeb5d903998db15c?placeholderIfAbsent=true"
                    alt="Rating"
                    className="aspect-[5] object-contain w-[100px] shrink-0"
                  />
                  <span className="opacity-50 w-8">(75)</span>
                </div>
              </div>

              <ProductTimer/>

              <div className="w-full shrink-0 max-w-full h-[0.5px] mt-10 border-[rgba(228,228,228,1)] border-solid border-1" />
            </div>

            <div className="text-[rgba(0,22,37,1)] text-base font-normal leading-6 mt-10 max-md:max-w-full">
              <ul className='flex flex-col gap-2'>
                <li>  &#x2022; HyperX mechanical switches</li>
                <li>  &#x2022; Full aircraft-grade aluminum body</li>
                <li>  &#x2022; Compact, portable design with detachable USB-C cable</li>
                <li>  &#x2022; RGB backlit keys with radiant lighting effects</li>
                <li>  &#x2022; Advanced customization with HyperX NGENUITY Software</li>
                <li>  &#x2022; Three adjustable keyboard tilt angles</li>
                <li>  &#x2022; Onboard memory for three profiles</li>
                <li>  &#x2022; With 2 Year Warranty</li>
              </ul>
            </div>

            <ProductActions/>
          </div>
        </section>
      </div>
    </div>
  </article>
  )
}

export default ProductContent