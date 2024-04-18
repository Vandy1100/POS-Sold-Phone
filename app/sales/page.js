"use client"
import React from 'react'
import './sales.css';
import Add_sale from './add_sale/add_sale';
import Calu_sale from './add_sale/calu_sale';
const Sale = () => {
    return (
        <div>
            <div className="flex gap-1 mt-2 ml-3">
                <div>
                    <div className="mt-2 ml-2">
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