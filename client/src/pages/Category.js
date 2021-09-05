import React from 'react';
import HeaderCategory from "../components/HeaderCategory";
import BodyCategory from "../components/BodyCategory";


const Category = (props) => {
    return (
        <>
            <HeaderCategory />
            <BodyCategory style={{ flex: "1" }} />
        </>
    )
}



export default Category
