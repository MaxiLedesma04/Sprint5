const {createApp} = Vue 

const options = {
    data(){
        return{
            variableUno:[],
            variableD:[],
            variableT:[],
            variableC:[],
            variableQ:null,

        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(result => result.json())
        .then(result =>{
        this.variableUno = result.events
        this.variableD = location.search
        this.variableT = new URLSearchParams(this.variableD)
        this.variableC = this.variableT.get("id")
        this.variableQ = this.variableUno.find(evento=> evento._id == this.variableC)
        
        })
        .catch(error => console.error(error))
    },
}

const app = createApp(options)

app.mount('#app')