from turtle import *
import random
import turtle


class Grid(object):
    def __init__(self, grid):
        self.grid = grid

    def fill_random(self, values: list[any]):
        temporel_list = []
        for i in range(len(self.grid)):
            temporel_list = []
            for j in range(len(self.grid[i])):
                temporel_list.append(random.choice(values))
            self.grid[i] = temporel_list

    def get_lines_count(self): return len(self.self.grid)

    def get_columns_count(self):
        return len(self.grid[0]) if len(self.grid) else 0

    def get_line(self, line_number: int):
        return self.grid[line_number] if len(self.grid) > line_number else []

    def get_column(self, column_number: int):
        colonne = []
        if len(self.grid) > 0 and len(self.grid[0]) > column_number:
            for line in self.grid:
                colonne.append(line[column_number])
        return colonne

    def get_line_str(self, line_number: int, separator: str):
        ligne = self.get_line(self.grid, line_number)
        ligne_str = str(ligne[0]) if (len(ligne)) else ""
        for i in range(1, len(ligne)):
            ligne_str += separator+str(ligne[i])

        return ligne_str

    def get_grid_str(self, separator: str):
        colonnes = self.get_line_str(self.grid, 0, separator)
        for i in range(1, len(self.grid)):
            colonnes += '\n' + self.get_line_str(self.grid, i, '')

        return colonnes

    def get_diagonal(self):
        diagonal = []
        number_colonne = len(self.grid[0]) if len(self.grid) else 0
        i = 0
        while (i < len(self.grid) and i < number_colonne):
            diagonal.append(self.grid[i][i])
            i += 1
        return diagonal

    def get_anti_diagonal(self):
        anti_diagonal = []
        number_colonne = len(self.grid[0]) if len(self.grid) else 0
        i = 0
        while (i < len(self.grid) and i < number_colonne):
            anti_diagonal.append(self.grid[i][number_colonne-i-1])
            i += 1

        return anti_diagonal

    def has_equal_values(self, value: any):
        for colonne in self.grid:
            for item in colonne:
                if (item != value):
                    return False
        return True

    def is_square(self):
        if len(self.grid):
            return True if len(self.grid) == len(self.grid[0]) else False

        # une self.grid avec zéro ligne est carré
        return True

    def get_count(self, value: any):
        count = 0
        for colonne in self.grid:
            for item in colonne:
                if (item == value):
                    count += 1
        return count

    def get_sum(self):
        somme = 0
        for colonne in self.grid:
            for item in colonne:
                somme += item

        return somme

    def get_coordinates_from_cell_number(self, cell_number: int):
        k = 0
        for i in range(len(self.grid)):
            for j in range(len(self.grid[i])):
                if (k == cell_number):
                    return (i, j)
                k += 1

        return (-1, -1)

    def get_cell_number_from_coordinates(self, line_number: int,
                                         column_number: int):
        return line_number * len(self.grid[0]) + column_number

    def get_cell(self, cell_number: int):
        coord = self.get_coordinates_from_cell_number(self.grid, cell_number)
        return self.grid[coord[0]][coord[1]]

    def set_cell(self, cell_number: int, value: any):
        coord = self.get_coordinates_from_cell_number(self.grid, cell_number)
        self.grid[coord[0]][coord[1]] = value

    def get_same_value_cell_numbers(self, value: any):
        same = []
        for i in range(len(self.grid)):
            for j in range(len(self.grid[i])):
                if self.grid[i][j] == value:
                    same.append(
                        self.get_cell_number_from_coordinates(self.grid, i, j))
        return same

    def get_neighbour(self, line_number: int, column_number: int, delta: tuple[int, int], is_tore: bool):
        if is_tore:
            ligne = (line_number + delta[0]) % len(self.grid)
            colonne = (column_number + delta[1]) % len(self.grid[0])
            return self.grid[ligne][colonne]
        else:
            if ((line_number + delta[0]) < len(self.grid) and (column_number + delta[1]) < len(self.grid[0])):
                return self.grid[line_number + delta[0]][column_number + delta[1]]
            return None

    def get_neighborhood(self, line_number: int, column_number: int,
                         deltas: list[tuple[int, int]], is_tore: bool):
        neighbors = []
        for tup in deltas:
            neighbors.append(self.get_neighbour(
                self.grid, line_number, column_number, tup, is_tore))
        return neighbors

    def draw_with_turtle(self, cell_size: int, margin: int, show_values: bool):
        screen = turtle.getscreen()
        tur = turtle.Turtle()
        largeur = cell_size*len(self.grid[0])
        hauteur = cell_size*len(self.grid)
        screen.setup(largeur+margin*3, hauteur+margin*3)
        tur.speed(1000)

        def drawy(val):
            tur.sety(-hauteur/2)
            tur.up()
            tur.setpos(val, hauteur/2)
            tur.down()

        def drawx(val):
            tur.setx(-largeur/2)
            tur.up()
            tur.setpos(largeur/2, val)
            tur.down()

        def writeTruf(cell_size):
            fist_x = -cell_size*len(self.grid[0])/2 - 3 + cell_size/2
            fist_y = (cell_size*len(self.grid)/2) - 6-cell_size/2
            tur.up()
            i = 0
            for colonnes in self.grid:
                y = fist_y - i * cell_size
                i += 1
                tur.sety(y)
                j = 0
                for item in colonnes:
                    x = fist_x + j * cell_size
                    j += 1
                    tur.setx(x)
                    tur.write(item, font=("Cooper Black", 12))

        colonnes = int(len(self.grid[0])/2)
        chif = 0 if len(self.grid[0]) % 2 == 0 else cell_size/2
        tur.left(90)
        tur.up()
        tur.setpos(chif, hauteur/2)
        tur.down()
        for i in range(colonnes):
            drawy(cell_size*(i+1)+chif)
            drawy(-cell_size*(i+1)+chif)
        if len(self.grid[0]) % 2 == 0:
            drawy(-cell_size*(i+2))
        else:
            drawy(-cell_size*(i+2)+chif)
            drawy(-cell_size*(i+3)+chif)

        lines = int(len(self.grid)/2)
        chif = 0 if len(self.grid) % 2 == 0 else cell_size/2
        tur.right(90)
        tur.up()
        tur.setpos(largeur/2, chif)
        tur.down()
        for i in range(lines):
            drawx(cell_size*(i+1)+chif)
            drawx(-cell_size*(i+1)+chif)
        if len(self.grid) % 2 == 0:
            drawx(cell_size*(i+2))
        else:
            drawx(-cell_size*(i+2)+chif)
            drawx(-cell_size*(i+3)+chif)

        writeTruf(cell_size)
        tur.hideturtle()
        turtle.done()


def main():
    random.seed(1000)
    LINES_COUNT_TEST, COLUMNS_COUNT_TEST = 5, 7
    GRID_INIT_TEST = [
        [0] * COLUMNS_COUNT_TEST for _ in range(LINES_COUNT_TEST)]
    grid_random = Grid(GRID_INIT_TEST)
    grid_random.fill_random(list(range(2)))
    grid_random.draw_with_turtle(100, 20, True)


if __name__ == '__main__':
    main()
