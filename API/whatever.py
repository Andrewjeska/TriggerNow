import csv

def parse(phrase):
#create a dictionary from the csv
	reader = {}
	mydict = {}
	with open('SentiWord.csv', 'r') as thecsv:
		reader = csv.reader(thecsv)
		#reader = csv.DictReader(thecsv, ("word", "value"))
		mydict = dict((rows[0],rows[1]) for rows in reader)



	#print(mydict)
	#create an array from the string passed by the speech recnognition
	talk = str.split(phrase)
	#gives an array with the individual words comma delimiated
	#lookup Keys in reader (dictionary) from talk
	#print(reader)
	S = []
	for x in talk:
		if x in mydict:
			S.append(mydict[x])


	#gives LIST of corresding values
	#sum the values to obtain the bolean coeficient
	#if the keys are not in the dictionary generate a random value
	sum = 0.0
	for value in S:
		sum = sum + float(value)

	#print(sum)

	if sum < 0:
		print('bad')
		return('bad')

	return('good')

#parse("depression")
