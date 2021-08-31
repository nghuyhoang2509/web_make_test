import React from 'react';
import { Switch } from 'react-router-dom';
import Create from './Create';
import Category from "./Category";
import Edit from './Edit';
import PrivateRouter from '../PrivateRouter';


const Test = () => {
    return (
        <div className="container mt-header py-4" style={{ backgroundColor: "#f7fcfc" }}>
            <Switch>
                <PrivateRouter path="/admin/test/category" components={<Category url="/admin/test/category"/>} exact/>
                <PrivateRouter path="/admin/test/create" components={<Create/>} exact />
                <PrivateRouter path="/admin/test/edit/:id" components={<Edit/>}/>
                <PrivateRouter path="**" components="Trang không tồn tại bạn vui lòng kiểm tra đường dẫn"/>
            </Switch>
        </div>
    )
}

export default Test
