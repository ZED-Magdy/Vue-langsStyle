let HtmlGenerator = (Regex, text, Class = defaults.className) => {
    let finalText = ""
    let scentProgress = 0
    Regex = new RegExp(Regex)
    let textArr = text.split(' ')
    textArr.forEach((element, i) => {
        if (Regex.test(element)) {
            if (!scentProgress) {
                scentProgress = 1
                finalText += `<span class="${Class}">` + element + " "
            } else {

                if (i < textArr.length) {
                    if (!Regex.test(textArr[i + 1])) {
                        scentProgress = 0
                        finalText += element + `</span>` + " "
                    } else {
                        finalText += element + " "
                    }
                }
            }


        } else {
            if (scentProgress) {
                finalText += `</span>` + element + " "
                scentProgress = 0
            } else {
                finalText += element + " "
            }
        }
    });
    return finalText

}
const langStyle = {
    install(Vue,options){
        Vue.prototype.$langStyle = this
        Vue.langStyle = this
    },
    defaults :{
        lang: 'ar',
        langs: {
            arabic: /[\u0600-\u06FF]/,
            east_asia: /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/,
        },
        className: "custom",
    },
    config ({
        lang = null,
        Class = null
    }) {
        if (lang !== null) {
            this.defaults.lang = lang;
        }
        if (Class !== null) {
            this.defaults.className = Class
        }
    },
    style(text){
        if(this.defaults.lang === 'ar'){
           return HtmlGenerator(this.defaults.langs.arabic,text,this.defaults.className)
        }
        else {
            return HtmlGenerator(this.defaults.langs.east_asia,text,this.defaults.className)
        }
    },
    customLang({
        Regex,
        Class = defaults.className,
        Text
    }) {
        return HtmlGenerator(Regex,Text,Class);
    }

}

export default langStyle