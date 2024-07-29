---
permalink: /
title: "Introduction"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I'm a Ph.D. candidate（2021.03.01 to present） in department of Integrative Biotechnology at Yonsei University in Republic of Korea, advised by Prof. Kyoung Tai No and Prof. YoungSoo Kim.

My research involves drug discovery, medicinal chemistry,(generative) artificial intelligence, deep learning, chemoinformatics, and bioinformatics. I focus on applying deep learning methods and computational techniques to unlock drug R&D and health computing.

News
======

2024.03.18 腾讯云/腾讯云开发者社区 《2023年度优质共创作者：DrugAI》

2023.02.10 腾讯云/腾讯云开发者社区 《2022年度优秀作者奖：DrugAI》

2022.10.21 Co-edited the first book on “artificial intelligence in drug discovery” published in Chinese. 《智能药物研发-新药研发中的人工智能》 ，编著: 宋弢，曾湘祥，王爽，王建民。

2022.10.07 Participated in the “1st Yonsei AI Workshop”

2021.04.21 “DrugAI”入选“2020年度学术公众号Top10”

Resource
======

1. List (Papers and Codes) of molecular design using Generative AI and Deep Learning. Fork [[this repository](https://github.com/AspirinCode/papers-for-molecular-design-using-DL).
2. List of protein(PPIs) conformations and molecular dynamics using generative artificial intelligence and deep learning. Fork [[this repository](https://github.com/AspirinCode/awesome-AI4ProteinConformation-MD).
3. List of papers about Proteins Design using Deep Learning. Fork [[this repository](https://github.com/Peldom/papers_for_protein_design_using_DL).


Site-wide configuration
------
The main configuration file for the site is in the base directory in [_config.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_config.yml), which defines the content in the sidebars and other site-wide features. You will need to replace the default variables with ones about yourself and your site's github repository. The configuration file for the top menu is in [_data/navigation.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_data/navigation.yml). For example, if you don't have a portfolio or blog posts, you can remove those items from that navigation.yml file to remove them from the header. 

Create content & metadata
------
For site content, there is one markdown file for each type of content, which are stored in directories like _publications, _talks, _posts, _teaching, or _pages. For example, each talk is a markdown file in the [_talks directory](https://github.com/academicpages/academicpages.github.io/tree/master/_talks). At the top of each markdown file is structured data in YAML about the talk, which the theme will parse to do lots of cool stuff. The same structured data about a talk is used to generate the list of talks on the [Talks page](https://academicpages.github.io/talks), each [individual page](https://academicpages.github.io/talks/2012-03-01-talk-1) for specific talks, the talks section for the [CV page](https://academicpages.github.io/cv), and the [map of places you've given a talk](https://academicpages.github.io/talkmap.html) (if you run this [python file](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.py) or [Jupyter notebook](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.ipynb), which creates the HTML for the map based on the contents of the _talks directory).

**Markdown generator**

I have also created [a set of Jupyter notebooks](https://github.com/academicpages/academicpages.github.io/tree/master/markdown_generator
) that converts a CSV containing structured data about talks or presentations into individual markdown files that will be properly formatted for the Academic Pages template. The sample CSVs in that directory are the ones I used to create my own personal website at stuartgeiger.com. My usual workflow is that I keep a spreadsheet of my publications and talks, then run the code in these notebooks to generate the markdown files, then commit and push them to the GitHub repository.

How to edit your site's GitHub repository
------
Many people use a git client to create files on their local computer and then push them to GitHub's servers. If you are not familiar with git, you can directly edit these configuration and markdown files directly in the github.com interface. Navigate to a file (like [this one](https://github.com/academicpages/academicpages.github.io/blob/master/_talks/2012-03-01-talk-1.md) and click the pencil icon in the top right of the content preview (to the right of the "Raw | Blame | History" buttons). You can delete a file by clicking the trashcan icon to the right of the pencil icon. You can also create new files or upload files by navigating to a directory and clicking the "Create new file" or "Upload files" buttons. 

Example: editing a markdown file for a talk
![Editing a markdown file for a talk](/images/editing-talk.png)

For more info
------
More info about configuring Academic Pages can be found in [the guide](https://academicpages.github.io/markdown/). The [guides for the Minimal Mistakes theme](https://mmistakes.github.io/minimal-mistakes/docs/configuration/) (which this theme was forked from) might also be helpful.
