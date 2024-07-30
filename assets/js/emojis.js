fetch('/assets/emojis.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(emojis => {
    console.log('Emojis fetched successfully:', emojis);

    const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const emojiPattern = /:([a-z0-9_+\-]+):/g;
    const specialCases = {
      '+1': emojis['+1'],
      '-1': emojis['-1']
    };

    let currentNode;
    while (currentNode = textNodes.nextNode()) {
      let originalText = currentNode.nodeValue;
      console.log('Processing text node:', originalText);

      if (emojiPattern.test(originalText) || /(?:\+1|\-1)/.test(originalText)) {
        let fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match;

        while ((match = emojiPattern.exec(originalText)) !== null) {
          const [fullMatch, emojiName] = match;
          const emojiUrl = emojis[emojiName];
          console.log('Found match:', fullMatch, 'with emoji name:', emojiName, 'and URL:', emojiUrl);

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
          } else {
            console.warn('Emoji not found for:', emojiName);
          }
        }

        let remainingText = originalText.slice(lastIndex);
        Object.keys(specialCases).forEach(caseKey => {
          const casePattern = new RegExp(`\\b${caseKey}\\b`, 'g');
          if (casePattern.test(remainingText)) {
            let fragment = document.createDocumentFragment();
            let lastIndex = 0;
            let match;

            while ((match = casePattern.exec(remainingText)) !== null) {
              fragment.appendChild(document.createTextNode(remainingText.slice(lastIndex, match.index)));

              const img = document.createElement('img');
              img.src = specialCases[caseKey];
              img.alt = caseKey;
              img.style.width = '1em';
              img.style.height = '1em';
              img.style.verticalAlign = 'middle';
              img.classList.add('emoji');
              fragment.appendChild(img);

              lastIndex = casePattern.lastIndex;
            }

            fragment.appendChild(document.createTextNode(remainingText.slice(lastIndex)));
            currentNode.parentNode.replaceChild(fragment, currentNode);
          }
        });

        fragment.appendChild(document.createTextNode(remainingText));
        currentNode.parentNode.replaceChild(fragment, currentNode);
      } else {
        console.log('No emojis found in text node:', originalText);
      }
    }
  })
  .catch(error => console.error('Error fetching emojis:', error));
