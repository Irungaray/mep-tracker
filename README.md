# mep-tracker

![image](https://github.com/Irungaray/mep-tracker/assets/62315823/ca14af90-2523-44d9-aa7f-b5a272b527a6)

CRON? para trackear el precio de los bonos Argy en tiempo real.

No encontré APIs que devuelvan el precio en tiempo real, de manera que hice un manejo de datos muy extraño con el HTML crudo que devuelve https://www.rava.com/perfil/{bond}.

<br />

En ```./samples```:

  ```raw-output.html```: La respuesta cruda

```string-to-parse.txt```: El string con los datos a parsear

```parsed-output.js```: El producto final

<br />

Muy polémico.

<br />

Uso:
```
  node main.js <bond>
```
  
  
Ejemplo:
```
  node main.js al30
  node main.js al30d
```

Requiere node v^16.x.x

<i>Perdón rava por el ddoseo.</i>
