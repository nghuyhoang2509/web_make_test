import React from 'react';
import { Switch } from 'react-router-dom';
import Create from './Create';
import Category from "./Category";
import Exam from './Exam';
import Edit from './Edit';
import PrivateRouter from '../PrivateRouter';

const Test = () => {
    return (
        <div className="container mt-header py-4">
            <Switch>
                <PrivateRouter path="/admin/test/category" components={<Category url="/admin/test/category"/>} exact/>
                <PrivateRouter path="/admin/test/create" components={<Create/>} exact />
                <PrivateRouter path="/admin/test/exam/:id" components={<Exam/>}/>
                <PrivateRouter path="/admin/test/edit/:id" components={<Edit/>}/>
                <PrivateRouter path="**" components="Trang không tồn tại bạn vui lòng kiểm tra đường dẫn"/>
            </Switch>
        </div>
    )
}

export default Test
