const appReducer = (state = { user: { id: "", fname: "", admin: false, permissions: [], timer: "", sessionTimeout: "" }, editUser: { id: "" }, editMovie: { id: "" }, editMember: { id: "" } }, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state, user: {
                    id: action.payload.id,
                    fname: action.payload.fname,
                    admin: action.payload.admin,
                    permissions: action.payload.permissions,
                    timer: action.payload.timer,
                    sessionTimeout: action.payload.sessionTimeout
                }
            };

        case "LOGOUT":
            return { ...state, user: { id: "", fname: "", admin: false, permissions: [], timer: "", sessionTimeout: "" } };

        case "EDITUSER":
            return { ...state, editUser: { id: action.payload.id } };

        case "EDITMOVIE":
            return { ...state, editMovie: { id: action.payload.id } };

        case "EDITMEMBER":
            return { ...state, editMember: { id: action.payload.id } };

        default:
            return { ...state }
    }
}

export default appReducer;