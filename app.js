(function () {
    document.addEventListener("DOMContentLoaded", function () {
        var menu = document.getElementById("menu_bar");
        var menuNavigation = document.getElementById('menu_navigation');
        var textarea = document.getElementsByTagName('textarea')[0];
        var children = menuNavigation.children;
        var chat = document.getElementsByClassName('chat_window')[0];
        var chatWindow = document.getElementsByClassName('chat_list_style')[0];
        var contactList = document.getElementsByClassName('contact_list')[0];
        var contactListChildren = contactList.children;
        var chatSmiles = document.getElementById('chatSmiles');
        var timeNow = ('Today,' + new Date().getHours() + ':' + new Date().getMinutes());
        var smilesForChat = document.getElementById('smiles_for_chat');
        var contactListSearch = document.getElementById('contact_list_search');
        chat.scrollTop = chat.scrollHeight;

        var myData = {
            "_id": "507f191e810c19729de859ea",
            "name": "Eugene Gogol",
            "thumb": "./img/eugene_thumb.png",
            "friends": [
                {
                    "_id": "507f191e810c19729de860ea",
                    "name": "MaximModus",
                    "messages": [{
                        "text": "Hi!",
                        "date": "Yesterday, 16:28"
                    }],
                    "thumb": "./img/m_thumb.png",
                    "count": "150"
                },
                {
                    "_id": "507f191e810c19729de861ea",
                    "name": "Thomas Brown",
                    "messages": [],
                    "thumb": "./img/thomas_thumb.png",
                    "count": "3"
                },
                {
                    "_id": "507f191e810c19729de862ea",
                    "name": "Edward LeCriston",
                    "messages": [{
                        "text": "I agree, like!",
                        "date": "Yesterday, 18:53"
                    }],
                    "thumb": "./img/edward_thumb.png",
                    "count": "6"
                },
                {
                    "_id": "507f191e810c19729de863ea",
                    "name": "Cristian Smitt",
                    "messages": [],
                    "thumb": "./img/cristian_thumb.png",
                    "count": "2"
                },
                {
                    "_id": "507f191e810c19729de864ea",
                    "name": "Sandy Miller",
                    "messages": [{
                        "text": "Who knows the recipe for stuffed cabbage ?",
                        "date": "Yesterday, 20:12"
                    }],
                    "thumb": "./img/sandy_thumb.png"
                },
                {
                    "_id": "507f191e810c19729de865ea",
                    "name": "Princess Murphy",
                    "messages": [{
                        "text": "Hello, my friends! I love this pack of smiles",
                        "date": "Yesterday, 16:48"
                    }],
                    "thumb": "./img/princess_thumb.png"
                },
                {
                    "_id": "507f191e810c19729de866ea",
                    "name": "Artour Bargeman",
                    "messages": [{
                        "text": "Hello, Bogdan! Yes, funny smiles",
                        "date": "Yesterday, 17:00"
                    }],
                    "thumb": "./img/artour_thumb.png"
                },
                {
                    "_id": "507f191e810c19729de867ea",
                    "name": "Andrey Afonin",
                    "messages": [{
                        "text": "Privet bratishki",
                        "date": "10 minutes ago"
                    }],
                    "thumb": "./img/andrey_thumb.png"
                }
            ]
        };

        createContactList(myData.friends, contactList);

        contactListSearch.addEventListener('keyup', function (event) {

            var regexp = event.target.value;

            Array.prototype.forEach.call(contactListChildren, function (child) {

                var contactName = child.getElementsByClassName('contact_name')[0];

                if (!contactName.innerHTML.toLowerCase().match(regexp)) {

                    child.className = 'contact_user hidden';

                } else {

                    child.className = 'contact_user';
                }
            });
        });

        contactList.addEventListener('click', function (event) {

            Array.prototype.forEach.call(contactListChildren, function (child) {

                if (event.target.tagName === 'LI') {

                    event.target.className += ' active';
                }

                child.className = "contact_user";
            });
        });

        menu.addEventListener('click', function () {
            var inc = 0;

            if (!menuNavigation.style.opacity) {

                menuNavigation.style.opacity = 1;

                Array.prototype.forEach.call(children, function (child) {

                    child.style.top = inc + 'px';

                    inc += 30;
                });

                return menuNavigation.style.left = 25 + 'px';
            }

            Array.prototype.forEach.call(children, function (child) {

                child.style.top = 0;
            });

            menuNavigation.style.opacity = '';
        });
        /*TODO: 1.Fix P Tag (all text inline);
         2.Prevent sending empty messages;*/

        document.body.addEventListener('mouseup', function () {
            if (menuNavigation.style.opacity) {

                Array.prototype.forEach.call(children, function (child) {

                    child.style.top = 0;

                });

                menuNavigation.style.opacity = '';
            }
        });

        textarea.addEventListener('keyup', function (event) {
            if (event.ctrlKey && event.keyCode === 13 && event.target.value) {

                event.preventDefault();

                chatWindow.appendChild(
                    createDOMElement('li', false, false, false,
                        createDOMElement('div', 'img_wrap', false, false,
                            createDOMElement('img', 'thumb', false, [['src', myData.thumb]])),
                        createDOMElement('div', 'text_wrap', false, false,
                            createDOMElement('p', 'chat_name', myData.name),
                            createDOMElement('p', 'chat_message_data', timeNow),
                            createDOMElement('div', 'chat_message_wrap', false, false,
                                createDOMElement('p', false, event.target.value)))));

                chat.scrollTop = chat.scrollHeight;

                event.target.value = '';

                return;
            }
            if (event.keyCode === 13) {

                event.target.value += '\n';
            }
        });

        chatSmiles.addEventListener('click', function () {
            if (!smilesForChat.className) {

                smilesForChat.className = "hidden";

                return;
            }

            smilesForChat.className = "";
        });
    });
    
    function createDOMElement (el, elClass, innerData, attrs, children) {
        var node = document.createElement(el);
        
        if (elClass) {
            node.className = elClass;
        }
        
        if (innerData) {
            node.innerHTML = innerData
        }
        
        if (attrs) {
            for (var j = 0; j < attrs.length; j++) {
                node.setAttribute(attrs[j][0], attrs[j][1]);
            }
        }
        
        for (var i = 4; i < arguments.length; i++) {
            node.appendChild(arguments[i]);
        }
        
        return node;
    }

    function createContactList(list, parent) {
        return list.forEach(function (contact) {
            var li = document.createElement('li');
            var img = document.createElement('img');
            var pName = document.createElement('p');
            var pMessageCount = document.createElement('p');
            var div = document.createElement('div');
            li.className = 'contact_user';
            div.className = 'contact_count';
            img.setAttribute('src', contact.thumb);
            pName.innerHTML = contact.name;
            pName.className = 'contact_name';
            pMessageCount.innerHTML = contact.count;
            div.appendChild(pMessageCount);
            li.appendChild(img);
            li.appendChild(pName);
            li.appendChild(div);
            parent.appendChild(li);
            if (!contact.count) {
                div.className = 'hidden';
            }
            if (contact.count >= 99) {
                pMessageCount.innerHTML = '99+';
            }
        })
    }
})();