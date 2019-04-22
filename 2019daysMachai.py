def main():

timeString = ":[\"9am\", \"10am\", \"11am\", \"12pm\", \"1pm\", \"2pm\"],"
#############################################################################################################################

## January has 31 days
    
    y2019JAN = "{\"January\":{"
    for i in range(1, 32):
        y2019JAN += '"' + str(i) + '"' + timeString
        ##print(y2019)

    ## to get rid of last comma
    y2019JAN = y2019JAN[:len(y2019JAN)-1]
    y2019JAN += "}}"
    #print("----------------------")
    print(y2019JAN)

#############################################################################################################################

## February (2019) has 28 days
## February (2020) has 29 days
    
    y2019FEB = "{\"February\":{"
    for i in range(1, 30):
        y2019FEB += '"' + str(i) + '"' + timeString
        ##print(y2019)

    ## to get rid of last comma
    y2019FEB = y2019FEB[:len(y2019FEB)-1]
    y2019FEB += "}}"
    #print("----------------------")
    print(y2019FEB)

#############################################################################################################################

## March has 31 days    
    y2019MAR = "{\"March\":{"
    for i in range(1, 32):
        y2019MAR += '"' + str(i) + '"' + timeString
        ##print(y2019)

    ## to get rid of last comma
    y2019MAR = y2019MAR[:len(y2019MAR)-1]
    y2019MAR += "}}"
    #print("----------------------")
    print(y2019MAR)


#############################################################################################################################

## April has 30 days
    
    y2019APR = "{\"April\":{"
    for i in range(1, 31):
        y2019APR += '"' + str(i) + '"' + timeString
        ##print(y2019)

    ## to get rid of last comma
    y2019APR = y2019APR[:len(y2019APR)-1]
    y2019APR += "}}"
    #print("----------------------")
    print(y2019APR)

#############################################################################################################################

## May has 31 days
    
    y2019MAY = "{\"May\":{"
    for i in range(1, 32):
        y2019MAY += '"' + str(i) + '"' + timeString
        ##print(y2019)

    ## to get rid of last comma
    y2019MAY = y2019MAY[:len(y2019MAY)-1]
    y2019MAY += "}}"
    #print("----------------------")
    print(y2019MAY)


#############################################################################################################################

## June has 30 days 
    y2019JUNE = "{\"June\":{"
    for i in range(1, 31):
        y2019JUNE += '"' + str(i) + '"' + timeString
        ##print(y2019)

    ## to get rid of last comma
    y2019JUNE = y2019JUNE[:len(y2019JUNE)-1]
    y2019JUNE += "}}"
    #print("----------------------")
    print(y2019JUNE)



#############################################################################################################################

## July has 31 days 
    
    y2019JUL = "{\"July\"':{"
    for i in range(1, 32):
        y2019JUL += '"' + str(i) + '"' + timeString
        ##print(y2019)

    ## to get rid of last comma
    y2019JUL = y2019JUL[:len(y2019JUL)-1]
    y2019JUL += "}}"
    #print("----------------------")
    print(y2019JUL)

 
#############################################################################################################################

## August has 31 days 
    
    y2019AUG= "{\"August\":{"
    for i in range(1, 32):
        y2019AUG += '"' + str(i) + '"' + timeString
        ##print(y2019)

    ## to get rid of last comma
    y2019AUG = y2019AUG[:len(y2019AUG)-1]
    y2019AUG += "}}"
    #print("----------------------")
    print(y2019AUG)


#############################################################################################################################

## September has 30 days
    
    y2019SEP = "{\"September\":{"
    for i in range(1, 31):
        y2019SEP += '"' + str(i) + '"' + timeString
        ##print(y2019)

    ## to get rid of last comma
    y2019SEP = y2019SEP[:len(y2019SEP)-1]
    y2019SEP += "}}"
    #print("----------------------")
    print(y2019SEP)


#############################################################################################################################

## October has 31 days
    
    y2019OCT = "{\"October\":{"
    for i in range(1, 32):
        y2019OCT += '"' + str(i) + '"' + timeString
        ##print(y2019)

    ## to get rid of last comma
    y2019OCT = y2019OCT[:len(y2019OCT)-1]
    y2019OCT += "}}"
    #print("----------------------")
    print(y2019OCT)


#############################################################################################################################

## November has 30 days
    
    y2019NOV = "{\"November\":{"
    for i in range(1, 31):
        y2019NOV += '"' + str(i) + '"' + timeString
        ##print(y2019)

    ## to get rid of last comma
    y2019NOV = y2019NOV[:len(y2019NOV)-1]
    y2019NOV += "}}"
    #print("----------------------")
    print(y2019NOV)



#############################################################################################################################

## December has 31 days
    
    y2019DEC = "{\"December\":{"
    for i in range(1, 32):
        y2019DEC += '"' + str(i) + '"' + timeString
        ##print(y2019)

    ## to get rid of last comma
    y2019DEC = y2019DEC[:len(y2019DEC)-1]
    y2019DEC += "}}"
    #print("----------------------")
    print(y2019DEC, "\n")


#############################################################################################################################    

        



main()
