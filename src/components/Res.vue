<template >
    <div class="md:w-1/2 w-full px-2 md:px-0 justify-center flex flex-col gap-4 border-none focus:border-none text-white">
        <div class="text-2xl mx-2 font-bold text-gray-500">
            <span class="text1"></span>
            <span class="cursor1">|</span>
        </div>
        <textarea @keypress.enter="getRes" placeholder="Type your text here" ref="inputText"
            class="p-2 mx-2 rounded-md bg-[#292C34] w-full focus:outline-none" v-model="input"></textarea>
        <select v-model="selected" class="p-2 mx-2 rounded-md bg-[#292C34] w-full">
            <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
        </select>
        <button @click="getRes" class="p-2 mx-2 rounded-md bg-[#23CE6B] hover:bg-opacity-80 w-full">Convert</button>
        <div v-if="loading" class="p-2 flex w-full relative justify-center rounded-md mx-2">
            <loader />
        </div>
        <div v-else class="p-2 flex w-full relative bg-[#292C34] rounded-md mx-2">
            <pre class="w-full" v-highlightjs><code :class="selected">{{ res }}</code></pre>
            <button @click="copyCode" class="absolute right-2 top-2 text-white rounded-md hover:text-[#23CE6B]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                </svg>

            </button>
        </div>

    </div>
</template>
<script>
import { codeStore } from '../store/codeStore.js'
import { HighCode } from 'vue-highlight-code';
import 'vue-highlight-code/dist/style.css';
import { ref } from 'vue'
import Loader from './Loader.vue'
import { gsap } from 'gsap'
import { SteppedEase } from 'gsap/all'
import { TextPlugin } from 'gsap/TextPlugin'
export default {
    components: {
        HighCode,
        Loader
    },
    setup() {
        const codeS = codeStore()
        const res = ref("")

        return {
            codeS,
            res
        }
    },
    data() {
        return {
            input: "",
            loading: false,
            selected: "sql",
            languages: ['sql', 'javascript', 'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'swift', 'kotlin', 'dart', 'rust', 'scala', 'perl', 'lua', 'haskell', 'erlang', 'elixir', 'clojure', 'coffeescript', 'typescript', 'r', 'racket', 'prolog', 'lisp', 'fortran', 'f#', 'd', 'crystal', 'cobol', 'c', 'bash', 'assembly', 'ada', 'actionscript', 'abap']
        }
    },
    mounted() {
        gsap.registerPlugin(SteppedEase)
        gsap.registerPlugin(TextPlugin)
        this.$refs.inputText.focus()
        this.animateText()
    },
    methods: {
        async getRes() {
            this.loading = true
            const ress = await this.codeS.fetchRes(this.input, this.selected)
            if (ress) {
                this.res = ress
                this.loading = false
            }
        },
        copyCode() {
            if (this.res) {
                navigator.clipboard.writeText(this.res)
                this.$toast.open({
                    message: "Copied Successfully",
                    type: "success",
                    duration: 1000 * 2,
                    dismissible: true
                })
            }
        },
        animateText() {
            let text = document.querySelector(".text1")
            let cursor1 = document.querySelector(".cursor1")
            let tl = gsap.fromTo(cursor1, { autoAlpha: 0, x: 2 }, { autoAlpha: 1, duration: 0.5, repeat: -1, ease: SteppedEase.config(1) });
            tl.play()
            gsap.to(text, {
                text: {
                    value: "Convert your text to code easily",
                    delimiter: ""
                },
                duration: 5,
                delay: 1,
                ease: "none",
                onUpdate: () => text.appendChild(cursor1),
                onComplete: () => {
                    tl.pause()
                }
            })
        }



    },

}
</script>
