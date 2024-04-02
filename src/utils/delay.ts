export const delay = (data: any, time = 200) => {
    return new Promise<any>((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, time)
    })
}