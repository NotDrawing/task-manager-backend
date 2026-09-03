# Reflexión — EC1 F1 A2

**Nombre:** [Urbina Gutiérrez Angel]
**Grupo:** [001]

## 1. Función de Node.js

Node.js es el entorno de ejecución que permite ejecutar JavaScript/TypeScript en el servidor, fuera del navegador. En este proyecto se usa para:

- Ejecutar el código TypeScript directamente gracias a `tsx` (script `start` en `package.json`).
- Leer variables de entorno mediante `process.env` (archivo `utils/env.ts`).
- Manejar temporizaciones con `setTimeout` para simular operaciones asíncronas (`utils/delay.ts`).
- Mostrar información por consola con `console.log` y capturar errores.

Sin Node.js, la aplicación no podría correr ni interactuar con el sistema operativo.

---

## 2. Aportes de TypeScript

TypeScript ayuda a detectar errores en **tiempo de compilación** antes de ejecutar la aplicación, gracias a:

- **Tipado estático**: por ejemplo, la interfaz `Task` y el tipo `TaskStatus` definen la estructura de los datos; si se usa mal, el compilador lo señala.
- **Configuración estricta**: `"strict": true` y `"noUncheckedIndexedAccess": true` en `tsconfig.json` previenen errores comunes como acceder a índices inexistentes.
- **Interfaces y tipos**: facilitan el contrato de datos y mejoran el autocompletado y la refactorización segura en el editor.

Esto reduce errores en producción y hace el código más mantenible.

---

## 3. Separación de models, data, services y utils

La separación en carpetas sigue el principio de **responsabilidad única** y facilita el mantenimiento:

- **`models/`**: define los contratos de datos (interfaces y tipos), como `Task` y `TaskStatus`.
- **`data/`**: contiene los datos iniciales (array de tareas de ejemplo), separado de la lógica.
- **`services/`**: aloja la lógica de negocio: crear, listar, buscar y completar tareas.
- **`utils/`**: agrupa utilidades transversales, como `delay` (espera asíncrona) y la lectura de variables de entorno (`env`).

Esta organización permite que cada parte sea reutilizable y fácil de testear de forma aislada.

---

## 4. Diferencia entre síncrono y async

- **Operación síncrona**: bloquea el hilo de ejecución hasta que finaliza. Las operaciones se ejecutan secuencialmente. En el proyecto, `createTask`, `listTasks` y `completeTask` son síncronas.
- **Función `async`** (asíncrona): no bloquea; permite que el programa continúe mientras se espera la finalización de la operación (por ejemplo, una promesa). En el código, `delay` es asíncrona y se usa con `await` para pausar sin bloquear el resto.

La principal diferencia es que `async` devuelve una `Promise` y habilita el uso de `await` para manejar flujos asíncronos de forma más legible.

---

## 5. `findTaskById` devuelve `Task | undefined`

Esta función busca una tarea por su ID en el arreglo. Si no encuentra ninguna con ese ID, retorna `undefined`. Esto es intencional:

- Permite manejar el caso de "no encontrado" sin lanzar excepción.
- TypeScript obliga a quien llama a verificar si el resultado es `undefined` antes de usarlo, evitando errores de acceso a propiedades de `undefined` en tiempo de ejecución.

Es una práctica segura y común para operaciones de búsqueda.

---

## 6. Ventaja de leer `APP_NAME` desde `process.env`

Leer `APP_NAME` (y cualquier otra variable sensible) desde el entorno ofrece:

- **Seguridad**: los secretos (claves API, contraseñas, etc.) no quedan hardcodeados en el repositorio, por lo que no son visibles para terceros con acceso al código.
- **Flexibilidad**: se puede cambiar el valor sin modificar el código, simplemente configurando la variable en el entorno de ejecución (desarrollo, testing, producción).
- **Valor por defecto**: en `utils/env.ts` se asigna un valor por defecto (`'Task Manager Backend'`) si no está definida, lo que evita fallos y permite que la app funcione sin configuración adicional.

---

## 7. Diferencia entre `pnpm start` y `pnpm build + pnpm serve`

- **`pnpm start`**: ejecuta directamente el código TypeScript usando `tsx` (o similar) sin compilar previamente. Es rápido para desarrollo, pero tiene sobrecarga de transpilación en caliente y no es óptimo para producción.
- **`pnpm build + pnpm serve`**: primero compila el código TypeScript a JavaScript (con `tsc`, generando archivos en `dist/`) y luego ejecuta el JavaScript compilado con Node.js. Esto es más eficiente en rendimiento y es la práctica recomendada para entornos productivos, ya que separa la compilación de la ejecución.

En resumen, `start` es para desarrollo y `build + serve` para producción.

---

## 8. Partes reutilizables al construir una API con Express

Al migrar a una API con Express, se pueden reutilizar varias capas del proyecto actual:

- **Modelos (`models/`)**: las interfaces `Task` y `TaskStatus` son independientes del transporte y servirán para definir los esquemas de datos en la API.
- **Servicios (`services/`)**: la lógica de negocio (crear, listar, completar, buscar) es reutilizable tal cual, solo se adaptaría la entrada/salida a los controladores de Express.
- **Utilidades (`utils/`)**: `delay` y la lectura de variables de entorno son genéricas y pueden seguir usándose.
- **Estructura modular**: la separación en capas facilita la integración con Express, donde los controladores llamarían a los servicios y estos usarían los modelos.

El punto de entrada (`index.ts`) sería reemplazado por los endpoints de Express, pero el núcleo de la aplicación se conserva.