import random


def get_grid(line: int, column: int, val: any):
    listes = []

    for i in range(line):
        temporel_list = []

        for j in range(column):
            temporel_list.append(val)

        listes.append(temporel_list)

    return listes


def get_random_grid(line: int, column: int, values: list[any]):
    listes = []

    for i in range(line):
        temporel_list = []

        for j in range(column):
            temporel_list.append(random.choice(values))

        listes.append(temporel_list)

    return listes


def get_lines_count(grid: list[list[any]]): return len(grid)


def get_columns_count(grid: list[list[any]]):
    return len(grid[0]) if len(grid) else 0


def get_line(grid: list[list[any]], line_number: int):
    return grid[line_number] if len(grid) > line_number else []


def get_column(grid: list[list[any]], column_number: int):
    colonne = []
    if len(grid) > 0 and len(grid[0]) > column_number:
        for line in grid:
            colonne.append(line[column_number])

    return colonne


def get_line_str(grid: list[list[any]], line_number: int, separator: str):
    ligne = get_line(grid, line_number)
    ligne_str = str(ligne[0]) if (len(ligne)) else ""
    for i in range(1, len(ligne)):
        ligne_str += separator+str(ligne[i])

    return ligne_str


def get_grid_str(grid: list[list[any]], separator: str):
    colonnes = get_line_str(grid, 0, separator)
    for i in range(1, len(grid)):
        colonnes += '\n' + get_line_str(grid, i, '')

    return colonnes


def get_diagonal(grid: list[list[any]]):
    diagonal = []
    number_colonne = len(grid[0]) if len(grid) else 0
    i = 0
    while (i < len(grid) and i < number_colonne):
        diagonal.append(grid[i][i])
        i += 1

    return diagonal


def get_anti_diagonal(grid: list[list[any]]):
    anti_diagonal = []
    number_colonne = len(grid[0]) if len(grid) else 0
    i = 0
    while (i < len(grid) and i < number_colonne):
        anti_diagonal.append(grid[i][number_colonne-i-1])
        i += 1

    return anti_diagonal


def has_equal_values(grid: list[list[any]], value: any):
    for colonne in grid:
        for item in colonne:
            if (item != value):
                return False
    return True


def is_square(grid: list[list[any]]):
    if len(grid):
        return True if len(grid) == len(grid[0]) else False

    # une grid avec zéro ligne est carré
    return True


def get_count(grid: list[list[any]], value: any):
    count = 0
    for colonne in grid:
        for item in colonne:
            if (item == value):
                count += 1
    return count


def get_sum(grid: list[list[any]]):
    somme = 0
    for colonne in grid:
        for item in colonne:
            somme += item

    return somme


def get_coordinates_from_cell_number(grid: list[list[any]], cell_number: int):
    k = 0
    for i in range(len(grid)):
        for j in range(len(grid[i])):
            if (k == cell_number):
                return (i, j)
            k += 1

    return (-1, -1)


def get_cell_number_from_coordinates(grid: list[list[any]], line_number: int,
                                     column_number: int):
    return line_number * len(grid[0]) + column_number


def get_cell(grid: list[list[any]], cell_number: int):
    coord = get_coordinates_from_cell_number(grid, cell_number)
    return grid[coord[0]][coord[1]]


def set_cell(grid: list[list[any]], cell_number: int, value: any):
    coord = get_coordinates_from_cell_number(grid, cell_number)
    grid[coord[0]][coord[1]] = value


def get_same_value_cell_numbers(grid: list[list[any]], value: any):
    same = []
    for i in range(len(grid)):
        for j in range(len(grid[i])):
            if grid[i][j] == value:
                same.append(get_cell_number_from_coordinates(grid, i, j))
    return same


def get_neighbour(grid: list[list[any]], line_number: int, column_number: int, delta: tuple[int, int], is_tore: bool):
    if is_tore:
        ligne = (line_number + delta[0]) % len(grid)
        colonne = (column_number + delta[1]) % len(grid[0])
        return grid[ligne][colonne]
    else:
        if ((line_number + delta[0]) < len(grid) and (column_number + delta[1]) < len(grid[0])):
            return grid[line_number + delta[0]][column_number + delta[1]]
        return None


def get_neighborhood(grid: list[list[any]], line_number: int, column_number: int,
                     deltas: list[tuple[int, int]], is_tore: bool):
    neighbors = []
    for tup in deltas:
        neighbors.append(get_neighbour(
            grid, line_number, column_number, tup, is_tore))
    return neighbors


GRID_CONST_TEST = get_grid(5, 7, 0)
GRID_RANDOM_TEST = get_random_grid(5, 7, range(2))
print(GRID_CONST_TEST)
print(GRID_RANDOM_TEST)
print(get_lines_count(GRID_CONST_TEST))
print(get_columns_count(GRID_CONST_TEST))
print(get_line(GRID_RANDOM_TEST, 1))
print(get_column(GRID_RANDOM_TEST, 6))
print(get_line_str(GRID_RANDOM_TEST, 2, '\t'))
print(get_grid_str(GRID_RANDOM_TEST, ''))
print(get_diagonal(GRID_RANDOM_TEST))
print(get_anti_diagonal(GRID_RANDOM_TEST))
print(has_equal_values(GRID_CONST_TEST, 0))
print(has_equal_values(GRID_RANDOM_TEST, 0))
print(is_square(GRID_RANDOM_TEST))
print(get_count(GRID_RANDOM_TEST, 1))
print(get_sum(GRID_RANDOM_TEST))
print(get_coordinates_from_cell_number(GRID_RANDOM_TEST, 13))
print(get_cell_number_from_coordinates(GRID_RANDOM_TEST, 1, 6))
print(get_cell(GRID_RANDOM_TEST, 9))
set_cell(GRID_RANDOM_TEST, 9, 1)
print(get_cell(GRID_RANDOM_TEST, 9))
print(get_same_value_cell_numbers(GRID_RANDOM_TEST, 1))
print(get_neighbour(GRID_RANDOM_TEST, 1, 6, (0, 1), True))
print(get_neighbour(GRID_RANDOM_TEST, 1, 6, (0, 1), False))
WIND_ROSE = ((-1, 0), (-1, 1), (0, 1), (1, 1),
             (1, 0), (1, -1), (0, -1), (-1, -1))
print(get_neighborhood(GRID_RANDOM_TEST, 1, 6, WIND_ROSE, True))
print(get_neighborhood(GRID_RANDOM_TEST, 1, 6, WIND_ROSE, False))
