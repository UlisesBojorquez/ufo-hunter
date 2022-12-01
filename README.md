# Ufo Hunter

## Descripcion Final Del proyecto

La escena se compone de varios elementos. Entre ellos se tiene la **bóveda celeste** del espacio con sus **estrellas** orbitando
alrededor de **planetas**, **cubos**, un **OVNI** que es controlado por el usuario y **cuerpo de agua** que refleja todo lo anterior mencionado.

Todos los elementos están animados, tienen sus texturas y se tiene una fuente de luz que ilumina todo lo demás, haciendo también posible el reflejo del efecto del agua.

![](/entrega_final_fotos/boveda_celeste.png "Foto de estrellas")

*1.1 Foto de las estrellas orbitando alrededor del resto de los elementos*

![](/entrega_final_fotos/planeta.png "Foto de planeta")

*1.2 Foto de un planeta que orbita alrededor y es posicionado de forma aleatoria en la escena*

![](/entrega_final_fotos/caja.png "Foto de cubo")

*1.3 Foto de una de las cajas que es posicionada justo por encima del cuerpo de agua y que está a la misma altura que el OVNI*

![](/entrega_final_fotos/ovni.png "Foto de ovni")

*1.4 Foto del OVNI que se compone de una capsula, un cuerpo que gira alrededor de él y una luz que parpadea constantemente*

![](/entrega_final_fotos/agua.png "Foto de agua")

*1.5 Foto del cuerpo de agua que refleja el resto de los elementos que están por encima (planetas, ovni, estrellas, cubos)*

![](/entrega_final_fotos/escena.png "Foto de escena")

*1.6 Foto de todos los elementos en la escena*

## Animaciones
### OVNI
El OVNI tiene animados todos sus elementos; el cuerpo y la capsula giran sobre su propio eje. El cuerpo es un disco semitransparente de textura metálica, así como la capsula. 

Por debajo emerge una luz que cambia su opacidad con el tiempo para dar el efecto de que está parpadeando. Todos los objetos se mueven juntos al presionar las teclas WASD.

### Agua
El agua tiene la animación de simular un cuerpo de agua que refleja la luz y las formas justo por encima de este cuerpo, además de ser semi-transparente.

### Cubos
Los cubos se mueven de arriba a abajo mientras giran sobre su propio con el tiempo.

### Planetas
Los planetas solo giran sobre su propio eje.

### Estrellas
Estrellas son generadas y puestas alrededor de la escena. Estas giran alrededor del resto de los objetos simulando las estrellas del espacio.

## Interacciones
### OVNI
El OVNI puede ser movido por usuario usando las teclas WASD. Al tocar uno de los cubos que se encuentran a la misma altura que el cuerpo de agua, estos desparecen y se reproduce un sonido para indicar que han sido destruidos. El OVNI también contiene el sonido de una nave viajando por el espacio que se escucha más fuerte al estar más cerca del OVNI.

### Cámara
Se puede mover alrededor de la escena usando el mouse y los clicks de este. Al mantener click izquierdo con el mouse, se puede girar la cámara en cualquier dirección. El click derecho mueve la cámara por la escena. Finalmente, la rueda del mouse es para realizar zoom a la escena desde el punto de vista de la cámara. Se ha agregado música ambiental que se escucha en todo momento.

## Hecho por

Ulises Bojórquez Ortiz - A01114716

Luis Alberto Bodart Valdez - A01635000

Francisco Salgado Guízar - A01365047

## Creditos

* Texturas para los planetas obtenidas de [SolarSystemScope](https://www.solarsystemscope.com/textures/)
* Shaders del agua obtenidas de [ShadersOcean](https://threejs.org/examples/webgl_shaders_ocean.html)

## Descripción del tercer avance del proyecto

* Se ha agregado un objeto al ovni que simula un rayo que sale por debajo

![](/evidencias_tercera_entrega/light.png "Código de rayo de luz")
* Se han agregado texturas y propiedades a los componentes del Ovni (body y capsule)

![](/evidencias_tercera_entrega/texturas.png "Código de agregado de texturas")
* Se han agregado animaciones a todos los componentes del Ovni, incluida la luz que su opacidad cambia con el tiempo

![](/evidencias_tercera_entrega/animacion.png "Código de agregado de animaciones")
* Se ha agregado una función para detectar colisiones entre 2 objetos 3D

![](/evidencias_tercera_entrega/colisiones.png "Código de función de colisiones")
* Se ha agregado una función para eliminar objetos 3D

![](/evidencias_tercera_entrega/remover.png "Código de función de remover")
* Se ha agregado una función que al detectar que el ovni toca uno de los cubos en el espacio, este sea removido

![](/evidencias_tercera_entrega/remover_cubo.png "Código de función de remover cubo")
* Se han actualizado los **event listeners** para mover todos los componentes del Ovni, incluyendo el agregado y para detectar colisiones con los cubos para eliminarlos

![](/evidencias_tercera_entrega/actualizacion.png "Actualización de event listeners")
