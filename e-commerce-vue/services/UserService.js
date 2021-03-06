/** UserService.js
 * Permet au client de faire des appels d'API depuis n'importe quel component
 * Relier le server au client
 */

import axios from "axios"
const instance = axios.create(
    {
        baseURL: "",
        withCredentials: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    })

export default {
    async getArticles() {
        let res = await instance.get("https://hypetalk.netlify.app/api/articles");
        return res.data;
    },

    async getSneakers() {
        let res = await instance.get("https://hypetalk.netlify.app/api/sneakers");
        return res.data;
    },

    async getStreetwear() {
        let res = await instance.get("https://hypetalk.netlify.app/api/streetwear");
        return res.data;
    },

    async getArticleSingle(articleId) {
        let res = await instance.get("https://hypetalk.netlify.app/api/article/" + articleId);
        return res.data;
    },

    async getPanier() {
        let res = await instance.get("https://hypetalk.netlify.app/api/panier");
        return res.data;
    },


}





