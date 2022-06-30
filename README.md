# React clase tres

Este repositorio se hizo con la librería de `create-react-app`. Viene con muchos scripts y configuraciones ya armadas, pero la mayoría no serán necesarias. Para empezar a trabajar:

1. `npm install`
2. `npm start`

Eso es todo! La aplicación debería levantarse automáticamente en `localhost:3000`

## Tarea

En un proyecto nuevo, reimplementen la pokedex que hicieron previamente usando react, los requisitos para esto son:

- Crear un proyecto nuevo usando [create-react-app](https://create-react-app.dev/)
- Usar [react-router](https://reacttraining.com/react-router/web/guides/quick-start) para tener (al menos) dos páginas diferentes: una para buscar pokemons y otra para ver un pokemon específico.
- Implementar una solución para fetchear la data necesaria. No es necesario que tenga cache, pero puntos extra si tiene. Si quieren, pueden usar alguna librería para esto, pero queda en ustedes investigar y decidir si usar o no.

## FAQ

Si al correr los comandos para correr la app les tira un error que dice `ERR_OSSL_EVP_UNSUPPORTED`, cambien la siguiente línea del package.json:

```
//antes
"start": "react-scripts start"

//despues
"start": "react-scripts --openssl-legacy-provider start"
```

Este es un bug con node 17 y react-scripts que debería arreglarse eventualmente. Ante todo siempre es más recomendable usar [la versión LTS de node](https://nodejs.org/en/).
