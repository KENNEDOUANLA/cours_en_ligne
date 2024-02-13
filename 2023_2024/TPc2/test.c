#include <stdio.h>
#include <stdlib.h>

int main() {
    // Ouvrir le fichier en mode lecture
    FILE *fichier = fopen("doublez_moi.txt", "r+");
    if (fichier == NULL) {
        perror("Erreur lors de l'ouverture du fichier");
        return 1;
    }

    // Aller à la fin du fichier pour connaître sa taille
    fseek(fichier, 0, SEEK_END);
    long taille = ftell(fichier);

    // Allouer de la mémoire pour le contenu du fichier
    char *contenu = (char *)malloc(taille * sizeof(char));
    if (contenu == NULL) {
        perror("Erreur lors de l'allocation de mémoire");
        fclose(fichier);
        return 1;
    }

    // Revenir au début du fichier
    fseek(fichier, 0, SEEK_SET);

    // Lire le contenu du fichier
    fread(contenu, sizeof(char), taille, fichier);

    // Écrire le contenu deux fois dans le fichier
    fwrite(contenu, sizeof(char), taille, fichier);
    fwrite(contenu, sizeof(char), taille, fichier);

    // Libérer la mémoire
    free(contenu);

    // Fermer le fichier
    fclose(fichier);

    printf("Le fichier a été modifié avec succès.\n");

    return 0;
}
