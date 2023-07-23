const {creatApp} = Vue

const options ={
    data(){
        return{

        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(resulte => resulte.json())
        .then(resulte => {})
        .catch(error => console.error(error))
    }
}

const app = created(options)

app.mount('#app')