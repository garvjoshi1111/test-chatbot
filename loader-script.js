// chatbot-loader.js
(function() {
    function findChatbotScript() {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src.indexOf('chatbot-loader.js') > -1) {
                return scripts[i];
            }
        }
        return null;
    }

    var currentScript = findChatbotScript();
    
    if (!currentScript) {
        console.error('Chatbot loader script not found');
        return;
    }

    function parseUrlParams(url) {
        var params = {};
        var parser = document.createElement('a');
        parser.href = url;
        var query = parser.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
        return params;
    }

    var dataParams = {};
    for (var i = 0; i < currentScript.attributes.length; i++) {
        var attr = currentScript.attributes[i];
        if (attr.name.startsWith('data-')) {
            dataParams[attr.name.slice(5)] = attr.value;
        }
    }

    var urlParams = parseUrlParams(currentScript.src);

    var params = Object.assign({}, dataParams, urlParams);

    window.ChatbotParams = params;

    var script = document.createElement('script');
    script.src = 'https://your-username.github.io/my-chatbot/chatbot.js';
    document.head.appendChild(script);
})();
