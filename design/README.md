# design/

Plantillas de las imágenes de marca. Están aquí, fuera de `public/`, porque son
la **fuente** de dos archivos del sitio y no recursos que haya que publicar.

| Plantilla         | Genera               | Tamaño   |
| ----------------- | -------------------- | -------- |
| `og-card.html`    | `public/og.png`      | 1200×630 |
| `favicon.html`    | `public/favicon.png` | 512×512  |

Las dos usan los mismos tokens que `src/index.css` (placa `#E5E7EB`, carbón
`#000`, Instrument Sans peso 500 en caja baja con tracking negativo, lima
`#E2FF70` siempre con la letra en negro). Si cambia la paleta o la tipografía
del sitio, hay que regenerarlas: no se actualizan solas.

## Regenerar

Se rasterizan con Chrome en modo headless, que escribe el PNG al tamaño exacto
de la ventana. Desde la raíz del repo, en PowerShell:

```bash
& "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --virtual-time-budget=12000 --window-size=1200,630 --screenshot="$PWD\public\og.png" "$PWD\design\og-card.html"
```

```bash
& "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --virtual-time-budget=12000 --window-size=512,512 --screenshot="$PWD\public\favicon.png" "$PWD\design\favicon.html"
```

`--virtual-time-budget` es lo que le da tiempo a bajar Instrument Sans de Google
Fonts. Si se quita, Chrome captura antes de que llegue la fuente y el PNG sale
en la tipografía de respaldo del sistema sin avisar de nada: conviene abrir el
PNG y mirarlo después de cada regeneración.

## Detalles que no son evidentes

- **Los cortes de línea del titular van a mano.** El fondo de un elemento en
  línea ocupa toda la caja de la fuente, así que con el interlineado cerrado del
  sistema el bloque de lima invade la línea de arriba y le corta los rasgos
  descendentes. Dejando `funciona en` —que no tiene ninguno— justo encima de
  `producción`, cae limpio sin tener que aflojar el interlineado.
- **La ese del favicon está centrada a mano**, cuatro píxeles medidos sobre el
  render: centrar por caja no centra el glifo, porque la caja de la línea
  reserva sitio para ascendentes y descendentes que la ese no usa.
- **El favicon se juzga a 16 px, no a 512.** A ese tamaño lo que identifica es
  la mancha de lima, no la letra; por eso la ese ocupa casi todo el cuadrado.
