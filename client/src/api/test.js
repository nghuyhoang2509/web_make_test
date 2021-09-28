import instance from "./index"

export function createTest(data){
    return instance.post("/admin/test/create",{
        ...data
    })
}


export function loadTest(data){
    return instance.post("/admin/test/category",{
        ...data,
    })
}

export function deleteTest(data){
    return instance.post("/admin/test/delete",{
        id: data
    })
}

export function getTest(data){
    return instance.post("/admin/test/get",{
        data
    })
}

export function updateTest(data){
    return instance.patch("/admin/test/update",{
        ...data
    })
}

export function answerTest(data){
    return instance.patch("/admin/test/answer",{
        ...data
    })
}

export function responseTest(data){
    return instance.post("/admin/test/response",{
        data
    })
}

export function convertFileToText(data){
    return instance.post("/admin/test/convert-file-to-text", data,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

