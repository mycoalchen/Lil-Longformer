# LongformerRapGenerator
Longformer model to generate rap lyrics tuned on lyrics from ohhla.com - final project for CS 590 deep learning class at PEA

Link to Colab notebook:
https://colab.research.google.com/drive/1-5-ZDIY1Rjm3ygbIU6INIEbK197EDCeG#scrollTo=J02miqU0NL3j

## Important files:
script.js - JS script used to scrape songs from http://ohhla.com/

p.py - final version of the Python script used to collect script.js text output into a json (there were also intermediate versions and small manual edits involved)

CleanedRapLyrics.json - final json dataset with songs scraped from OHHLA

Lil Longformer.ipynb - main Python notebook containing EDA/Model/Output code

checkpoints folder - saved weights to load models in
