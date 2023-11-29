#include <stdio.h>
#include <unistd.h>
#include <stdbool.h>

enum Statut {
    sol, trou
};

enum Mouvement {
    droite, saut
};

void affiche_ciel(int taille, int position, bool en_saut) {
    for (int i = 0; i < taille; ++i) {
        if (i == position && en_saut) {
            printf("O");
        } else {
            printf(" ");
        }
    }
    printf("\n");
}

// Fonction pour afficher le sol
void affiche_sol(enum Statut* niveau, int taille, int position, int en_saut) {
    for (int i = 0; i < taille; ++i) {
        if (i == position && !en_saut) {
            printf("O");
        } else {
            printf(niveau[i] == sol ? "_" : " ");
        }
    }
    printf("\n");
}


void affiche_niveau(enum Statut* niveau, int taille, int position, int en_saut) {
    printf("\e[H\e[2J\e[3J"); 
    affiche_ciel(taille, position, en_saut);
    affiche_sol(niveau, taille, position, en_saut);
}

int execute_niveau(enum Statut* niveau, int taille, enum Mouvement* actions, int nb_actions) {
    int position = 0;
    bool en_saut = false;

    for (int i = 0; i < nb_actions; ++i) {
        affiche_niveau(niveau, taille, position, en_saut);
        usleep(1000000);  

        if (actions[i] == droite) {
            if (en_saut) {
                en_saut = 0;  
                position += 2;
            } else {
                position++;
            }
        } else if (actions[i] == saut) {
            en_saut = true;  
            position += 2;
        }
        if (position < 0 || position >= taille || niveau[position] == trou) {
            return 0;  
        }
    }

    return position >= taille;  
}

int main() {
    enum Statut terrain[] = {sol, sol, trou, sol, sol, trou, trou, sol, trou, trou, sol, sol, sol, sol, sol, trou, sol, sol, trou, sol, sol};
    enum Mouvement actions[] = {droite, saut, saut, saut, droite, droite, droite, saut, droite, saut, droite};

    int taille_terrain = sizeof(terrain) / sizeof(terrain[0]);
    int nb_actions = sizeof(actions) / sizeof(actions[0]);
    if (execute_niveau(terrain, taille_terrain, actions, nb_actions))
    {
        printf("Victoire !\n");
    }
    else
    {
        printf("Défaite.\n");
    }

    return 0;
}
