export var headers = localStorage.getItem("AuthToken")
    ? {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        "Authorization": `Bearer ${localStorage.getItem("AuthToken")}`

    }
    : {
        "Accept": "application/json",
    };

export var headersBus = localStorage.getItem("AuthToken")
    ? {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem("AuthToken")}`
    }
    : {
        "Accept": "application/json",
    };