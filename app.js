(function () {

    var customData = {
        caretImg: ['./img/caret_down.png', './img/caret_up.png'],
        classes: {
            hidden: ' hidden_block',
            opacity: ' hidden_opacity',
            contactUser: ' contact_user',
            smileImg: ' smile_img',
            active: ' active'
        }
    };

    document.addEventListener("DOMContentLoaded", function () {

        var menu = document.getElementById("menu_bar");
        var navMnu = document.getElementById('menu_navigation');
        var navMnuChildren = navMnu.children;
        var textarea = document.getElementById('textarea');
        var chat = document.getElementsByClassName('chat_window')[0];
        var chatWindow = document.getElementsByClassName('chat_list_style')[0];
        var contactList = document.getElementsByClassName('contact_list')[0];
        var contactListChildren = contactList.children;
        var chatSmiles = document.getElementById('chatSmiles');
        var timeNow = ('Today,' + new Date().getHours() + ':' + new Date().getMinutes());
        var smilesForChat = document.getElementById('smiles_for_chat');
        var contactListSearch = document.getElementById('contact_list_search');
        var caret = document.getElementById('caret_bar');
        var submitBtn = document.getElementById('submitBtn');
        var myData = {
            "_id": "507f191e810c19729de859ea",
            "name": "Eugene Gogol",
            "link": "#",
            "thumb": "./img/eugene_thumb.png",
            "friends": [
                {
                    "_id": "507f191e810c19729de860ea",
                    "name": "MaximModus",
                    "link": "#",
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
                    "link": "#",
                    "messages": [],
                    "thumb": "./img/thomas_thumb.png",
                    "count": "3"
                },
                {
                    "_id": "507f191e810c19729de862ea",
                    "name": "Edward LeCriston",
                    "link": "#",
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
                    "link": "#",
                    "messages": [],
                    "thumb": "./img/cristian_thumb.png",
                    "count": "2"
                },
                {
                    "_id": "507f191e810c19729de864ea",
                    "name": "Sandy Miller",
                    "link": "#",
                    "messages": [{
                        "text": "Who knows the recipe for stuffed cabbage ?",
                        "date": "Yesterday, 20:12"
                    }],
                    "thumb": "./img/sandy_thumb.png"
                },
                {
                    "_id": "507f191e810c19729de865ea",
                    "name": "Princess Murphy",
                    "link": "#",
                    "messages": [{
                        "text": "Hello, my friends! I love this pack of smiles",
                        "date": "Yesterday, 16:48"
                    }],
                    "thumb": "./img/princess_thumb.png"
                },
                {
                    "_id": "507f191e810c19729de866ea",
                    "name": "Artour Bargeman",
                    "link": "#",
                    "messages": [{
                        "text": "Hello, Bogdan! Yes, funny smiles",
                        "date": "Yesterday, 17:00"
                    }],
                    "thumb": "./img/artour_thumb.png"
                },
                {
                    "_id": "507f191e810c19729de867ea",
                    "name": "Andrey Afonin",
                    "link": "#",
                    "messages": [{
                        "text": "Privet bratishki",
                        "date": "10 minutes ago"
                    }],
                    "thumb": "./img/andrey_thumb.png"
                }
            ]
        };


        createContactList(myData.friends, contactList);

        setScrollBarPositionBottom(chat);

        caret.addEventListener('click', function (event) {

            if (event.target.attributes.src.value === customData.caretImg[0]) {

                event.target.attributes.src.value = customData.caretImg[1];

                return;
            }

            event.target.attributes.src.value = customData.caretImg[0]
        });

        contactListSearch.addEventListener('keyup', function (event) {

            var inputTextRegexp = new RegExp(event.target.value.toLowerCase());

            var hiddenBlock = customData.classes.hidden;

            var hiddenOpacity = customData.classes.opacity;

            Array.prototype.forEach.call(contactListChildren, function (child) {

                var contactName = child.getElementsByClassName('contact_name')[0].innerHTML.toLowerCase();

                if (!inputTextRegexp.test(contactName)) {

                    child.className = customData.classes.contactUser + hiddenOpacity;

                    setTimeout(function () {

                        child.className += hiddenBlock
                    }, 500)

                } else {

                    child.className = customData.classes.contactUser;

                    if (!child.className.search(hiddenBlock)) {

                        child.className = customData.classes.contactUser;
                    }
                }
            });
        });

        smilesForChat.addEventListener('click', function (event) {

            textarea.appendChild(createEl({el: 'img', elClass: customData.classes.smileImg, attrs: [['src', event.target.attributes.src.value]]}))
        });

        contactList.addEventListener('click', function (event) {

            Array.prototype.forEach.call(contactListChildren, function (child) {

                child.className = customData.classes.contactUser;
            });

            if (event.target.tagName === 'LI') {

                event.target.className += customData.classes.active;
            }

        });

        menu.addEventListener('click', function () {
            var inc = 0;

            if (!navMnu.style.opacity) {

                navMnu.style.opacity = 1;

                navMnuRecurse(navMnuChildren, inc);

                navMnu.style.left = 25 + 'px';

                return;
            }

            navMnuRecurse(navMnuChildren);

            navMnu.style.opacity = '';
        });
        /*TODO: 1.Fix P Tag (all text inline);
         2.Prevent sending empty messages;*/

        document.body.addEventListener('mouseup', function () {

            if (navMnu.style.opacity) {

                Array.prototype.forEach.call(navMnuChildren, function (child) {

                    child.style.top = -100 +'px';

                });

                navMnu.style.opacity = '';
            }
            if (!smilesForChat.className) {
                smilesForChat.className += customData.classes.hidden;
            }
        });

        textarea.addEventListener('keyup', function (event) {

            if (event.ctrlKey && event.keyCode === 13) {

                event.preventDefault();

                chatWindow.appendChild(createEl({el: 'li', children: [
                                            createEl({el: 'div', elClass: 'img_wrap', children: [
                                                createEl({el: 'a', attrs: [['href', myData.link], ['target', '_blank']], children: [
                                                    createEl({el: 'img', elClass:'thumb', attrs: [['src', myData.thumb]]})
                                                ]})
                                            ]}),
                                            createEl({el: 'div', elClass: 'text_wrap', children: [
                                                createEl({el: 'p', elClass: 'chat_name', innerData: myData.name}),
                                                createEl({el: 'p', elClass: 'chat_message_data', innerData: timeNow}),
                                                createEl({el: 'div', elClass: 'chat_message_wrap', children: [
                                                    createEl({el: 'div', innerData: event.target.innerHTML})
                                                ]})
                                            ]})
                    ]}));

                chat.scrollTop = chat.scrollHeight;

                event.target.innerHTML = '';

                return;
            }
            if (event.keyCode === 13) {

                event.target.scrollTop = event.target.scrollHeight;

                event.target.innerHTML += '\n';

            }
        });

        chatSmiles.addEventListener('click', function () {

            if (!smilesForChat.className) {

                smilesForChat.className += customData.classes.hidden;

                return;
            }

            smilesForChat.className = "";
        });
    });
    
    function createEl (elObj) {

        var node = document.createElement(elObj.el);

        if (elObj.elClass) {
            node.className = elObj.elClass;
        }
        
        if (elObj.innerData) {
            node.innerHTML = elObj.innerData
        }
        
        if (elObj.attrs) {
            for (var j = 0; j < elObj.attrs.length; j++) {
                node.setAttribute(elObj.attrs[j][0], elObj.attrs[j][1]);
            }
        }

        if (elObj.children) {
            for (var i = 0; i < elObj.children.length; i++) {
                node.appendChild(elObj.children[i]);
            }
        }
        
        return node;
    }

    function createContactList(list, parent) {

        return list.forEach(function (contact) {

            parent.appendChild(createEl({el: 'li', elClass: 'contact_user', children: [
                                    createEl({el: 'img', attrs: [['src', contact.thumb]]}),
                                    createEl({el: 'p', elClass: 'contact_name', innerData: contact.name}),
                                    createEl({el: 'div', elClass: 'contact_count', children: [
                                        createEl({el: 'p', innerData: contact.count})
                                    ]})
                ]}));

            var contactCount = document.getElementsByClassName('contact_count');

            Array.prototype.forEach.call(contactCount, function (el) {

                var pCount = el.getElementsByTagName('p')[0];

                if (pCount.innerHTML > 99) {

                    pCount.innerHTML = '99+';

                } else if (!pCount.innerHTML) {

                    pCount.className += customData.classes.hidden;
                }
            });
        })
    }


    function navMnuRecurse(node, inc) {

        Array.prototype.forEach.call(node, function (child) {

            if (child.children) {

                navMnuRecurse(child.children);
            }

            child.style.top = inc + 'px';

            inc += 30;
        });
    }

    function setScrollBarPositionBottom(selector) {

        selector.scrollTop = selector.scrollHeight;
    }
})();