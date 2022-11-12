# Ufo Hunter

El Ovni se mueve usando las teclas WASD

## Hecho por

Ulises Bojórquez Ortiz - A01114716

Luis Alberto Bodart Valdez - A01635000

Francisco Salgado Guízar - A01365047

## Creditos

* Texturas para los planetas obtenidas de [SolarSystemScope](https://www.solarsystemscope.com/textures/)
* Shaders del agua obtenidas de [ShadersOcean](https://threejs.org/examples/webgl_shaders_ocean.html)

## Descripción del tercer avance del proyecto

* Se ha agregado un objeto al ovni que simula un rayo que sale por debajo

![](evidencias_tercera_entrega\light.png "Código de rayo de luz")
* Se han agregado texturas y propiedades a los componentes del Ovni (body y capsule)

![](evidencias_tercera_entrega\texturas.png "Código de agregado de texturas")
* Se han agregado animaciones a todos los componentes del Ovni, incluida la luz que su opacidad cambia con el tiempo

![](evidencias_tercera_entrega\animacion.png "Código de agregado de animaciones")
* Se ha agregado una función para detectar colisiones entre 2 objetos 3D

![](evidencias_tercera_entrega\colisiones.png "Código de función de colisiones")
* Se ha agregado una función para eliminar objetos 3D

![](evidencias_tercera_entrega\remover.png "Código de función de remover")
* Se ha agregado una función que al detectar que el ovni toca uno de los cubos en el espacio, este sea removido

![](evidencias_tercera_entrega\remover_cubo.png "Código de función de remover cubo")
* Se han actualizado los **event listeners** para mover todos los componentes del Ovni, incluyendo el agregado y para detectar colisiones con los cubos para eliminarlos

![](evidencias_tercera_entrega\actualizacion.png "Actualización de event listeners")