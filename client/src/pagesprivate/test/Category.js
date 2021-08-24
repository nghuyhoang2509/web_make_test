import React from 'react';
import { connect } from "react-redux";
import HeaderCategory from "../../components/HeaderCategory";
import BodyCategory from "../../components/BodyCategory";
import ScrollTop from '../../components/ScrollTop';
import Loading from "../../components/Loading";


const Category = (props) => {
    return (
        <>
            {props.loading ? <Loading /> :
                <>
                        <HeaderCategory />
                        <BodyCategory />
                        <ScrollTop url={props.url} />
                </>}
        </>
    )
}


function mapStateToProps(state) {
    return {
        loading: state.test.loading
    }
}

export default connect(mapStateToProps)(Category)
