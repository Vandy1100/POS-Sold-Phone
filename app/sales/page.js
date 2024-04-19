"use client"
import React from 'react'
import './sales.css';
import Add_sale from './add_sale/add_sale';
import Calu_sale from './add_sale/calu_sale';
const Sale = () => {
    return (
        <div>
            <div className="flex gap-3 mt-2">
                <div>
                    <div className="mt-1 ml-1">
                        <Add_sale />
                    </div>
                </div>
                <div >
                    <div className="ml-2 mt-2 ">
                       <Calu_sale />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sale