import turtle


class Range():
    def __init__(self, value1: float, value2: float):
        self.__lower = value1 if value1 < value2 else value2
        self.__upper = value1 if value1 >= value2 else value2

    def __repr__(self):
        return '[' + str(self.__lower) + ','+str(self.__upper)+']'

    def get_lower(self):
        return self.__lower

    def get_upper(self):
        return self.__upper

    def get_middle(self):
        return (self.__lower + self.__upper)/2

    def get_union(self, other: "Range"):
        lower = self.__lower if self.__lower < other.get_lower() else other.get_lower()
        upper = self.__upper if self.__upper > other.get_upper() else other.get_upper()
        return Range(lower, upper)

    def has_intersection(self, other: "Range"):
        lower = self.__lower if self.__lower >= other.get_lower() else other.get_lower()
        upper = self.__upper if self.__upper <= other.get_upper() else other.get_upper()

        if lower >= self.__lower and lower >= other.get_lower() and upper <= self.__upper and upper <= other.get_upper():
            return True
        return False


class Point():
    def __init__(self, x: float, y: float):
        self.__x = x
        self.__y = y

    def __repr__(self):
        return '('+str(self.__x) + ','+str(self.__y)+')'

    def get_x(self):
        return self.__x

    def get_y(self):
        return self.__y

    def translation(self, dx: float, dy: float):
        self.__x += dx
        self.__y += dy

    def get_distance(self, other: "Point"):
        x = (self.__x - other.get_x())**2
        y = (self.__y - other.get_y())**2
        return (x+y)**0.5


class Segment():
    def __init__(self, point1: Point, point2: Point):
        self.__point1 = point1
        self.__point2 = point2

    def __repr__(self):
        return '[' + self.__point1.__repr__() + ';'+self.__point2.__repr__()+']'

    def translation(self, dx: float, dy: float):
        self.__point1.translation(dx, dy)
        self.__point2.translation(dx, dy)

    def get_length(self):
        return self.__point1.get_distance(self.__point2)

    def get_middle(self):
        x = (self.__point1.get_x() + self.__point2.get_x())/2
        y = (self.__point1.get_y() + self.__point2.get_y())/2
        return Point(x, y)


class LSystem():
    def __init__(self, axiom: str, rules: dict, current_steps_count: int = 0, current_word: str = ''):
        self.__axiom = axiom
        self.__rules = rules
        self.__current_steps_count = current_steps_count
        self.__current_word = current_word if current_word else axiom

    def reset(self):
        self.__current_word = self.__axiom

    def get_current_word(self):
        return self.__current_word

    def following_state(self):
        new_word = ""
        for char in self.__current_word:
            if (self.__rules.__contains__(char)):
                new_word += self.__rules[char]
            else:
                new_word += char

        self.__current_word = new_word

    def generate(self, steps_count: int):
        for i in range(steps_count):
            self.following_state()

        return self.__current_word


class MyTurtleMemory():
    def __init__(self):
        self.turtle = turtle.Turtle()
        self.__stack = list()

    def draw_word(self, x: int, y: int, word: str, length: int, angle: float):
        self.turtle.up()
        self.turtle.setpos(x, y)
        self.turtle.down()
        for char in word:
            match char:
                case 'f':
                    self.turtle.forward(length)
                case '+':
                    self.turtle.left(angle)
                case '-':
                    self.turtle.right(angle)
                case '[':
                    self.__stack.append(self.turtle.position())
                case ']':
                    self.turtle.up()
                    self.turtle.goto(self.__stack.pop())
                    self.turtle.down()
        self.turtle.hideturtle()
        turtle.done()

    def draw_star(self, x: int, y: int, length: int, branches_count: int):
        self.turtle.setpos(x, y)
        for i in range(branches_count):
            self.turtle.forward(length)
            self.turtle.right(144)
        self.turtle.hideturtle()
        turtle.done()

    def draw_l_system(self, x: int, y: int, l_system: LSystem, depth: int, length: int, angle: float):
        word = l_system.generate(depth)
        self.draw_word(x, y, word, length, angle)


if __name__ == '__main__':

    range_test1, range_test2 = Range(18.2, 5), Range(10, 20)
    print(range_test1)
    print(range_test2)
    print(range_test1.get_middle())
    print(range_test1.get_union(range_test2))
    print(range_test1.has_intersection(range_test2))

    point_test1, point_test2 = Point(1, 1), Point(-1, 1)
    print(point_test1)
    print(point_test2)
    point_test1.translation(-1, 1)
    print(point_test1)
    print(point_test1.get_distance(point_test2) == 2**0.5)

    segment = Segment(point_test1, point_test2)
    print(segment)
    segment.translation(2, 1)
    print(segment)
    print(segment.get_length() == 2**0.5)
    print(segment.get_middle())

    AXIOM_TEST = "fx"
    RULES_TEST = {'f': '', 'x': '-fx++fy-', 'y': '+fx--fy+'}
    print(LSystem(AXIOM_TEST, RULES_TEST).generate(3))

    # MyTurtleMemory().draw_star(0, 0, 100, 12)

    ws = turtle.Screen()
    AXIOM_TEST2 = "f--f--f"
    RULES_TEST2 = {'f': 'f+f--f+f'}
    l_system_test = LSystem(AXIOM_TEST2, RULES_TEST2)
    # MyTurtleMemory().draw_l_system(-500, 100, l_system_test, 3, 5, 60)

    AXIOM_TEST3 = "x"
    RULES_TEST3 = {'x': 'f[+x]f[-x]+x', 'f': 'ff'}
    l_system_test2 = LSystem(AXIOM_TEST3, RULES_TEST3)
    MyTurtleMemory().draw_l_system(-500, -200, l_system_test2, 7, 6, 10)
