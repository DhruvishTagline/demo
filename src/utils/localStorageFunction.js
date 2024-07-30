
export const getItemLocal = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const setItemLocal = (key,value) => {
    localStorage.setItem(key,JSON.stringify(value))
}

export const removeItemLocal = (key) => {
    localStorage.removeItem(key)
}

export const cleatItemLocal = () => {
    localStorage.clear()
}

