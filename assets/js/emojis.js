fetch('/assets/emojis.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(emojis => {
    console.log('Emojis fetched successfully:', emojis); // Log the emojis fetched
    const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const emojiPattern = /:([a-z0-9_]+):/g;

    let currentNode;
    while (currentNode = textNodes.nextNode()) {
      let originalText = currentNode.nodeValue;
      let fragment = document.createDocumentFragment();
      let lastIndex = 0;
      let match;

      while ((match = emojiPattern.exec(originalText)) !== null) {
        const [fullMatch, emojiName] = match;
        const emojiUrl = emojis[emojiName];
        console.log('Processing emoji:', emojiName, emojiUrl); // Log each emoji processed

        if (emojiUrl) {
          fragment.appendChild(document.createTextNode(originalText.slice(lastIndex, match.index)));

          const img = document.createElement('img');
          img.src = emojiUrl;
          img.alt = emojiName;
          img.style.width = '1em';
          img.style.height = '1em';
          img.style.verticalAlign = 'middle';
          img.classList.add('emoji');
          fragment.appendChild(img);

          lastIndex = emojiPattern.lastIndex;
        }
      }

      fragment.appendChild(document.createTextNode(originalText.slice(lastIndex)));
      currentNode.parentNode.replaceChild(fragment, currentNode);
    }
  })
  .catch(error => console.error('Error fetching emojis:', error));
