import React from 'react'
import TopHeader from './../../components/product/TopHeader';
import Items from './../../components/layout/Items';
import Filter from './../../components/layout/Filter';
import MobileFilter from './../../components/buttons/MobileFilter';

function page() {
    return (
        <div className="w-full min-h-[100vh] p-2">
            <div className="container flex flex-wrap h-full gap-10 m-auto">
                <TopHeader />
                <div className='flex items-center justify-between w-full md:justify-start'>
                    <div>
                        <h1 className="text-[clamp(20px,5vw,40px)] font-bold">Life Style Shoes</h1>
                        <p className="text-gray-500">122 Items</p>
                    </div>
                    <MobileFilter />
                </div>
                <div className="flex">
                    <Items />
                </div>
            </div>
        </div>
    )
}

export default page