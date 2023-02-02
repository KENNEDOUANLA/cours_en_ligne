class Human():
    __humans_count = 0
    __nationalities_greeting: dict = {
        "française": "Bonjour", "anglaise": "Hello", "portugaise": "Bon Dia"}

    def __init__(self, first_name: list[str], last_name: str, nationality: str):
        self.full_name = ' '.join(first_name) + ' ' + last_name
        self.__nationality = nationality
        Human.__humans_count += 1

    def __repr__(self):
        return "Je m'appelle " + self.full_name + " et je suis de nationalité "+self.__nationality+"."

    def get_nationality(self):
        return self.__nationality

    def get_shout(self):
        return self.__repr__() + ' ' + Human.__nationalities_greeting[self.__nationality]+" ! "

    @classmethod
    def get_humans_count(cls):
        return cls.__humans_count


class Cow():
    def __init__(self, nickname: str, weight: float, owner: Human = None):
        self.nickname = nickname
        self.__weight = weight
        self.owner = owner

    def __repr__(self):
        propertaire = 'Appartient à ' + \
            self.owner.full_name if self.owner else "N’a pas de proprietaire"
        return self.nickname + ' : cow de ' + str(self.__weight) + ' Kg. '+propertaire

    def get_weight(self):
        return self.__weight

    def set_weight(self, weight_value: float):
        self.__weight = weight_value

    def get_shout(self):
        return "Meuuuuuuuuuuuuh !"


class Dog():
    def __init__(self, nickname: str, owner: Human = None, state: int = 0):
        self.nickname = nickname
        self.owner = owner
        self.__state = state

    def __repr__(self):
        status = 'Appartient à ' + "dog en colère. "if self.__state else "dog cool. "
        status += 'Appartient à ' + \
            self.owner.full_name if self.owner else "N’a pas de proprietaire"
        return self.nickname + ' : ' + status

    def set_state(self, state: int):
        self.__state = state

    def get_state(self):
        return self.__state

    def get_shout(self):
        return "grrrrr !" if self.__state else "ouah ouah ! "


if __name__ == '__main__':
    print(Human.get_humans_count())
    farmer = Human(["Marcel", "Robert"], "Duchamps", "française")
    print(farmer.full_name)
    print(farmer)
    print(farmer.get_nationality())
    print(farmer.get_shout())
    milk_cow = Cow("Aglaë", 300, farmer)
    print(milk_cow)
    print(milk_cow.get_shout())
    stray_dog = Dog("Médor")

    print(stray_dog)
    print(stray_dog.get_shout())
    stray_dog.set_state(1)

    print(stray_dog)
    print(stray_dog.get_shout())
    print(Human.get_humans_count())
