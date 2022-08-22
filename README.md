# Vue-Command-Palette

[Demo](Link.com)

> Command Palette Component For Vue3

## Demo

## Installization

```bash
 $ npm install vue-command-palette --save
```

## Usage

```html
<script>
  import CommandPalette from 'vue-command-palette';
  import 'vue-command-palette/style.css';
  export default {
    components: { CommandPalette },
    data() {
      return {

      };
    },
  };
</script>

<template>
  <div>
    <vue-command-palette></vue-command-palette>
</template>
```
### Props

| Prop                    | Description                                      | Type                                             | Default                 |
| ----------------------- | ------------------------------------------------ | ------------------------------------------------ | ------------------------|
| themeMode               | select the theme of the command palette          | `object`                                         |{dark:true, light: false}|
| modalKey                | command palette open modal keys                  | `string`                                         | "Control+k"             |
| customerCommandByGroup  | array included all command by group              | `array`                                          | []                      |
| isDisplayByGroup        | option to display by group or not                | `boolean`                                        | false                   |

### Events

| Name            | Description                                                                            | Callback Arguments                                     |
| --------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| update:value    | When the value change(v-model:value event)                                             | date                                                   |

### Slots
| Name          | Description              |
| ------------- | ------------------------ |
| cmd-name      | custom the command name  |
| cmd-key       | custom the command keys  |

## ChangeLog

[CHANGELOG](CHANGELOG.md)

## License

Copyright (c) 2022-present name
