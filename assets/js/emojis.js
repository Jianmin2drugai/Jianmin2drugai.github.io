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
      console.log('Processing text node:', originalText); // Log each text node processed

      if (emojiPattern.test(originalText)) {
        let fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match;

        while ((match = emojiPattern.exec(originalText)) !== null) {
          const [fullMatch, emojiName] = match;
          const emojiUrl = emojis[emojiName];
          console.log('Found match:', fullMatch, 'with emoji name:', emojiName, 'and URL:', emojiUrl); // Log each emoji processed

          if (emojiUrl) {
            // Append text before the emoji
            fragment.appendChild(document.createTextNode(originalText.slice(lastIndex, match.index)));

            // Create the emoji image element
            const img = document.createElement('img');
            img.src = emojiUrl;
            img.alt = emojiName;
            img.style.width = '1em';
            img.style.height = '1em';
            img.style.verticalAlign = 'middle';
            img.classList.add('emoji');
            fragment.appendChild(img);

            // Update lastIndex to the end of the current match
            lastIndex = emojiPattern.lastIndex;
          } else {
            console.warn('Emoji not found for:', emojiName); // Log if the emoji URL is not found
          }
        }

        // Append remaining text after the last emoji
        fragment.appendChild(document.createTextNode(originalText.slice(lastIndex)));
        currentNode.parentNode.replaceChild(fragment, currentNode);
      } else {
        console.log('No emojis found in text node:', originalText); // Log if no emojis are found in the text node
      }
    }
  })
  .catch(error => console.error('Error fetching emojis:', error));
