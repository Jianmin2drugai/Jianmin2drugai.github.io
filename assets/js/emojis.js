fetch('/assets/emojis.json')
  .then(response => response.json())
  .then(emojis => {
    const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const emojiPattern = /:([a-z0-9_]+):/g;
    
    let currentNode;
    while (currentNode = textNodes.nextNode()) {
      const matches = [...currentNode.nodeValue.matchAll(emojiPattern)];
      if (matches.length > 0) {
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;

        matches.forEach(match => {
          const [fullMatch, emojiName] = match;
          const emojiUrl = emojis[emojiName];
          if (emojiUrl) {
            fragment.append(currentNode.nodeValue.slice(lastIndex, match.index));
            const img = document.createElement('img');
            img.src = emojiUrl;
            img.alt = emojiName;
            img.style.width = '1em';
            img.style.height = '1em';
            fragment.append(img);
            lastIndex = match.index + fullMatch.length;
          }
        });

        fragment.append(currentNode.nodeValue.slice(lastIndex));
        currentNode.parentNode.replaceChild(fragment, currentNode);
      }
    }
  });

