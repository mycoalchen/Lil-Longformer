import os
import json
import progressbar

fin = open('cleanedRapLyrics3.txt', 'r', encoding='utf8')

# asStr = fin.read().replace(r"\\n", "\n").replace(r"f/", "ft.")
asStr = fin.read()
asStr = asStr.replace("\n", " \n ")


def make_song_dict(song_id):
    return {
        "SongId": song_id,
        "Artist": "",
        "Album": "",
        "Song": "",
        "Lyrics": "",
    }


wordList = asStr.split(' ')
# Remove empty strings
wordList = [word for word in wordList if word]
songList = []
songDict = {}
wordIndex = 0

numWords = len(wordList)
numSongs = wordList.count("Artist:")
print(str(numSongs) + " songs in dataset")
songNum = 0

while wordIndex < len(wordList):
    # New song
    if wordList[wordIndex] == "Artist:":
        songNum += 1
        if songNum % 1000 == 0 or numSongs - songNum < 5:
            print("Reached song #" + str(songNum))
        songDict = make_song_dict(songNum)
        wordIndex += 1
        while wordList[wordIndex] != "\n":
            songDict["Artist"] += wordList[wordIndex] + " "
            wordIndex += 1
        wordIndex += 1  # Pass the line break
        songDict["Artist"] = songDict["Artist"][:-1]  # Remove the last space
    if wordList[wordIndex] == "Album:":
        # print("Reached Album")
        wordIndex += 1
        while wordList[wordIndex] != "\n":
            songDict["Album"] += wordList[wordIndex] + " "
            wordIndex += 1
        wordIndex += 1
        songDict["Album"] = songDict["Album"][:-1]
    if wordList[wordIndex] == "Song:":
        # print("Reached Song")
        wordIndex += 1
        while wordList[wordIndex] != "\n":
            songDict["Song"] += wordList[wordIndex] + " "
            wordIndex += 1
        wordIndex += 1
        songDict["Song"] = songDict["Song"][:-1]
    if wordList[wordIndex - 2] == wordList[wordIndex - 1] == "\n":
        # print("Reached lyrics")
        while wordList[wordIndex] != "Artist:":
            if wordIndex == numWords - 1:
                songList.append(songDict)
                print("done")
                break
            if wordList[wordIndex] != "\n":
                songDict["Lyrics"] += wordList[wordIndex] + " "
            else:
                songDict["Lyrics"] += "\n"
            if wordIndex != numWords - 1 and wordList[wordIndex + 1] == "Artist:":
                songList.append(songDict)
            wordIndex += 1
    else:
        wordIndex += 1

print(len(songList))
fout = open("cleanedRapLyrics.json", 'w', encoding='utf8')
json.dump(songList, fout)

fin.close()
fout.close()
