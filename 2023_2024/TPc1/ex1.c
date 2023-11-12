#include <stdio.h>
#include <stdlib.h>


// Veuillez écrire une fonction recopie_ligne qui prend en paramètres :
// une grille d'entiers,
// son nombre de lignes,
// son nombre de colonnes,
// un numéro de ligne i1
// un deuxième numéro de ligne i2

// Cette fonction modifiera (sans renvoyer quoi que ce soit) la grille de sorte que la ligne numéro i1 soit remplacée par la ligne numéro i2. Attention on veut que les deux lignes restent indépendantes !

// Par exemple, recopie_ligne(grille_exemple,3,2,1,2) doit changer le 3 de la grille exemple par un 5 et le 4 par un 6.
void recopie_ligne(int** grille, int nb_lignes, int nb_colonnes, int i1, int i2) {
    
    // Copie du contenu du tableau grille[i2][j] dans la ligne i1
    for (int j = 0; j < nb_colonnes; j++) {
        grille[i1][j] = grille[i2][j];
    }

    for (int i = 0; i < 3; i++)
    {
        for(int j = 0; j < 2; j++){
                printf("%d ",grille[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}

int main() {
    int** grille_exemple = malloc(3*sizeof(int*)); 
    for(int i = 0; i < 3; i++){
        grille_exemple[i] =  malloc(2*sizeof(int)); 
    }

    int cpt = 1;
    for(int i = 0; i < 3; i++){
        for(int j = 0; j < 2; j++){
            grille_exemple[i][j] = cpt;
            cpt++;
        }
    }

    grille_exemple[2] = grille_exemple[1]; 
    // A votre avis, que fait cette ligne de code ?
    // La ligne grille_exemple[2] = grille_exemple[1]; copie l'adresse de la première ligne de la grille (grille_exemple[1]) dans la troisième ligne (grille_exemple[2]). 
    // Cela ne copie pas les valeurs, mais simplement l'adresse de la première ligne.

    for(int i = 0; i < 3; i++){
        for(int j = 0; j < 2; j++){
                printf("%d ",grille_exemple[i][j]);
        }
        printf("\n");
    } 
    printf("\n");

    // Est-ce conforme à vos attentes ?
    // Oui car les deux lignes grille_exemple[1] et grille_exemple[2] pointent vers la même zone de mémoire.


    grille_exemple[2][1] = 9;

    for(int i = 0; i < 3; i++){
        for(int j = 0; j < 2; j++){
                printf("%d ",grille_exemple[i][j]);
        }
        printf("\n");
    } 
    printf("\n");

    // Que se passe-t-il ? Pouvez-vous expliquer ce phénomène ?
    // La ligne grille_exemple[1] a été modifier
    // Etant donner que grille_exemple[1] et grille_exemple[2] pointent vers la même zone de mémoire, la modification de l'un est egale à la modification de l'autre.

    recopie_ligne(grille_exemple, 3, 2, 1, 2);

    // Retourne 0 pour indiquer une exécution sans erreur
    return 0;
}




