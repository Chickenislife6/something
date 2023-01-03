const url = "https://aaaaa.fly.dev/";
// const url = "http://localhost:5000/";

const getCart = async (username: string, password: string, subject: string, attribute: string) => {
    const formData = new FormData();
    formData.set("USER", username);
    formData.set("PASSWORD", password);
    formData.set("SUBJECT", subject);
    formData.set("ATTRIBUTE", attribute);
    if (username === "") {
        const resp = await fetch(url + "api/guest/lookup_subject", {
            method: "POST",
            mode: "cors",
            body: formData,
            headers: { "Access-Control-Allow-Origin": "*" },
        });
        return await resp.text();
    } else {
        const resp = await fetch(url + "api/lookup_subject", {
            method: "POST",
            mode: "cors",
            body: formData,
            headers: { "Access-Control-Allow-Origin": "*" },
        });
        return await resp.text();
    }
}

const getClassData = async (username: string, password: string, classes: string) => {
    const formData = new FormData();
    formData.set("USER", username);
    formData.set("PASSWORD", password);
    formData.set("CLASSES", classes);
    let resp = await fetch(url + "api/lookup", {
        method: "POST",
        mode: "cors",
        body: formData,
        headers: { "Access-Control-Allow-Origin": "*" },
    });
    return await resp.text();
}

export { getCart, getClassData }