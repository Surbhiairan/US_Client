const publicVapidKey = "BMETZJpEm8onr-zpGe-ux7HXOjn9erWuCf8cWmabvJ4t2TQv97hGM7fgokjLqMAZmglnwqU5dMxaE94K6hnOGZg"

if ('serviceWorker' in navigator) {
    setInterval(function(){
        console.log("calling...")
        send().catch(err => {
            console.log(err);
        })
    },60000)
    
}

async function send() {

    console.log('Registering service worker');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('Service worker registered..');
    // registering push
    const subsription = await register.pushManager.subscribe({
        userVisibleOnly : true,
        applicationServerKey : urlBase64ToUint8Array(publicVapidKey)
    });
    console.log("Push registered.....");
    //Send push notification
    await fetch('/api/subscribe',{
        method : 'POST',
        body : JSON.stringify(subsription),
        headers : {
            'content-type' : 'application/json'
        }
    })
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }