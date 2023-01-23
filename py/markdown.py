# %% [markdown]
# # TP 1 :   `Sympy`

# %% [markdown]
# **Nom(s) :** &nbsp;&nbsp;&nbsp;&nbsp;   &nbsp;&ensp; &emsp;  ??   
# **Prénom(s) :** &emsp;&emsp;  ??

# %% [markdown]
# **Objectifs du TP** : 
# 
# - Savoir exécuter jupyter notebook, lancer/sauvegarder un notebook, utiliser les premières commandes Python standard, importer une librairie.
# - Introduction à sympy , quelques calculs de base et graphes symboliques
# 
# **Quelques conseils de base** : Pour chaque fiche de TP, nous utiliserons un calepin jupyter            notebook. Il est conseillé de créer unrépertoire INF2B2, puis un sous-répertoire pour chaque TP (e.g., TP1, TP2, TP3....). En général, une archive, que vous pouvez télécharger sur ecampus, est composée du fichier TP_X.ipynb qui contient les commandes (pratiquement) pré-remplies correspondant au TP X ainsi que les ressources nécessaires. Il faut *renommer* le fichier .ipynb sous  la forme <u>TP_X_Nom_Prenom.ipynb</u>. Dans un répertoire TP1, vous stockerez donc : 
#     - Le fichier TP_1_Nom_Prenom.ipynb
#     - Le fichier TP_1_Nom_Prenom au format PDF 
#     - Les fichiers de données (qui y seront téléchargés)

# %% [markdown]
# ## I) Calcul symbolique avec Sympy

# %%
import sympy as sp

import warnings
warnings.filterwarnings('ignore') # pour ne pas afficher les warnings
from IPython.display import display

sp.init_printing()

# %% [markdown]
# ### Exercice 1

# %% [markdown]
# **Rappel :**
# Il y a trois modèles de définition d'une fonction; par exemple pour la fonction qui à x associe 5x on peut définir
# 1. x = sp.symbols('x')
#    f = 5*x
# 2. def f(x) : 
#       return (5*x)
# 3. f = sp.Lambda([x], 5*x)

# %% [markdown]
# 1. Au moyen de la librairie `sympy`, définir de manière symbolique la fonction $f(x)=\frac{(x+4+(3x+5))}{(x+4)^2}$ et afficher f(2)
# 
#     Testez et comparer les trois modèles de définition de la fonction

# %%
x = sp.symbols('x') #---------------------Exo 1 ----------------------#

# %%
#Solution A
# A compléter ...
f=((x+4+(3*x+5))/(x+4)**2)
display(f)


# %%
#Solution B
# A compléter ...
def f(x):return ((x+4+(3*x+5))/(x+4)**2)
f(2)



# %%
#Solution C
# A compléter ...
f=sp.Lambda([x],((x+4+(3*x+5))/(x+4)**2))
f(2)


# %% [markdown]
# 2a. Dans chacun des cas, calculez la dérivée de f(x).
# On pourra essayer plusieurs affichages de f_prime (print, display, sp.pprint)

# %%
# A compléter ...
def derivee(x):return sp.diff(f(x),x)
derivee(x)

# %% [markdown]
# 2b.Calculer les zéros de la dérivée.

# %%
# A compléter ...
solution=sp.solve(derivee(x))
print(solution)

# %%
# A compléter ...
solution2=sp.solve(derivee(x))
display(solution2)

# %% [markdown]
# 3. Exprimer la dérivée sous forme factorisée (fonction factor) pour vérifier ses zéros et écrire une ligen de commande pour cette vérification.

# %%
# A compléter ...
derivee_fact=sp.factor(derivee(x))
display(derivee_fact)

# %%
# A compléter ...
sp.solve(derivee_fact)


# %% [markdown]
# 4. Calculer les limites de f(x) quand $x \to -\infty$, $x \to +\infty$, $x \to 2$

# %%
# A compléter ...
moinInf=sp.limit(f(x),x,'oo','-')
plusInf=sp.limit(f(x),x,'oo','+')
enDeux=sp.limit(f(x),x,2)
print(moinInf)
print(plusInf)
print(enDeux)


# %% [markdown]
# 5. Tracer la courbe de f(x) telle que : $$-4 \leq f(x) \leq4 $$
# 
#     On ne tracera la courbe que pour y compris entre -6 et +2 en utilisant l’option ylim

# %%
# %matplotlib inline
# A compléter ...
sp.plot(f(x),ylim=(-6,2),line_color='blue')

# %% [markdown]
# ### Exercice 2

# %% [markdown]
# 1. Définir la fonction $f(x)=2x^2-3x+1$

# %%
# A compléter ...
def f(x):return (2*x**2 - 3*x +1)
f(x)

# %% [markdown]
#  2. Calculer la dérivée de la fonction f

# %%
# A compléter ...
sp.diff(f(x),x)

# %% [markdown]
# 3. Définir la fonction g(x,y) comme le produit de f(x) par $2y^3$

# %%
# A compléter ...
y = sp.symbols('y')
def g(x,y):return (f(x) * 2*y**3)
g(x,y)

# %% [markdown]
# 4. Calculer la dérivée de g par rapport à x

# %%
# A compléter ...
sp.diff(g(x,y),x)

# %% [markdown]
# 5. Calculer la dérivée de g par rapport à y

# %%
# A compléter ...
sp.diff(g(x,y),y)

# %% [markdown]
# 6. Calculer une primitive de f

# %%
# A compléter ...
sp.integrate(f(x),x)

# %% [markdown]
# 7. Calculer l’intégrale de f entre 0 et 2

# %%
# A compléter ...
sp.integrate(f(x),(x,0,2))

# %% [markdown]
# 8. Tracer le graphe de la fonction f pour x variant entre 0 et 1.5

# %%
# A compléter ...
sp.plotting.plot(f(x),(x,0,1.5),line_color='blue',xscale="linear")

# %% [markdown]
# 9. Trouver les valeurs de x qui annulent f.

# %%
# A compléter ...
solution=sp.solve(f(x),dict=True)
print(solution)


