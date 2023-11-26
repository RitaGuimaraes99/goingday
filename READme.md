```
npm install -g @ionic/cli
```

```
ionic serve
```

# Preparar a app
## Para dispositivo físico ou emulador

1. Preparar a app para qualquer plataforma de destino (Build web assets):

    ```bash
    ionic build 
    ```

    > Este comando cria a pasta `www`  
    (não necessária na distribuição da app, por exemplo, para upload para o Moodle)

1. Adicionar uma plataforma nativa ao projeto Ionic (cópia do _template_ da plataforma):
    ```bash
    ionic capacitor add android
    ```

   ou, de forma abrevida 

    ```bash
    ionic cap add android
    ```

    > Este comando cria a pasta `android`
    (não necessária na distribuição da app, por exemplo, para upload para o Moodle)  

Abrir o projeto Ionic/Capacitor no Android Studio:
  > Não é necessário ter o telemóvel ligado
  ```
  ionic cap open android 
  ```

  - Executar a app num dispositivo físico ou num emulador  

  Ligar o telemóvel, por USB, ao computador. O telemóvel deverá ter ativo o "Modo de depuração com USB".
  - Esta opção estará disponível, tipicamente, na opção _Opções do Programador_, nas definições (a localização/ativação difere entre dispositivos/sistemas diferentes).

  - Ou, em Definições » Definições adicionais » Opções do programador

  E executar o seguinte comando:  
  ```
  ionic capacitor run android
  ```

  ## Base de dados ##
  Supabase