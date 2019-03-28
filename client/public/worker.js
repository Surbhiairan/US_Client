/* eslint-disable no-restricted-globals */
self.addEventListener('push', e =>{
    const data = e.data.json();
    console.log("worker data", data);
    // self.registration.showNotification(data.title,{
    //     body: data.notification[0]
    // });
})