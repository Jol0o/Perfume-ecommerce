import React from 'react'
import Bag from './../../components/cartComponent/Bag';
import Order from './../../components/cartComponent/Order';

function page() {
    return (
        <div className='w-full'>
            <div className='container flex p-2 m-auto'>
                <div>
                    <Bag />
                </div>
            </div>
        </div>
    )
}

export default page