import csv

def main(phrase)
#create a dictionary from the csv
	with open('SentiWord.csv', 'r') as thecsv:
		reader = csv.reader(thecsv)
	#create an array from the string passed by the speech recnognition
	talk = str.split(phrase)
	#gives an array with the individual words comma delimiated
	#lookup Keys in reader (dictionary) from talk
	S = [reader[x] for x in talk]
	#gives LIST of corresding values
	#sum the values to obtain the bolean coeficient
	#if the keys are not in the dictionary generate a random value
	D = sum(S). 
	if D < 0: 
		return("Bad")
	return("Good")

main()
