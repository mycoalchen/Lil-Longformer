import os
import json
import progressbar

allLyrics = ""

fin = open('cleanedRapLyrics.json', 'r', encoding='utf8')
data = json.load(fin)

for song in data:
    allLyrics += " " + song['Lyrics']

allLyrics = allLyrics.replace(r'\n', ' ')

fout = open('allLyrics.txt', 'w', encoding='utf8')
fout.write(allLyrics)

fin.close()
fout.close()