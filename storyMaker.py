from PIL import Image, ImageDraw, ImageFont
import random
import string
import nltk
from nltk.corpus import stopwords


def getColorContrast():

    listOfBackgrounds = [
        ("#512DA8", "#FFFFFF"),
        ("#00796B", "#FFFFFF"),
        ("#FFA000", "#212121"),
        ("#455A64", "#FFFFFF"),
        ("#E64A19", "#FFFFFF")
    ]
    return random.choice(listOfBackgrounds)

def get_random_string():
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(5))
    return result_str

def words(a):
    if not a:
        return [[]]
    elif len(a) == 1:
        return [[a]]
    else:
        result = []
        for i in range(1, len(a) + 1):
            result += [(a[:i], *sub_split) for sub_split in words(a[i:])]
        return result

def filter(l):
    word = []
    for i in l:
        kl = []
        for j in i:
            if len(j) > 1:
                kl.append(" ".join(j))
            else:
                kl.append(j[0])
            word.append(kl)
    return word

def fitEachLine(imageObject, combinations, fontPath):
    line = []
    for lines in combinations:
        li = []
        for phrase in lines:
            if len(phrase) < 5:
                break;
            fontSize = 240
            font = ImageFont.truetype(fontPath, fontSize)
            while imageObject.textsize(phrase, font=font, stroke_width=5)[0] > 960:
                fontSize -= 1;
                font = ImageFont.truetype(fontPath, fontSize)
            li.append([phrase, fontSize])
        if len(lines) == len(li):
            line.append(li)

    return line

def getHighLowWords(list_of_words):
    stopword = stopwords.words('english')

    lowWords = []
    highWords = []

    for i in list_of_words:
        if i in stopword:
            lowWords.append(i)
        else:
            highWords.append(i)

    return (lowWords, highWords)

def maximizeHighestWordSize(line, highWords):

    if len(highWords) == 0:
        return line

    highestWord = max(highWords, key=len)

    probableSymmetry = []
    maxFont = 0

    for phrase in line:
        for words in phrase:
            if highestWord in words[0]:
                if maxFont <= words[1]:
                    maxFont = words[1]
                    probableSymmetry.append(phrase)
    return probableSymmetry

def minimizeLowestWordSize(line, lowWords):

    if len(lowWords) == 0:
        return line

    probableSymmetryComplement = []
    maxFont = 1000

    lowestWord = max(lowWords, key=len)

    for phrase in line:
        for words in phrase:
            if lowestWord in words[0]:
                if maxFont >= words[1]:
                    maxFont = words[1]
                    probableSymmetryComplement.append(phrase)

    return probableSymmetryComplement

def saveImage(name, imageObject, imageDraw, finalSymmetry, fillColor, fontPath):
    height = 700
    for i in finalSymmetry:
        font = ImageFont.truetype(fontPath, i[1])
        imageDraw.text((80, height), i[0], font=font, fill=fillColor, stroke_width=5)
        size = imageDraw.textsize(i[0], font=font, stroke_width=5)
        height += size[1]

    imageObject.save(name)

def generateStory(text):
    name = get_random_string()+".png"

    list_of_words = text.split()
    combinations = filter(words(list_of_words))

    backgroudColor, fillColor = getColorContrast()

    img = Image.new('RGB', (1080, 1920), color = backgroudColor)
    imageObject = ImageDraw.Draw(img)
    fontPath = 'Raleway-VariableFont_wght.ttf'

    line = fitEachLine(imageObject, combinations, fontPath)

    lowWords, highWords = getHighLowWords(list_of_words)

    probableSymmetry = maximizeHighestWordSize(line, highWords)
    probableSymmetryComplement = minimizeLowestWordSize(probableSymmetry, lowWords)

    saveImage(name, img, imageObject, probableSymmetryComplement[-1], fillColor, fontPath)

    return name

# generateStory("INFOSYS visits IET")
