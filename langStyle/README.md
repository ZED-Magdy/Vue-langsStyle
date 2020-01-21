# Vue-langsStyle
an easy way to support multiple fonts for multiple languages in the same page.
### installing
```
npm i vue-langstyle --save
```
### For vue cli
```
import Vue from 'vue'
import langStyle from 'vue-langstyle'

Vue.use(langStyle);
// then you can add configs
langStyle.config({lang:"ch",Class: "zed"}); //default lang is ar
```
### For Nuxt
~/plugins/langStyle
```
import Vue from 'vue'
import langStyle from 'vue-langstyle'

Vue.use(langStyle);
langStyle.config({lang:"ch",Class: "zed"}); //default lang is ar
```
~/nuxt.config.js
```
  plugins: [
    {src: "~/plugins/langStyle.js"}
  ],
```
### Add some style to the language
```
.zed {
  font-size: 25px;
  color: red
}
```
### Style function
```
  style(text :string) returns String (HTML)
```
### Full example
```
<template>
  <div>
    <p v-html="text"></p>
</div>
</template>
<script>
export defaults {
data(){
  return {
    text: ""
  }
},
mounted(){
    // api call to get the text
    .then(resp => {
        this.text = this.$langStyle.style(resp.text)
    })
}
  
}
</script>
```

### You can use customLang function
##### customLang function
```
  customLang({
    Regex :string Regular expression for the language or the word,
    Class :string The class will be given to the language or word (Optional Default "custom"),
    Text :string The article body or the content that will be changed
  })
```
```
  this.text = this.$langStyle.customLang({Regex: /[\u0600-\u06FF]/,Class: "zed", Text: this.text});
```
### If you wanna use east asia language and arabic in the same page
#### You can use customLang for that

### Example
```
<template>
  <div>
    <h1>Home</h1>
    <p v-html="text"></p>
  </div>
</template>
<script>
export default {
  data (){
    return {
      text: "obis 龯 mollitia اهلا, velit sunt quidem 龯? Lorem ipsum dolor sit amet, 龯 مرحبا elit. Harum placeat facilis alias كيف حالك aut laborum labore totam, id dicta soluta 龯 龯, dolore n"
    }
  },
    mounted() {
        this.text = this.$langStyle.style(this.text)
        this.text = this.$langStyle.customLang({Regex: this.$langStyle.langs.east_asia,Class: "east_asia",Text: this.text})
    }
}
</script>
<style>
  .east_asia {
    color: red;
    font-family:///
  }
  .zed {
    color: blue;
    font-family:---
  }
</style>

```

