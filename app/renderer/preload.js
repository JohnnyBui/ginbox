const { ipcRenderer } = require('electron');

let currentUnreadCount = 0;

function getUnread() {
  let unreadCount = 0;

  if (document.querySelectorAll('.DsPmj').length > 0) {
    unreadCount = document.querySelectorAll('.DsPmj')[0].querySelectorAll('div.G3').length;
  }

  // more than new unread messages, send only unread count, else send newest message preview
  if (unreadCount > currentUnreadCount && unreadCount - currentUnreadCount > 1) {
    ipcRenderer.send('new-unread-count', unreadCount);
    currentUnreadCount = unreadCount;
  } else if (unreadCount > currentUnreadCount) {
    // TODO fetch message preview
  }
}

setInterval(getUnread, 2000);