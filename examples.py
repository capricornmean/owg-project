 
import math
import time
import sys

hp = 1000
money = 800
u = ""
choices = ["a", "b", "c", "d"]
bag = []
## stores & products
stores = ["The Confectionery", "The Stationery", "The Floral", "I don't want to go shopping anymore"]

confectionery = ["Non-existent Valentine's Chocolate", "Notice-Me-Senpai-Pocky", "Skiddly Skittles", "I don't want to buy anything here."]
confectioneryPrice = ["60", "40", "20", "0"]

stationery = ["Mini cake erasers", "Fish-shaped stress ball", "Thomas the Train Lanyard", "I don't want to buy anything here."]
stationeryPrice = ["45", "50", "35", "0"]

floral = ["Hokkaido Sunflowers", "Venice Lavenders", "Baby Starlight", "I don't want to buy anything here."]
floralPrice = ["140", "160", "120", "0"]


## functions to print

def printStores(choices, stores):
    for i in range(len(stores)):
        print("{}: {}".format(choices[i], stores[i]))

def printProducts(choices, products, prices):
    for i in range(len(products)):
        print("{}: {} - {} CND".format(choices[i], products[i], prices[i]))

## function: stopwatch / measure time

def stopwatch(seconds):
    start = time.time()
    time.perf_counter()    
    elapsed = 0
    while elapsed < seconds:
        elapsed = time.time() - start 
        time.sleep(1)  
    


## begin script

print("'It's your big day', Hana said, 'Do you want to go shopping?'")

while u!="y" or u!="n":
    print("Enter y (for Yes) or n (for No).")
    u = input("""
Go shopping?
> y: Yes
> n: No

""")
    if u == "y" or u=="n":
        break

if u=="n":
    time.sleep(1)

if u=="y":
    time.sleep(1)
    print("You head to the Central Mall.")
    time.sleep(1)
    print("The familiar stores are in sight. Which one do you want to visit?")
    print("")
    time.sleep(1)

    while u!="a" or u!="b" or u!="c":
        if u==choices[3]:
            print("You head out of the mall.")
            break
        print("Enter a, b, c, or d.")
        time.sleep(1)
        printStores(choices, stores)
        u = input()
        break

    print("")
    i = choices.index(u)
    store = stores[i]
    time.sleep(1)
    print("You head to", store)
    print("")
    time.sleep(1)

## The Confectionery
    if store == stores[0]:
        print("Although Valentine's has passed, the sweet fragrance of chocolate and roses still filled the air.")
        time.sleep(1)
        print("You take a look at the items on the shelves and their prices.")
        time.sleep(1)
        print("You currently have:", money, "CND")
        print("")
        time.sleep(1)
        u = ""
    ## make a copy of choices only for confectionery store
        confectioneryChoice = choices.copy()
        
        while u !="a" or u!="b" or u!="c":
            if money < 0:
                time.sleep(1)
                print("You are out of money and being the broke kid you are, you also do not have any credit left.")
                break

            print("What would you like to buy?")
            time.sleep(1)
            print("Enter", confectioneryChoice)
            print("")
            time.sleep(1)
            printProducts(confectioneryChoice, confectionery, confectioneryPrice)

            u = input()
            i = confectioneryChoice.index(u)

            if u==confectioneryChoice[-1]:
                print("You head out of The Confectionery.")
                break
            print("")

            bag.append(confectionery[i])
            del confectionery[i]
            time.sleep(1)
            print("")
            print("Your bag currently has: ", bag)
            money = money - int(confectioneryPrice[i])
            del confectioneryPrice[i]
            confectioneryChoice.pop()
            time.sleep(2)
            print("")
            print("The amount of money you have left is {} CND.".format(money))
            time.sleep(1)

## The Stationery
    if store == stores[1]:
        print("Every girl loves cute stationery that they can look at while being in class.")
        time.sleep(1)
        print("You take a look at the items on the shelves and their prices.")
        time.sleep(1)
        print("You currently have:", money, "CND")
        print("")
        time.sleep(1)
        u = ""
    ## make a copy of choices only for stationery store
        stationeryChoice = choices.copy()

        while u !="a" or u!="b" or u!="c":
            if money < 0:
                time.sleep(1)
                print("You are out of money and being the broke kid you are, you also do not have any credit left.")
                break    

            print("What would you like to buy?")
            time.sleep(1)
            print("Enter", stationeryChoice)
            print("")
            time.sleep(1)
            printProducts(stationeryChoice, stationery, stationeryPrice)

            u = input()
            i = stationeryChoice.index(u)

            if u==stationeryChoice[-1]:
                print("You head out of The Stationery.")
                break
            print("")
            
            bag.append(stationery[i])
            del stationery[i]
            time.sleep(1)
            print("")
            print("Your bag currently has: ", bag)
            money = money - int(stationeryPrice[i])
            del stationeryPrice[i]
            stationeryChoice.pop()
            time.sleep(2)
            print("")
            print("The amount of money you have left is {} CND.".format(money))
            time.sleep(1)
        

## The Floral   
    if store == stores[2]:
        print("Flowers have their own language. Each type of flower expresses a different meaning.")
        time.sleep(1)
        print("You take a look at the items on the shelves and their prices.")
        time.sleep(1)
        print("You currently have:", money, "CND")
        print("")
        time.sleep(1)
        u = ""
    ## make a copy of choices only for flower shop
        floralChoice = choices.copy()

        while u !="a" or u!="b" or u!="c":
            if money < 0:
                time.sleep(1)
                print("You are out of money and being the broke kid you are, you also do not have any credit left.")
                break
            
            print("What would you like to buy?")
            time.sleep(1)
            print("Enter", floralChoice)
            print("")
            time.sleep(1)
            printProducts(floralChoice, floral, floralPrice)

            u = input()
            i = floralChoice.index(u)

            if u==floralChoice[-1]:
                print("You head out of The Floral.")
                break
            print("")

            bag.append(floral[i])
            del floral[i]
            time.sleep(1)
            print("")
            print("Your bag currently has: ", bag)
            money = money - int(floralPrice[i])
            del floralPrice[i]
            floralChoice.pop()
            time.sleep(2)
            print("")
            print("The amount of money you have left is {} CND.".format(money))
            time.sleep(1)


print("")
time.sleep(1)
print("You take a deep breath and brace yourself for the upcoming fight.\n")
time.sleep(1)
print("This is it.\n")
time.sleep(1)
print("The final battle.\n")
time.sleep(1)
print("'Are you feeling alright?', Hana says, 'Nervous?'\")
u=""
time.sleep(1)

while u!="y" or u!="n":
    print("Enter y (for Yes) or n (for No).")
    u = input("""
Tell Hana that you're nervous?
> y: Yes
> n: No

""")
    if u == "y" or u=="n":
        break

print("")
time.sleep(1)
print("'You can do this!', Hana tells you with a bright smile, 'I'm sure that your feelings will get through to her.'")
time.sleep(1)
if u=="n":
    print("""'But just in case you do get nervous, she likes sunny days, okay?'")
Hana points at the glistening summer sun of July.""")

time.sleep(1)
print("'And this is for good luck!', she takes a candy out of her pocket, 'Nana loves this type of candy'.")
time.sleep(1)

## the poisonous candy. trust hana or not?
u=""
while u!="y" or u!="n":
    print("Enter y (for Yes) or n (for No).")
    u = input("""
Take the candy?
> y: Yes
> n: No

""")
    if u == "y" or u=="n":
        break

if u=="y":
    bag.append("Candy from Hana")
    time.sleep(1)
    print("Your bag currently has: ", bag)






