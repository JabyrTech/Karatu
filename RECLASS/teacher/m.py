store = []

def give_choices():
    print("1. Add item")
    print("2. Remove item")
    print("3. View Store")
    print("4. Quit")

def add_item():
    item = input("What item do you want to add: ")

    store.append(item.lower())

    print(item + " added to shelf " + str(store.index(item)))

def remove_item():
    item = input("What item do you want to remove: ")

    if item in store:

        print(item + " is removed from shelf " + str(store.index(item)))

        store.remove(item.lower())

    else:
        print("item is not in store")

    give_choices



while True:

    give_choices()

    user_choice = input("Number: ")

    if user_choice == "1":
        add_item()

    elif user_choice == '2':
        remove_item()

    elif user_choice == "4":
        break



    