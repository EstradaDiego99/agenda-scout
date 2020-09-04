## Ando bien confundido, así que escribiré mis ideas en este documento

El diseño de la base de datos ha sido un hermoso caos, aquí resumo un poco de las
decisiones que se han tomado:

La base de datos maneja un esquema fuertemente relacional.

Se decidió por utilizar mongoDB, específicamente mongoose para el proyecto. Esto
debido a la facilidad de uso y sencillez con la que futuros colaboradores podrán
ingresar al proyecto. También se hizo para mantener la consistencia de una
aplicación full JavaScript dentro de lo que se pudiera.

HERENCIA:
Se ha decidido utilizar un esquema de apuntador hacia el padre para mantener las
relaciones de herencia, un elemento dentro de otro.

> Por ejemplo, un muchacho apunta hacia la sección que lo contiene,
> esta sección apunta hacia el grupo que lo contiene,
> este grupo apunta hacia la provincia que lo contiene.

Lo que se almacenará para cada sesión en las cookies será el CUM de cada
usuario.

Para la sección relacional de la base de datos se prefiere guardar los
identificadores de los padres ya que estos aseguran mejor eficiencia al momento
de buscar información.
(Miembro x busca este grupo y esta provincia vs
Busca todos los miembros cuyo grupo o priviancia es y)

Cuando se trate de una relación 1:n con variables de por medio, se podría
utilizar una tabla adicional, pero para simplificar el diseño y mantener
normalización, lo que haremos será almacenar una lista con los valores y sus
atributos dentro del padre.

> Ejemplo: Los scoutes de una sección, dentro del modelo de esa sección tendremos
> una lista de scouters con los cargos correspondientes, y una función en el que
> dado un CUM de scouter, se determine qué cargo tiene dentro de los scouters de
> la sección.

Las agrupaciones (seisenas/patrullas/equipos/equipo) manejarán un esquema
similar con la lista de sus miembros en sus diferentes tiempos. Los muchachos
tendrán una función en la que podrán acceder a su patrulla realizando una
búsqueda dentro de su sección de qué patrulla los contiene en sus miembros.
Esto asegura normalización.

Las agrupaciones se pueden manejar como subdocumentos del documento de sección,
o se puede manejar como su propia colección. El primero simplifica el diseño
mientras que el segundo otorga libertad a una patrulla de cambiarse de sección y
de grupo. Se escogerá la primera por ahora para simplificar la implementación
inicial.

La información actual la mantendremos en un nivel superior, y tendremos objetos
historial que contendrán todo lo histórico, como las insignias, patrullas, e
incluso grupos
