const { ipcRenderer } = require('electron');

let currentUnreadCount = 0;

function getUnread() {
  let unreadCount = 0;
  let newMessagePre; // { sender: string, subject: string, message: string }
  const firstBlock = document.querySelector('.DsPmj');

  if (!firstBlock) {
    return;
  }

  unreadCount = firstBlock.querySelectorAll('div.G3').length;

  // more than 1 new unread message, send only the unread count, else send the newest message preview
  if (unreadCount > currentUnreadCount && unreadCount - currentUnreadCount > 1) {
    ipcRenderer.send('new-unread-count', unreadCount);
    currentUnreadCount = unreadCount;
  } else if (unreadCount > currentUnreadCount) {
    if (firstBlock.querySelector('span.ss') || firstBlock.querySelector('div.bg.qG>span')) {
      newMessagePre = {};

      if (firstBlock.querySelector('span.ss')) {
        newMessagePre.sender = firstBlock.querySelector('span.ss').textContent;
      }
      if (firstBlock.querySelector('div.bg.qG>span')) {
        newMessagePre.subject = firstBlock.querySelector('div.bg.qG>span').textContent;
      }
      if (firstBlock.querySelector('div.g6>span')) {
        newMessagePre.message = firstBlock.querySelector('div.g6>span').textContent;
      }
    }

    if (newMessagePre) {
      ipcRenderer.send('new-message-preview', newMessagePre);
    }

    currentUnreadCount = unreadCount;
  }
}

setInterval(getUnread, 2000);