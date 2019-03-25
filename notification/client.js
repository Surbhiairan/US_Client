const publicVapidKey = "BMETZJpEm8onr-zpGe-ux7HXOjn9erWuCf8cWmabvJ4t2TQv97hGM7fgokjLqMAZmglnwqU5dMxaE94K6hnOGZg"

if ('serviceWorker' in navigator) {
    setInterval(function(){
        send().catch(err => {
            console.log(err);
        })
    },30000)
    
}

async function send() {

    console.log('Registering service worker');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    const subsription = await register.pushManager.subscribe({
        userVisibleOnly : true,
        applicationServerKey : urlBase64ToUint8Array(publicVapidKey)
    });
    await fetch('/api/subscribe',{
        method : 'POST',
        body : JSON.stringify(subsription),
        headers : {
            'content-type' : 'application/json',
            'token' : 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoic3VyYmhpIiwiZW1haWwiOiJzdXJiaGlhaXJhbjEwQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlzQWN0aXZlIjp0cnVlLCJpc1Byb2ZpbGUiOnRydWV9.ut3V679FOgXYHL0d96vFIOGFijiYbvQgcDmdFoq9Qqs'
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