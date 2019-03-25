self.addEventListener('push', e =>{
    const data = e.data.json();
    console.log("push recieved");
    console.log("data....",data);
    
    self.registration.showNotification(data.title,{
        body: "Notified by Media"
    });
})