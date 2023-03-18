import axios from 'axios'
import { defineStore } from 'pinia'


const apiKey = import.meta.env.VITE_OPENAI_API_KEY

const client = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    },
})

export const codeStore = defineStore("sql", {
    state: () => {
        return {
            loading: true,
        }
    },
    getters: {
    },
    actions: {
        async fetchRes(query, lang) {
            let prompt = `Translate this natural language query into ${lang}:\n\n"${query}"\n\n${lang}:`;

            let res = ""

            await client.post('https://api.openai.com/v1/completions', {
                prompt,
                temperature: 0.5,
                max_tokens: 2048,
                n: 1,
                stop: "\\n",
                model: "text-davinci-003",
                frequency_penalty: 0.5,
                presence_penalty: 0.5,
                logprobs: 10,
            })
                .then((resp) => {
                    res = resp.data.choices[0].text
                }).finally(() => {
                    this.loading = false
                })

            return res
        }
    }
})